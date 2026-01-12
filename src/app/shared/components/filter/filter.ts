import { Component, computed, effect, inject, OnInit, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiDataList, TuiTextfield } from '@taiga-ui/core';
import { TuiChevron, TuiDataListWrapper, TuiFilterByInputPipe, TuiInputChip, TuiMultiSelect, TuiSelect } from '@taiga-ui/kit';
import { EnumConverterService } from '../../../core/services/enumConverter.service';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../core/services/task.service';
import { FilterItem } from '../../../core/models/filtetItem';
import { Task } from '../../../core/models/task';

@Component({
  selector: 'app-filter',
  imports: [CommonModule, FormsModule, TuiChevron, TuiDataList, TuiDataListWrapper, TuiSelect,
    TuiInputChip, TuiMultiSelect, TuiTextfield, TuiFilterByInputPipe],
  templateUrl: './filter.html',
  styleUrl: './filter.css'
})
export class Filter implements OnInit {

  private enumConverterService = inject(EnumConverterService)
  private taskService = inject(TaskService)

  protected filterStatusList = signal([...this.enumConverterService.getStatus()])
  protected filterPriorityList = signal([...this.enumConverterService.getPriority()])
  protected filterAssigneeList = signal([...this.enumConverterService.getUsers()])
  protected filterReporterList = signal([...this.enumConverterService.getUsers()])

  protected filterSprintList = signal<FilterItem[]>([]);

  protected stringify = (x) => x.value;
  protected filterKeys = signal<FilterItem[]>([]);

  public filteredTasksOutput = output<Task[]>();

  protected filteredTasks = computed(() => {

    const selectedFilters = this.filterKeys();

    if (selectedFilters.length === 0) {
      return this.taskService.taskList()
    }
    return this.taskService.taskList().filter(task => {
      return this.applyFilters(task, selectedFilters);
    })
  })

  constructor() {
    effect(() => {
      this.updateSprintFilters();
    });
    effect(() => {
      this.filteredTasksOutput.emit(this.filteredTasks());
    });
  }

  ngOnInit(): void {
    this.filterAssigneeList.set(
      this.enumConverterService.getUsers().map(u => ({ ...u, key: `assignee_${u.key}` }))
    );
    this.filterReporterList.set(
      this.enumConverterService.getUsers().map(u => ({ ...u, key: `reporter_${u.key}` }))
    );
  }

  private applyFilters(task: Task, filters: FilterItem[]): boolean {

    const statusFilter = filters.filter(f => this.isStatusFilter(f));
    const priorityFilters = filters.filter(f => this.isPriorityFilter(f));
    const assigneeFilters = filters.filter(f => this.isAssigneeFilter(f));
    const reporterFilters = filters.filter(f => this.isReporterFilter(f));

    const sprintFilters = filters.filter(f => this.isSprintFilter(f));

    const statusMatch = statusFilter.length === 0 ||
      statusFilter.some(f => task.status === f.key);

    const priorityMatch = priorityFilters.length === 0 ||
      priorityFilters.some(f => task.priority === f.key);

    const assigneeMatch = assigneeFilters.length === 0 ||
      assigneeFilters.some(f => task.assigneeId === Number(f.key.replace('assignee_', '')));

    const reporterMatch = reporterFilters.length === 0 ||
      reporterFilters.some(f => task.reporterId === Number(f.key.replace('reporter_', '')));

    const sprintMatch = sprintFilters.length === 0 ||
      sprintFilters.some(f => task.sprint === Number(f.key));

    return statusMatch && priorityMatch && assigneeMatch && reporterMatch && sprintMatch;

  }

  private updateSprintFilters(): void {
    const tasks = this.taskService.taskList();
    const uniqueSprints = Array.from(new Set(tasks.map(task => task.sprint)))
      .filter(sprint => sprint !== null && sprint !== undefined)
      .sort((a, b) => Number(a) - Number(b))
      .map(sprint => ({
        key: sprint.toString(),
        value: `Спринт ${sprint}`
      }));

    this.filterSprintList.set(uniqueSprints);
  }

  private isStatusFilter(filter: FilterItem): boolean {
    return this.filterStatusList().some(s => s.key === filter.key);
  }

  private isPriorityFilter(filter: FilterItem): boolean {
    return this.filterPriorityList().some(p => p.key === filter.key);
  }

  private isAssigneeFilter(filter: FilterItem): boolean {
    return this.filterAssigneeList().some(a => a.key === filter.key);
  }

  private isReporterFilter(filter: FilterItem): boolean {
    return this.filterReporterList().some(r => r.key === filter.key);
  }

  private isSprintFilter(filter: FilterItem): boolean {
    return this.filterSprintList().some(s => s.key === filter.key);
  }


  onFilter(selectedFilters: FilterItem[]) {
    this.filterKeys.set(selectedFilters);
    this.filteredTasksOutput.emit(this.filteredTasks())
  }

}

import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { ToDoListItem } from '../../shared/components/to-do-list-item/to-do-list-item';
import { TaskService } from '../../core/services/task.service';
import { TaskStatus } from '../../core/enums/task-status';
import { TuiDataList, TuiLoader, TuiTextfield, } from '@taiga-ui/core';
import { Task } from '../../core/models/task';
import { TuiChevron, TuiDataListWrapper, TuiFilterByInputPipe, TuiInputChip, TuiMultiSelect, TuiSelect } from '@taiga-ui/kit';
import { EnumConverterService } from '../../core/services/filter.service';

@Component({
  selector: 'app-backlog',
  imports: [CommonModule, FormsModule, ToDoListItem, RouterLink, RouterOutlet,
            TuiLoader, RouterLinkActive, TuiChevron, TuiDataList, TuiDataListWrapper, TuiSelect,
            TuiFilterByInputPipe, TuiInputChip, TuiMultiSelect, TuiTextfield],

  templateUrl: './backlog.html',
  styleUrl: './backlog.css'
})
export class Backlog implements OnInit {

  private taskService = inject(TaskService);
  private enumConverterService = inject(EnumConverterService)

  // Массив фильтров
  protected filterStatusList = signal([{ key: 'Все', value: 'Все' }, ...this.enumConverterService.getStatus()])
  protected stringify = (x) => x.value;

  // Флаг загрузки данных
  protected isLoading: boolean = true;

  // Выбранный элемент и его id
  protected selectedItemId: number;
  protected selectedItem: Task;

  protected todoData = computed(() =>{
    if(this.filterKey !== 'Все'){
      return this.taskService.taskList().filter(x => x.status == this.filterKey)
    } else{
      return this.taskService.taskList();
    }
  })


  public filterKey: string = 'Все'
  public filterValue: string = 'Все'
  public filterKeys = []


  ngOnInit(): void {
    this.taskService.getTaskList().subscribe(() => {
      this.isLoading = false;
    })
  }

  // Удаление элемента
  protected deleteItem(id: number): void {
    this.taskService.deleteTask(id);
  }

  // Действие при клике на элемент
  protected onItemClicked(itemId: number): void {
    this.selectItemId(itemId);
  }

  //Фильтрация
  protected onFilter($event): void {
    if (!$event) {
      this.filterKey = "Все"
      this.filterValue = 'Все'
    } else {
      this.filterKey = $event.key
      this.filterValue = TaskStatus[this.filterKey as keyof typeof TaskStatus]
      if (this.filterKey === 'Все') this.filterValue = 'Все'
    }
  }

  // Выбор itemId
  private selectItemId(itemId: number): void {
    this.selectedItemId = itemId;
    this.selectedItem = this.taskService.getTask(itemId);
  }

}

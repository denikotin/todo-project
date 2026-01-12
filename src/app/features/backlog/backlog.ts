import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { ToDoListItem } from '../../shared/components/to-do-list-item/to-do-list-item';
import { TaskService } from '../../core/services/task.service';
import { TaskStatus } from '../../core/enums/task-status';
import { TuiDataList, TuiLoader, TuiTextfield, } from '@taiga-ui/core';
import { Task } from '../../core/models/task';
import { TuiDataListWrapper, TuiInputChip, TuiMultiSelect, TuiSelect } from '@taiga-ui/kit';
import { EnumConverterService } from '../../core/services/enumConverter.service';
import { Filter } from '../../shared/components/filter/filter';

@Component({
  selector: 'app-backlog',
  imports: [CommonModule, FormsModule, ToDoListItem, RouterLink, RouterOutlet, TuiLoader, RouterLinkActive, Filter, 
            TuiDataList, TuiDataListWrapper, TuiSelect, TuiInputChip, TuiMultiSelect, TuiTextfield],

  templateUrl: './backlog.html',
  styleUrl: './backlog.css'
})
export class Backlog implements OnInit {

  private taskService = inject(TaskService);

  // Массив фильтров
  protected stringify = (x) => x.value;

  // Флаг загрузки данных
  protected isLoading: boolean = true;

  // Выбранный элемент и его id
  protected selectedItemId: number;
  protected selectedItem: Task;

  protected filteredTasks = signal<Task[]>([])

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


  // Выбор itemId
  private selectItemId(itemId: number): void {
    this.selectedItemId = itemId;
    this.selectedItem = this.taskService.getTask(itemId);
  }

}

import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../core/models/task';
import { TaskStatus } from '../../core/enums/task-status';
import { TuiLoader } from '@taiga-ui/core';

import { DragDropModule, CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ToDoListItem } from '../../shared/components/to-do-list-item/to-do-list-item';

@Component({
  selector: 'app-board',
  imports: [TuiLoader, CdkDropList, CdkDrag, DragDropModule, ToDoListItem],
  templateUrl: './board.html',
  styleUrl: './board.css'
})
export class Board implements OnInit {

  private taskService = inject(TaskService);

  // Флаг загрузки данных
  protected isLoading: boolean = true;

  protected todoTasks = computed(() => {
    return this.taskService.taskList()?.filter(x => x.status.toString() === 'Todo')
  })

  protected inProgressTasks = computed(() => {
    return this.taskService.taskList()?.filter(x => x.status.toString() === 'InProgress')
  })

  protected reviewTasks = computed(() => {
    return this.taskService.taskList()?.filter(x => x.status.toString() === 'Review')
  })

  protected doneTasks = computed(() => {
    return this.taskService.taskList()?.filter(x => x.status.toString() === 'Done')
  })

  ngOnInit(): void {
    this.taskService.getTaskList().subscribe(() => {
      this.isLoading = false;
    })
  }

  public drop(event: CdkDragDrop<Signal<Task[]>>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data(), event.previousIndex, event.currentIndex);
    } else {

      const movedTask: Task = event.previousContainer.data()[event.previousIndex];

      const newStatus = this.getStatusFromContainerId(event.container.id);
      movedTask.status = newStatus as TaskStatus

      transferArrayItem(
        event.previousContainer.data(),
        event.container.data(),
        event.previousIndex,
        event.currentIndex,
      );

      event.container.data()[event.currentIndex] = movedTask;
      this.taskService.updateTask(movedTask.id, movedTask);
    }
  }

  private getStatusFromContainerId(containerId: string): string {
    switch (containerId) {
      case "TODO":
        return "Todo";
      case "PROGRESS":
        return "InProgress";
      case "REVIEW":
        return "Review";
      case "DONE":
        return "Done"
      default:
        return "Todo";
    }
  }

  protected deleteItem(id: number): void {
    this.taskService.deleteTask(id);
  }


}

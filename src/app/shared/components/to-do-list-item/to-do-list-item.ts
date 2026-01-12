import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../../core/models/task';
import { TuiButton, TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-to-do-list-item',
  imports: [CommonModule, FormsModule, TuiButton, TuiIcon],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.css',
})
export class ToDoListItem {
  
  task = input<Task>();
  onDelete = output<number>();

  protected onDeleteClick(id: number): void {
    this.onDelete.emit(id);
  }

}



























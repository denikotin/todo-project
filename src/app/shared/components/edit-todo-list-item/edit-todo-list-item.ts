import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoListService } from '../../../core/services/todo-list-service';

@Component({
  selector: 'app-edit-todo-list-item',
  imports: [FormsModule],
  templateUrl: './edit-todo-list-item.html',
  styleUrl: './edit-todo-list-item.css',
})
export class EditTodoListItem {

  private todoListService = inject(TodoListService);
  
  public id: number; 
  public inputtedTitle:string;

  public saveChanges(): void{
    this.todoListService.changeItemTitle(this.id,this.inputtedTitle);
  }

}

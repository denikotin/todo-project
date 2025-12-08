import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../button-component/button-component';
import { TodoListService } from '../../services/todo-list-service';
import { FormsModule } from '@angular/forms';
import { TipTextDirective } from '../../directives/tip-text.directive';

@Component({
  selector: 'app-edit-todo-list-item',
  imports: [FormsModule,ButtonComponent,TipTextDirective],
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

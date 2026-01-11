import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TodoListService } from '../../../core/services/todo-list-service';

@Component({
  selector: 'app-todo-create-item',
  imports: [ ReactiveFormsModule],
  templateUrl: './todo-create-item.html',
  styleUrl: './todo-create-item.css',
})
export class TodoCreateItem {

  private todoListService = inject(TodoListService);

  protected todoListFormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
  }) 

  protected onSubmit(): void{
    this.addItem();
  }

    // Добавление элемента
  private addItem(): void{
    this.todoListService.addItem({ text: this.todoListFormGroup.controls.title.value, 
                                   description: this.todoListFormGroup.controls.description.value })

    this.todoListFormGroup.controls.title.reset();
    this.todoListFormGroup.controls.description.reset();
    // this.toastService.showToast({title:'Success', message: 'To do added', status:'success', duration: 3000});
  }

}

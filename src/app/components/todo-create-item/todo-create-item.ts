import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../button-component/button-component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TipTextDirective } from '../../directives/tip-text.directive';
import { TodoListService } from '../../services/todo-list-service';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-todo-create-item',
  imports: [ButtonComponent, ReactiveFormsModule, TipTextDirective],
  templateUrl: './todo-create-item.html',
  styleUrl: './todo-create-item.css',
})
export class TodoCreateItem {

  private todoListService = inject(TodoListService);
  private toastService = inject(ToastService);

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
    this.toastService.showToast({title:'Success', message: 'To do added', status:'success', duration: 3000});
  }

}

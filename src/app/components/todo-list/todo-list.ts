/* eslint-disable @typescript-eslint/no-inferrable-types */
import { CommonModule } from '@angular/common';
import { Component, computed, HostListener, inject, OnInit, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToDoListItem } from '../to-do-list-item/to-do-list-item';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ListItem} from '../../interfaces/list-item';
import { TipTextDirective } from '../../directives/tip-text.directive';
import { TodoListService } from '../../services/todo-list-service';
import { ToastsComponent } from '../Toasts/toasts-component/toasts-component';
import { ToastService } from '../../services/toast-service';
import { LoadingSpinner } from '../loading-spinner/loading-spinner';
import { ListItemStatus } from '../../enums/todo-enums';
import { TodoCreateItem } from '../todo-create-item/todo-create-item';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, FormsModule, ToDoListItem,
    MatInputModule, MatProgressSpinnerModule, TipTextDirective,
    ToastsComponent, LoadingSpinner, TodoCreateItem, RouterLink, RouterOutlet],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList implements OnInit {

  private todoListService = inject(TodoListService);
  private toastService = inject(ToastService);

  // Массив фильтров
  protected filterStatusList: Signal<string[]> = computed(()=> {
    const array = Object.keys(ListItemStatus).filter(key => isNaN(Number(key)));
    array.unshift('All');
    return array
  })

  // Флаг загрузки данных
  protected isLoading: boolean = true;
  
  // Вводимые данные
  protected inputedValue: string = '';
  protected inputedDescription: string = '';
  
  // Выбранный элемент и его id
  protected selectedItemId: number;
  protected selectedItem: ListItem;


  protected get todoData(){
    if(this.filterValue !=='All'){
      console.log()
      return this.todoListService.todoList.filter( x=>  x.status == this.filterValue)
    } else{
      return this.todoListService.todoList;
    }
  }



  // Координаты мыши
  private mouseX: number;
  private mouseY: number;

  private filterValue: string = 'All'

  // Прослушивание координат мыши
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  ngOnInit(): void {

    setTimeout(() => {
      this.isLoading = false;
    }, 500)

    this.todoListService.getTodoList()

  }

  // Удаление элемента
  protected deleteItem(id: number): void {
    this.todoListService.delete(id);
    this.toastService.showToast({title:'Info', message: 'To do deleted', status:'info', duration: 3000});
  }


  // Действие при клике на элемент
  protected onItemClicked(itemId: number): void {
    this.selectItemId(itemId);
  }

  // Действие при двойном клике на элемент
  protected onItemDblClicked(itemId: number): void {
    this.editTodoItemTitle(itemId);
  }

  protected onFilter($event): void{
    this.filterValue = $event.target.value 
  }
  
  // Выбор itemId
  private selectItemId(itemId: number): void {
    this.selectedItemId = itemId;
    this.selectedItem = this.todoListService.getListItem(itemId);
  }

  // Редактировать элемент
  private editTodoItemTitle(itemId: number): void {
    this.todoListService.createEditTodoItemDialog(itemId, {x: this.mouseX, y: this.mouseY} );
  }

  
}

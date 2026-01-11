import { CommonModule } from '@angular/common';
import { Component, computed, HostListener, inject, OnInit, signal, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { ToDoListItem } from '../../shared/components/to-do-list-item/to-do-list-item';
import { TodoCreateItem } from '../../shared/components/todo-create-item/todo-create-item';
import { TodoListService } from '../../core/services/todo-list-service';
import { TaskStatus } from '../../core/enums/task-status';
import { TuiLoader, TuiTextfield,  } from '@taiga-ui/core';
import { Task } from '../../core/models/task';
import { TuiChevron, TuiDataListWrapper, TuiSelect } from '@taiga-ui/kit';
import { EnumConverterService } from '../../core/services/filter.service';

@Component({
  selector: 'app-backlog',
  imports: [CommonModule, FormsModule, ToDoListItem, TodoCreateItem, RouterLink, RouterOutlet, 
            TuiLoader, RouterLinkActive, TuiChevron, TuiDataListWrapper, TuiSelect, TuiTextfield],
  templateUrl: './backlog.html',
  styleUrl: './backlog.css'
})
export class Backlog implements OnInit {


  private todoListService = inject(TodoListService);
  private filterService = inject(EnumConverterService)

  // Массив фильтров
  protected filterStatusList = signal( [{ key: 'Все', value: 'Все' }, ...this.filterService.getStatus()] ) 
  protected stringify = (x) => x.value;



  // Флаг загрузки данных
  protected isLoading: boolean = true;
  
  // Вводимые данные
  protected inputedValue: string = '';
  protected inputedDescription: string = '';
  
  // Выбранный элемент и его id
  protected selectedItemId: number;
  protected selectedItem: Task;

  protected get todoData(){
    if(this.filterKey !=='Все'){
      return this.todoListService.todoList.filter( x=>  x.status == this.filterKey)
    } else{
      return this.todoListService.todoList;
    }
  }

  // Координаты мыши
  private mouseX: number;
  private mouseY: number;

  public filterKey: string = 'Все'
  public filterValue: string = 'Все'


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
    // this.toastService.showToast({title:'Info', message: 'To do deleted', status:'info', duration: 3000});
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
    
    if(!$event){
      this.filterKey = "Все"
      this.filterValue = 'Все'
    } else{
      this.filterKey = $event.key
      this.filterValue = TaskStatus[this.filterKey as keyof typeof TaskStatus]
      if(this.filterKey === 'Все') this.filterValue = 'Все' 
    }
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

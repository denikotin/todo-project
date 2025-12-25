import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListItemStatus } from '../../core/enums/todo-enums';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TodoListService } from '../../core/services/todo-list-service';
import { ListItem } from '../../core/models/list-item';

@Component({
  selector: 'app-todo-item-view',
  imports: [FormsModule],
  templateUrl: './todo-item-view.html',
  styleUrl: './todo-item-view.css',
})
export class TodoItemView implements OnInit {

  private activateRoute = inject(ActivatedRoute)
  private todoService = inject(TodoListService)
  private destroyRef = inject(DestroyRef);

  protected selectedItem: ListItem;

  ngOnInit(): void {
    this.activateRoute.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params)=> {
      const id = params.get('id');
      this.selectedItem = this.todoService.getListItem(Number(id));
    })
  }

  public check(): boolean{
    return this.selectedItem?.status == ListItemStatus.Completed ? true : false;
  }



  protected onChanged($event): void{
    if ($event.target.checked) {
      this.todoService.fullfillItem(this.selectedItem.id);
    }
  }

}

/* eslint-disable @angular-eslint/no-output-on-prefix */
import { CommonModule } from '@angular/common';
import { Component, input, output  } from '@angular/core';
import { ButtonComponent } from '../button-component/button-component';
import { ListItem} from '../../interfaces/list-item';
import { TipTextDirective } from '../../directives/tip-text.directive';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-to-do-list-item',
  imports: [CommonModule,ButtonComponent, TipTextDirective, FormsModule],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.css',
})
export class ToDoListItem {

  itemData = input<ListItem>();
  onDelete = output<number>();

  protected onDeleteClick(id: number): void{
    this.onDelete.emit(id);
  }

}


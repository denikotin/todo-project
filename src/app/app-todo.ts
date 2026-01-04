import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TuiRoot} from '@taiga-ui/core'

@Component({
  selector: 'app-todo',
  imports: [RouterOutlet, TuiRoot],
  templateUrl: './app-todo.html',
  styleUrl: './app-todo.css'
})
export class AppTodo {
  
}

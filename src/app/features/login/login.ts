import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
	import {TuiIcon, TuiTextfield} from '@taiga-ui/core';
@Component({
  selector: 'app-login',
  imports: [FormsModule,TuiTextfield,TuiIcon],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  protected username = signal<string>('fdsfds');
  protected password = signal<string>('');

}

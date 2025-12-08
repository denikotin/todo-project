import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-tip-component',
  imports: [],
  templateUrl: './tip-component.html',
  styleUrl: './tip-component.css',
})
export class TipComponent {
  public text = signal<string>('')
}

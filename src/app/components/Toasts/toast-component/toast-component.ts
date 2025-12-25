import { Component, input } from '@angular/core';
import { Toast } from '../../../core/models/toast';

export type ToastStatus = 'success' | 'error' | 'info';

@Component({
  selector: 'app-toast-component',
  imports: [],
  templateUrl: './toast-component.html',
  styleUrl: './toast-component.css',
})
export class ToastComponent {

  toast = input<Toast>()

  public get backgroundColor() {
    switch (this.toast().status) {
      case 'success':
        return 'rgba(105, 227, 5, 0.486)';
      case 'error':
        return 'rgba(227, 5, 5, 0.486)';
      case 'info':
        return 'rgba(5, 97, 227, 0.486)';
    }
  }

}



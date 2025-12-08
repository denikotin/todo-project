import { Component, inject } from '@angular/core';
import { ToastComponent } from '../toast-component/toast-component';
import { ToastService } from '../../../services/toast-service';
import { Toast } from '../../../interfaces/toast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toasts-component',
  imports: [ToastComponent, CommonModule],
  templateUrl: './toasts-component.html',
  styleUrl: './toasts-component.css',
})
export class ToastsComponent {
    public toastService = inject(ToastService);

    public getToastData(): Toast[]{
      return this.toastService.toastsData;
    }
}

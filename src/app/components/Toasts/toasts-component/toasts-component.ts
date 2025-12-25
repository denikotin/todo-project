import { Component, inject } from '@angular/core';
import { ToastComponent } from '../toast-component/toast-component';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/toast-service';
import { Toast } from '../../../core/models/toast';

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

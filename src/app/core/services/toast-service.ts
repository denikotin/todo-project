import { Injectable } from "@angular/core";
import { Toast } from "../models/toast";

@Injectable({
    providedIn: 'root',   
})
export class ToastService{
    
    public toastsData : Toast[] = []
    
    private currentId = 0;

    public showToast(toast: Toast): void{
        toast.id = this.currentId;
        this.toastsData.push(toast);
        this.removeToast(toast);
        this.currentId ++
    }

    private removeToast(toast: Toast): void{
        setTimeout(()=> {
            this.toastsData = this.toastsData.filter( toastItem => toastItem.id !== toast.id )
        }, toast.duration)
    }

}
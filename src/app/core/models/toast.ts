import { ToastStatus } from "../../components/Toasts/toast-component/toast-component";

export interface Toast{
    id?: number;
    title?: string;
    message?: string;
    status?: ToastStatus;
    duration?: number;
}
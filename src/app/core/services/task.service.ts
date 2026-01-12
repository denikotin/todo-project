import { DestroyRef, inject, Injectable, signal, } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { TaskStatus } from "../enums/task-status";
import { Task } from "../models/task";
import { HttpService } from "./http.service";
import { FormGroup } from "@angular/forms";
import { TuiToastService } from "@taiga-ui/kit";
import { Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class TaskService {

    private destroyRef = inject(DestroyRef);
    private httpService = inject(HttpService);
    private toast = inject(TuiToastService);

    public taskList = signal<Task[]>([]);

    public getTaskList(): Observable<Task[]> {
        return this.httpService.getTodoList().pipe(
            takeUntilDestroyed(this.destroyRef),
            tap((data) => this.taskList.set(data))
        )
    }

    public addTask(form: FormGroup): void {
        const array = this.taskList().map(item => item.id);
        const maxIndex = Math.max(...array)
        const task: Task = {
            id: maxIndex + 1,
            name: form.get('name').value,
            description: form.get('description').value,
            status: form.get('status').value.key,
            estimate: form.get('estimate').value,
            assigneeId: form.get('assigneeId').value.id,
            reporterId: form.get('reporterId').value.id,
            labels: form.get('labels').value,
            sprint: form.get('sprint').value,
            priority: form.get('priority').value.key,
        }

        this.taskList().push(task);
        this.httpService.postTask(task).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: () => {
                this.toast.open("Задача добавлена !", { autoClose: 2000, data: "@tui.check" }).subscribe();
            },
            error: (error) => {
                this.toast.open("Ошибка !", { autoClose: 2000, data: error }).subscribe();
            }
        })
    }

    public deleteTask(id: number): void {
        this.taskList.set(this.taskList().filter((item) => id !== item.id))
        this.httpService.deleteTask(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: () => {
                this.toast.open("Задача удалена !", { autoClose: 2000, data: "@tui.check" }).subscribe();
            },
            error: (error) => {
                this.toast.open("Ошибка !", { autoClose: 2000, data: error }).subscribe();
            }
        })
    }

    public updateTask(id: number, task: Task): void {
        this.httpService.putTask(id, task).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: () => {
                this.toast.open("Задача обновлена !", { autoClose: 2000, data: "@tui.check" }).subscribe();
            },
            error: (error) => {
                this.toast.open("Ошибка !", { autoClose: 2000, data: error }).subscribe();
            }
        })
    }

    public getTask(id: number): Task {
        return this.taskList()?.filter(item => item.id == id)[0]
    }

}
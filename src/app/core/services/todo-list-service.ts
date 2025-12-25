/* eslint-disable @typescript-eslint/no-unused-vars */

import { ApplicationRef, ComponentRef, createComponent, DestroyRef, EnvironmentInjector, HostListener, inject, Injectable, Renderer2 } from "@angular/core";
import { InputedData, ListItem } from "../models/list-item";
import { ToastService } from "./toast-service";
import { ListItemStatus } from "../enums/todo-enums";
import { TodoHttpService } from "./todoHttpService";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { EditTodoListItem } from "../../components/edit-todo-list-item/edit-todo-list-item";

@Injectable({
    providedIn: 'root',
})
export class TodoListService {
    
    
    private appRef = inject(ApplicationRef);
    private destroyRef = inject(DestroyRef);
    private toastService = inject(ToastService);
    private todoHttpService = inject(TodoHttpService);
    private environmentInjector = inject(EnvironmentInjector);

    private editItemListDialogRef: ComponentRef<EditTodoListItem>;

    public todoList: ListItem[];

    public getTodoList(): void{
        this.todoHttpService.getTodoList().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data) => {
            this.todoList = data;
        })
    }

    public fullfillItem(id:number): void{
        const item = this.getListItem(id);
        item.status = ListItemStatus.Completed;
        this.toastService.showToast({title:'Success', message: 'To do done !', status:'success', duration: 3000});
    }

    public addItem(data: InputedData): void {
        const array = this.todoList.map(item => item.id);
        const maxIndex = Math.max(...array)
        this.todoList.push({ id: maxIndex + 1, text: data.text, description: data.description, status: ListItemStatus.InProgress })
    }

    public delete(id: number): void {
        this.todoList = this.todoList.filter((item) => id !== item.id)
    }

    public changeItemTitle(id: number, title: string): void {
        const listItem = this.getListItem(id);
        listItem.text = title;
        this.destroyEditTodoItemTitleDialog();
        this.toastService.showToast({title:'Success', message: 'To do item edited', status:'success', duration: 3000});
    }

    public getListItem(id: number): ListItem {
        return this.todoList?.filter(item => item.id == id)[0]
    }

    public createEditTodoItemDialog(id: number, coordinates:{x:number; y: number}): void {
        
        if(this.editItemListDialogRef){
            this.destroyEditTodoItemTitleDialog();
        }

        this.editItemListDialogRef = createComponent(EditTodoListItem, { environmentInjector: this.environmentInjector });

        this.appRef.attachView(this.editItemListDialogRef.hostView);
        document.body.appendChild(this.editItemListDialogRef.location.nativeElement);
        
        const itemListDialogElement = this.editItemListDialogRef.location.nativeElement;
        itemListDialogElement.style.left = `${coordinates.x}px`;
        itemListDialogElement.style.top = `${coordinates.y}px`;

        this.editItemListDialogRef.instance.id = id;
        this.editItemListDialogRef.instance.inputtedTitle = this.getListItem(id).text;
    }

    private destroyEditTodoItemTitleDialog(): void {
        this.appRef.detachView(this.editItemListDialogRef.hostView);
        this.editItemListDialogRef.destroy();
        this.editItemListDialogRef = null;
    }

}
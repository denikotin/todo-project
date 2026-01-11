import { Injectable } from "@angular/core";
import { TaskStatus } from "../enums/task-status";
import { TaskPriority } from "../enums/task-proirity";

@Injectable({ providedIn: 'root' })
export class EnumConverterService {

    public getStatus(): Array<{ key: string, value: string }> {
        const keys = Object.keys(TaskStatus).filter(key => isNaN(Number(key)));
        const enumItems = keys.map(key => ({
            key: key,
            value: TaskStatus[key as keyof typeof TaskStatus]
        }))
        return enumItems
    }

    public getPriority(): Array<{ key: string, value: string }> {
        const keys = Object.keys(TaskPriority).filter(key => isNaN(Number(key)));
        const enumItems = keys.map(key => ({
            key: key,
            value: TaskPriority[key as keyof typeof TaskPriority]
        }))
        return enumItems
    }

}
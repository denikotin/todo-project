import { inject, Injectable } from "@angular/core";
import { TaskStatus } from "../enums/task-status";
import { TaskPriority } from "../enums/task-proirity";
import { UserService } from "./user.service";
import { FilterItem } from "../models/filtetItem";

@Injectable({ providedIn: 'root' })
export class EnumConverterService {

    private userService = inject(UserService)

    public getStatus(): FilterItem[] {
        const keys = Object.keys(TaskStatus).filter(key => isNaN(Number(key)));
        const enumItems = keys.map(key => ({
            key: key,
            value: TaskStatus[key as keyof typeof TaskStatus]
        }))
        return enumItems
    }

    public getPriority(): FilterItem[] {
        const keys = Object.keys(TaskPriority).filter(key => isNaN(Number(key)));
        const enumItems = keys.map(key => ({
            key: key,
            value: TaskPriority[key as keyof typeof TaskStatus]
        }))
        return enumItems
    }

    public getUsers(): FilterItem[] {
        return this.userService.users().map(user => (
            {
                key: user.id.toString(),
                value: `${user.firstname} ${user.lastname}`,
            }
        ))
    }

}
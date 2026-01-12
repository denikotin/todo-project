import { TaskPriority } from "../enums/task-proirity";
import { TaskStatus } from "../enums/task-status";

export class Task{
    id: number;
    name: string;
    description: string;
    status: TaskStatus;
    estimate: number; 
    assigneeId: number;
    reporterId: number;
    labels: string;
    sprint: number;
    priority: TaskPriority  
}
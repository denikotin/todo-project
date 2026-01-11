import { TaskPriority } from "../enums/task-proirity";
import { TaskStatus } from "../enums/task-status";

export interface Task{
    id: number;
    name: string;
    description: string;
    status: TaskStatus;
    estimate: number; 
    assigneeId: number;
    reporterId: number;
    labels: string;
    sprint: string;
    priority: TaskPriority  
}
import { User } from "./user";

export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Task{
    id: string;
    name: string;
    description: string;
    status: TaskStatus;
    estimate: number; 
    assignee: User;
    reporter: User;
    labels: string;
    sprint: string;
    priority: TaskPriority  
}
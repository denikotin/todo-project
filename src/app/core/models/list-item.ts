import { TaskStatus } from "../enums/task-status";

export interface ListItem{
  id: number;
  text: string;
  description?: string;
  status: TaskStatus;
}

export interface InputedData{
  text: string;
  description: string;
}


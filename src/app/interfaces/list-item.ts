import { ListItemStatus } from "../enums/todo-enums";

export interface ListItem{
  id: number;
  text: string;
  description?: string;
  status: ListItemStatus;
}

export interface InputedData{
  text: string;
  description: string;
}


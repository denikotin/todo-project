import { bootstrapApplication } from '@angular/platform-browser';
import { AppTodo } from './app/app-todo';
import { appConfig } from './app/app-todo.config';

bootstrapApplication(AppTodo, appConfig)
  .catch((err) => console.error(err));

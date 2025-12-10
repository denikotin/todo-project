import { bootstrapApplication } from '@angular/platform-browser';
import { AppTodo } from './app/components/app-todo/app-todo';
import { appConfig } from './app/components/app-todo/app-todo.config';

bootstrapApplication(AppTodo, appConfig)
  .catch((err) => console.error(err));

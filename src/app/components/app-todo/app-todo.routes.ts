import { Routes } from '@angular/router';
import { TodoItemView } from '../todo-item-view/todo-item-view';
import { TodoList } from '../todo-list/todo-list';

export const routes: Routes = [
    {
        path: ' ',
        redirectTo: 'tasks',
    },
    {
        path: 'tasks',
        component: TodoList,
        children: [{
            path: ':id',
            component: TodoItemView,
        }],
    },
    {
        path: '**',
        redirectTo: 'tasks',
    },
];

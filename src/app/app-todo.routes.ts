import { Routes } from '@angular/router';
import { TodoItemView } from './components/todo-item-view/todo-item-view';
import { TodoList } from './components/todo-list/todo-list';
import { Backlog } from './features/backlog/backlog';
import { Board } from './features/board/board';
import { Login } from './components/login/login';

export const routes: Routes = [
    {
        path: ' ',
        redirectTo: 'backlog',
    },
    {
        path: 'login',
        component: Login,
    },
    {
        path: 'backlog',
        component: Backlog,
        children: [{
            path: ':id',
            component: TodoItemView,
        }],
    },
    {
        path: 'board',
        component: Board,
    },
    {
        path: '**',
        redirectTo: 'tasks',
    },
];

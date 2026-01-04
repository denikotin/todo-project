import { Routes } from '@angular/router';
import { TodoItemView } from './components/todo-item-view/todo-item-view';
import { Backlog } from './features/backlog/backlog';
import { Board } from './features/board/board';
import { Home } from './shared/components/home/home';
import { authGuard } from './core/guards/auth.guard';
import { Login } from './features/login/login';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        canActivate: [authGuard]
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
        redirectTo: '',
    },
];

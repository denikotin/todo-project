import { Routes } from '@angular/router';
import { TodoItemView } from './components/todo-item-view/todo-item-view';
import { Backlog } from './features/backlog/backlog';
import { Board } from './features/board/board';
import { authGuard } from './core/guards/auth.guard';
import { Login } from './features/login/login';
import { nonAuthGuard } from './core/guards/nonAuthGuard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./shared/components/home/home').then((m) => m.Home),
        canActivate: [authGuard],
        children: [
            {
                path: 'board',
                loadComponent: () => import('./features/board/board').then((m)=> m.Board)
            },
            {
                path: 'backlog',
                loadComponent: () => import('./features/backlog/backlog').then((m)=>m.Backlog),
                children: [
                    {
                        path: ':id',
                        component: TodoItemView
                    }
                ]
            }
        ]
    },
    {
        path: 'login',
        component: Login,
        canActivate: [nonAuthGuard]
    },
    {
        path: '**',
        redirectTo: '',
    },
];

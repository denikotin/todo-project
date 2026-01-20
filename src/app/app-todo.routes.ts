import { Routes } from '@angular/router';
import { TodoItemView } from './shared/components/todo-item-view/todo-item-view';
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
            },
            {
                path: 'poker',
                loadComponent: () => import('./features/planning-poker/planning-poker').then((m)=> m.PlanningPoker)

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

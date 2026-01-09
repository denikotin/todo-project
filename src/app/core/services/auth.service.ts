import { User } from "../models/user";
import { Router } from "@angular/router";
import { HttpService } from "./http.service";
import { catchError, map, Observable, of } from "rxjs";
import { inject, Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthService {

    private readonly AUTH_STORAGE_KEY = 'auth';

    private httpService = inject(HttpService)
    private router = inject(Router)

    isLoggedIn = signal(false);
    user = signal<User | null>(null)

    public constructor() {
        this.loadAuthState();
    }

    // Метод авторизации
    public login(username: string, password: string): Observable<boolean> {
        return this.httpService.getUsers().pipe(
            map((users: User[]) => {
                const user = users.find(u => u.username === username && u.password === password);
                if (user) {
                    this.isLoggedIn.set(true);
                    this.user.set(user);
                    this.saveAuthState(user);
                    this.router.navigate(['/'], {
                        replaceUrl: true
                    });
                    return true
                } else {
                    return false;
                }
            }),
            catchError(() => of(false))
        )
    }

    // Выход из аккаунта
    public logout(): void {
        this.isLoggedIn.set(false);
        this.user.set(null);
        this.clearAuthStorage();
        this.router.navigate(['/login'], {
            replaceUrl: true,
            queryParams: { sessionEnded: true }
        })
    }

    // Загрузка авторизованного пользователя
    private loadAuthState(): void {
        const savedAuth = sessionStorage.getItem(this.AUTH_STORAGE_KEY)

        if (savedAuth) {
            try {
                const authData = JSON.parse(savedAuth);
                this.isLoggedIn.set(true);
                this.user.set(authData.user);

            } catch (error) {
                this.clearAuthStorage();
            }
        }
    }

    // Сохранение авторизованного пользователя
    private saveAuthState(user: User): void {
        const authData = {
            user: {
                id: user.id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname, 
                icon: user.icon,
            }
        };
        sessionStorage.setItem(this.AUTH_STORAGE_KEY, JSON.stringify(authData));
    }

    // Очистка авторизованного пользователя
    private clearAuthStorage(): void {
        sessionStorage.removeItem(this.AUTH_STORAGE_KEY);
    }


}
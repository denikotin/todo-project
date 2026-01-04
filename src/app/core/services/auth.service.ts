import { inject, Injectable, signal } from "@angular/core";
import { User } from "../models/user";
import { map, Observable, tap } from "rxjs";
import { HttpService } from "./http.service";

@Injectable({ providedIn: 'root' })
export class AuthService {

    private httpService = inject(HttpService)

    isLoggedIn = signal(false);
    user = signal<User | null>(null)

    public login(username: string, password: string): Observable<User> {
        return this.httpService.getUsers().pipe(
            map((users: User[]) => {
                const user = users.find(u => u.username === username && u.password === password);
                if (!user) {
                    throw new Error('Неверный email или пароль');
                }
                return user;
            }),
            tap((user: User) => {
                this.isLoggedIn.set(true);
                this.user.set(user);
            })
        )
    }


    // private setSession(user: User) {
    //     localStorage.setItem('token', `fake-jwt-${user.id}`);
    //     localStorage.setItem('user', JSON.stringify(user));
    // }

    // logout() {
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('user');
    //     this.isLoggedIn.set(false);
    //     this.user.set(null);
    //     this.currentUserSubject.next(null);
    //     this.router.navigate(['/login']);
    // }

    // private checkAuth() {
    //     const token = localStorage.getItem('token');
    //     const userData = localStorage.getItem('user');
    //     if (token && userData) {
    //         const user = JSON.parse(userData);
    //         this.isLoggedIn.set(true);
    //         this.user.set(user);
    //         this.currentUserSubject.next(user);
    //     }
    // }

    // private handleError(error: HttpErrorResponse) {
    //     return throwError(() => new Error('Ошибка авторизации'));
    // }

    // get currentUser$() {
    //     return this.currentUserSubject.asObservable();
    // }
}
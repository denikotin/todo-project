import { effect, inject, Injectable, signal } from "@angular/core";
import { User } from "../models/user";
import { HttpService } from "./http.service";
import { Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private readonly USER_STORAGE_KEY = 'users';

    public users = signal<User[]>(this.loadFromStorage())

    private httpService = inject(HttpService)


    public getUsers(): Observable<User[]> {

        return this.httpService.getUsers().pipe(
            tap((users: User[]) => {
                this.users.set(users)
                this.saveToStorage(users)
            })
        )

    }

    public clearUsers(): void {
        this.users.set([]);
        sessionStorage.removeItem(this.USER_STORAGE_KEY);
    }

    private loadFromStorage(): User[] {
        try {
            const stored = sessionStorage.getItem(this.USER_STORAGE_KEY);
            if (!stored) return [];
            return JSON.parse(stored);
        } catch {
            return []
        }
    }

    private saveToStorage(user: User[]): void {
        try {
            sessionStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(user))
        } catch (error) {
            console.warn('Failed to save users to sessionStorage:', error);
        }
    }

}
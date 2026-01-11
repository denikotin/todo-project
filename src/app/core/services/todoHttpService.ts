import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Task } from "../models/task";

@Injectable({
    providedIn:"root",
})
export class TodoHttpService{
    private http = inject(HttpClient);

    public getTodoList(): Observable<Task[]> {
       return this.http.get<Task[]>('http://localhost:3000/list');
    }
}
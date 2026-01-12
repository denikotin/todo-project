import { inject, Injectable } from "@angular/core";
import { User } from "../models/user";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { Task } from "../models/task";

@Injectable({ providedIn: 'root' })
export class HttpService {

    private http = inject(HttpClient)

    public getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${environment.apiUrl}/users`)
    }

    public getTodoList(): Observable<Task[]> {
        return this.http.get<Task[]>(`${environment.apiUrl}/list`);
    }

    public postTask(task: Task): Observable<Object> {
        const json = JSON.stringify(task)
        return this.http.post(`${environment.apiUrl}/list`,json)
    }

    public deleteTask(id: number){
        return this.http.delete(`${environment.apiUrl}/list/${id}`)
    }

    public putTask(id:number, task:Task): Observable<Object> {
        const json = JSON.stringify(task)
        return this.http.put(`${environment.apiUrl}/list/${id}`,json)
    }

    

}
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ListItem } from "../interfaces/list-item";
import { Observable } from "rxjs";

@Injectable({
    providedIn:"root",
})
export class TodoHttpService{
    private http = inject(HttpClient);

    public getTodoList(): Observable<ListItem[]> {
       return this.http.get<ListItem[]>('http://localhost:3000/list');
    }
}
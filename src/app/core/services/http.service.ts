import { inject, Injectable } from "@angular/core";
import { User } from "../models/user";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class HttpService{

    private http = inject(HttpClient)
    

    public getUsers(): Observable<User[]>{
        return this.http.get<User[]>(`${environment.apiUrl}/users`)
    }

}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(
        private httpClient: HttpClient
    ) {
        
    }

    getUsersList(): Observable<any> {
        return this.httpClient.get<any>(`https://api.github.com/users`)
    }
}
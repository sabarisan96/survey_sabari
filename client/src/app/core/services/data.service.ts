import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, LoginRsp } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private httpClient: HttpClient) { }

    formcheck(id: string): Observable<any> {

        var singleFormData = this.httpClient.get<any>(`${environment.api_url}/forms/findSingleDataForm/${id}`);
        console.log(singleFormData);
        return (singleFormData);
    }
}

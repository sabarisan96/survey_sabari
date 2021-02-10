import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, LoginRsp } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(body: User): Observable<LoginRsp> {
    return this.httpClient.post<LoginRsp>(`${environment.api_url}/users/login`, body);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserPaginationRsp } from '../models/user';
import { UserAccess } from '../models/useraccess';
// import { UserDetails } from '../models/UserDetails';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  findUsers({ page, perPage, sortField, sortDir, filter }): Observable<UserPaginationRsp> {
    let queryString = `${environment.api_url}/users/userlist?page=${page + 1}&perPage=${perPage}`;
    if (sortField && sortDir) {
      queryString = `${queryString}&sortField=${sortField}&sortDir=${sortDir}`;
    }
    if (filter) {
      queryString = `${queryString}&filter=${filter}`
    }
    return this.httpClient.get<UserPaginationRsp>(queryString);
    // return this.httpClient.get<User[]>(`${environment.api_url}/users/userlist`);
  }

  findAllUsers():Observable<User[]>{
      return this.httpClient.get<User[]>(`${environment.api_url}/users/findAllUsers`);
  }

  addUsers(body: String):Observable<User>{
    return this.httpClient.post<User>(`${environment.api_url}/users/adduser`, body);
  }


}

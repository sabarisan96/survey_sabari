import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserAccess } from '../models/useraccess';

@Injectable({
  providedIn: 'root'
})
export class FormAccessRightsService {

  constructor(private httpClient:HttpClient) { }

  findUserAccessRightByFormId(id:string):Observable<any>{
    return this.httpClient.get<any>(`${environment.api_url}/accessRights/findAccessRightsBasedOnId/${id}`)
  }

  createAccessRights(body:any):Observable<UserAccess>{
    return this.httpClient.post<UserAccess>(`${environment.api_url}/accessRights/addAccessRights`, body)
  }

  updateAccessRights(id, body: any):Observable<UserAccess>{
    return this.httpClient.put<UserAccess>(`${environment.api_url}/accessRights/updateAccessRights/${id}`, body)
  }
}

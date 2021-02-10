import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Form, FormPaginationRsp } from '../models/form';
import { environment } from 'src/environments/environment';

// const BASE_URL = 'http://localhost:4278/forms';
// const BASE_URL = 'http://159.89.170.214:4278/forms';

@Injectable({
  providedIn: 'root'
})
export class EditAppService {

  constructor(private httpClient: HttpClient) { }

  createForm(body: Form): Observable<Form> {
    return this.httpClient.post<Form>(`${environment.api_url}/forms/newMasterForm`, body)
  }

  updateForm(id: string, body: Form): Observable<Form> {
    return this.httpClient.put<Form>(`${environment.api_url}/forms/UpdateForm/${id}`, body);
  }

  updateFormStatus(id, body: any): Observable<any> {
    return this.httpClient.put<any>(`${environment.api_url}/forms/updateFormStatus/${id}`, body);
  }

  updatePrivatePublicStatus(id, body: any): Observable<any> {
    return this.httpClient.put<any>(`${environment.api_url}/forms/updatePrivatePublicStatus/${id}`, body);
  }

  findForm({ page, perPage, sortField, sortDir, filter }): Observable<FormPaginationRsp> {
    // console.log(filter);
    let queryString = `${environment.api_url}/forms/findAllForms?page=${page + 1}&perPage=${perPage}`;
    if (sortField && sortDir) {
      queryString = `${queryString}&sortField=${sortField}&sortDir=${sortDir}`;
    }
    if (filter) {
      queryString = `${queryString}&filter=${filter}`
    }
    return this.httpClient.get<FormPaginationRsp>(queryString);
  }

  deleteForm(id: string): Observable<Form> {
    return this.httpClient.delete<Form>(`${environment.api_url}/forms/deleteSingleForm/${id}`);
  }

  findFormById(id: string): Observable<Form[]> {
    return this.httpClient.get<Form[]>(`${environment.api_url}/forms/findSingleForm/${id}`);
  }

  findFormByIdPublic(id: string): Observable<Form[]> {
    return this.httpClient.get<Form[]>(`${environment.api_url}/forms/findFormByIdPublic/${id}`);
  }

  insertFormData(body: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.api_url}/forms/insertFormData`, body);
  }

  insertFormDataPublic(body: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.api_url}/forms/insertFormDataPublic`, body);
  }


  findFormData(id: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.api_url}/forms/findFormData/${id}`);
  }


  // finding Single Form data
  findFormDataSingle(id: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.api_url}/forms/findFormDataSingle/${id}`);
  }

  // finding Single Form data Public
  findFormDataSinglePublic(id: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.api_url}/forms/findFormDataSinglePublic/${id}`);
  }

  // Delete Form Data
  deleteFormData(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${environment.api_url}/forms/deleteSingleData/${id}`);
  }


  updateFormData(id: string, body: any): Observable<any> {
    return this.httpClient.put<any>(`${environment.api_url}/forms/updateSingleData/${id}`, body);
  }

  // Update Form data Public
  updateFormDataPublic(id: string, body: any): Observable<any> {
    return this.httpClient.put<any>(`${environment.api_url}/forms/updateFormDataPublic/${id}`, body);
  }

  formcheck(id: string): Observable<any> {

    return this.httpClient.get<any>(`${environment.api_url}/forms/findSingleDataForm/${id}`);
  }

}

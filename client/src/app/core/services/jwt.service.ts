import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  setToken(token: string, user_typeid: string) {
    window.localStorage.setItem('jwt_token', token);
    window.localStorage.setItem('user_typeid', user_typeid);
  }

  getToken() {
    return window.localStorage.getItem('jwt_token');
  }

  getUserType() {
    return window.localStorage.getItem('user_typeid');
  }

  destroyToken() {
    return window.localStorage.removeItem('jwt_token');
  }
}

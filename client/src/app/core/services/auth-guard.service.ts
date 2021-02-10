import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private jwtService: JwtService, private router: Router) { }

  canActivate(): boolean {
    //if user loggen in
    // return true

    if (this.jwtService.getToken()) {
      // debugger;

      return true;

    } else {
      // otherwise
      this.router.navigate(['login']);
      return false;
      // navigate to the login
    }



  }
}

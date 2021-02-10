import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { JwtService } from './jwt.service';
import { MatSnackBar } from '@angular/material';
// import { JwtService } from './jwt.service';

@Injectable({
    providedIn: 'root'
})
export class DataGuardService implements CanActivate {

    constructor(private dataService: DataService, private router: Router, private httpClient: HttpClient, private jwtService: JwtService, private snackBar: MatSnackBar) { }
    //     this.route.params.subscribe(params => {
    //     let this.id = params['id'];
    // })
    id = '';
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        //if user loggen in
        let id = route.paramMap.get('id');
        //  res: Boolean;
        // let res = this.dataService.formcheck(id).subscribe(data => {
        //     // console.log(data);
        //     if (data) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        //     if (data) {
        //         return true;
        //     } else {
        //         this.router.navigate([`dataGeneral/${id}`]);
        //         return false;
        //     }
        // });
        // return res;

        return this.httpClient.get<any[]>(`${environment.api_url}/forms/findSingleDataForm/${id}`).pipe(map(data => {
            // console.log(data);
            if (data) {
                this.router.navigate([`dataGeneral/${id}`]);
                return false;
                // return true;
            } else {
                if (this.jwtService.getToken()) {
                    // debugger;
                    return true;
                } else {
                    // otherwise
                    this.errorHandler('Requested for login to fill the data');
                    this.router.navigate(['login']);
                    return false;
                    // navigate to the login
                }

            }
        }))
        // console.log(singleFormData);
        // return (singleFormData);

    }

    private errorHandler(message) {
        this.snackBar.open(message, 'Warning', {
            duration: 2000,
            verticalPosition: 'top'
        })
    }
}

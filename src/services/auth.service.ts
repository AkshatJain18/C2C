import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http: HttpClient;

  constructor(httpClient: HttpClient) {
    this.http = httpClient;
   }

   signIn(data: any): Observable<any> {
    return this.http.post("https://c2c-backend-dot-hu18-groupa-angular.et.r.appspot.com/login",data);
   }

   signUp(data: any): Observable<any> {
     return this.http.post("https://c2c-backend-dot-hu18-groupa-angular.et.r.appspot.com/signup",data);
   }

   MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return null;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
          return ({mustMatch: true})
      } else {
          return null;
      }
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm !: FormGroup;
  signedIn : boolean = false;
  errorInSignIn : boolean = false;

  user = new User({})

  http : HttpClient;

  fieldTextType: boolean = false;

  constructor(httpClient:HttpClient) {
    this.buildSignInForm(new User({}));
    this.http = httpClient;
   }

  ngOnInit(): void {
  }

  buildSignInForm(user:User){
    this.signInForm = new FormGroup({
      emailId : new FormControl(user.emailId,[Validators.required,Validators.email]),
      password : new FormControl(user.password,Validators.required)
    })
  }

  onSubmit() {
    console.log("sign in");
    console.log(this.signInForm.value);
    this.http.post("https://c2c-backend-dot-hu18-groupa-angular.et.r.appspot.com/login",this.signInForm.value)
    .subscribe(
      (data:any) => { console.log(data);
                      this.user = data;
                      localStorage.setItem("userDetails",JSON.stringify(data));
                      if(data===null){this.errorInSignIn=true;
                      }},
      (err) => { this.errorInSignIn = true },
      () => console.log('done loading user')
    )
    this.signedIn = true;
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}

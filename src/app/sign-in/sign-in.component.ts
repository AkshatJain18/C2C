import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/User';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm !: FormGroup;

  constructor() {
    this.buildSignInForm(new User({}));
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
    console.log("here");
    console.log(this.signInForm.value);
  }

}

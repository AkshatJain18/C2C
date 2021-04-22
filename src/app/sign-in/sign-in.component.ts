import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/User';
import { AuthService } from '../auth.service';

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

  fieldTextType: boolean = false;

  constructor(private authService: AuthService) {
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
    console.log("sign in");
    console.log(this.signInForm.value);
    this.authService.signIn(this.signInForm.value)
    .subscribe(
      (data:any) => { console.log(data);
                      this.user = data;
                      localStorage.setItem("user",JSON.stringify(data));
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

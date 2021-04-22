import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../../model/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm !: FormGroup;

  http : HttpClient;

  user = new User({});

  constructor(httpClient:HttpClient,private formBuiler : FormBuilder,private authService: AuthService) {
    this.buildSignUpForm(new User({}));
    this.http = httpClient;
  }

  ngOnInit(): void {
  }

  buildSignUpForm(user:User){
    this.signUpForm = this.formBuiler.group({
      firstName : new FormControl(user.firstName,[Validators.required,Validators.maxLength(20)]),
      lastName : new FormControl(user.lastName,[Validators.required,Validators.maxLength(20)]),
      address : new FormControl(user.address,Validators.required),
      emailId : new FormControl(user.emailId,[Validators.required,Validators.email,Validators.pattern(/^([\w.-]+)@(\[(\d{1,3}\.){3}|(?!hotmail|gmail|googlemail|yahoo|gmx|ymail|outlook|bluewin|protonmail|t\-online|web\.|online\.|aol\.|live\.)(([a-zA-Z\d-]+\.)+))([a-zA-Z]{2,4}|\d{1,3})(\]?)$/)]),
      phone : new FormControl(user.state,[Validators.required, Validators.maxLength(10)]),
      pinCode : new FormControl(user.pinCode, Validators.required),
      password : new FormControl(user.password,[Validators.required, Validators.minLength(8),
                    Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/)]),
      confirmPassword : new FormControl(null),
      checkBox : [false, Validators.requiredTrue]
    }
    ,{
      validator: this.MustMatch('password','confirmPassword')
    }
    )
  }

  onSubmit() {
    console.log(this.signUpForm.value);
    this.authService.signUp(this.signUpForm.value)
    .subscribe(
      (data:any) => { console.log(data);
        this.user = data;
        localStorage.setItem("user",JSON.stringify(data));
      },
      (err) => console.log(err)
    )
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

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../../model/User';
import { MustMatch } from '../../helpers/must-match.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm !: FormGroup;

  constructor(private formBuiler : FormBuilder) {
    this.buildSignUpForm(new User({}));
  }

  ngOnInit(): void {
  }

  buildSignUpForm(user:User){
    this.signUpForm = this.formBuiler.group({
      firstName : new FormControl(user.firstName,[Validators.required,Validators.maxLength(20)]),
      lastName : new FormControl(user.lastName,[Validators.required,Validators.maxLength(20)]),
      emailId : new FormControl(user.emailId,[Validators.required,Validators.email]),
      address : new FormControl(user.address,[Validators.required,Validators.maxLength(50)]),
      state : new FormControl(user.state,Validators.required),
      pinCode : new FormControl(user.pinCode, Validators.required),
      password : new FormControl(user.password,[Validators.required, Validators.minLength(8)]),
      confirmPassword : new FormControl(null),
      checkBox : [false, Validators.requiredTrue]
    },{
      validator: MustMatch('password','confirmPassword')
    }
    )
  }

  get f() {
    return this.signUpForm.controls;
  }

  onSubmit() {
    console.log(this.signUpForm.value);
  }

//   MustMatch(controlName: string, matchingControlName: string) {
//     return (formGroup: FormGroup) => {
//         const control = formGroup.controls[controlName];
//         const matchingControl = formGroup.controls[matchingControlName];

//         if (matchingControl.errors && !matchingControl.errors.mustMatch) {
//             // return if another validator has already found an error on the matchingControl
//             return;
//         }

//         // set error on matchingControl if validation fails
//         if (control.value !== matchingControl.value) {
//             matchingControl.setErrors({ mustMatch: true });
//         } else {
//             matchingControl.setErrors(null);
//         }
//     }
// }

}

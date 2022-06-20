import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../providers/customValidators';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  // register forms angular
  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    terms: new FormControl(false,[Validators.requiredTrue])
  },
    CustomValidators.mustMatch('password', 'confirmPassword'));
  
  constructor() { }

  ngOnInit() {
  }

  register() {
    console.log(this.registerForm.value);
  }
  
  // password confirming
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
}

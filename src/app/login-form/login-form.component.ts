import { Component, OnInit, inject } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnInit{
  loginForm! : FormGroup;
  fb = inject(FormBuilder)

  ngOnInit(): void {
      this.loginForm = this.fb.group({
        email: ['',[Validators.required, Validators.email]],
        password: ['',[Validators.required, Validators.minLength(4), Validators.pattern("^[a-zA-Z]+$")]]
      });//ειναι αρχικη τιμη στη φορμα ο,τι γραψω μεσα
      
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  loginUser(){
    console.log(this.loginForm.value);
    console.log(this.loginForm.status);

    console.log(this.email);
    // add some logic for your data here
    //something like that
    //if (this.loginForm.valid)
    // this.service.post(this.loginForm.value)
  }
  router = inject(Router);
  goSignUp(){
    this.router.navigate(['home'])
  }
}

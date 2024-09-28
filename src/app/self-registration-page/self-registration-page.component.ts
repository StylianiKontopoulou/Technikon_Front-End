import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomValidatorsService } from '../services/custom-validators.service';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-self-registration-page',
  standalone: true,
  imports: [ReactiveFormsModule,],
  templateUrl: './self-registration-page.component.html',
  styleUrl: './self-registration-page.component.css',
})
export class SelfRegistrationPageComponent implements OnInit {
  registrationForm!: FormGroup;
  fb = inject(FormBuilder);

  service = inject(AdminService);
  service2 = inject(UserService);
  users: any;
  answer: any;
  

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      VAT: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern('^[a-zA-Z]+$'),
        ],
      ],
      confirmPassword: ['', Validators.required],
      role: ['PropertyOwner', Validators.required]
    }, {
      validators: CustomValidatorsService.passwordMatchValidator
    }); //ειναι αρχικη τιμη στη φορμα ο,τι γραψω μεσα
  }

   get VAT() {
    return this.registrationForm.get('VAT');
  }
  get name() {
    return this.registrationForm.get('name');
  }
  get lastname() {
    return this.registrationForm.get('lastname');
  }
  get address() {
    return this.registrationForm.get('address');
  }

  get phone() {
    return this.registrationForm.get('phone');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }
  get confirmPassword() { return this.registrationForm.get('confirmPassword'); }

  signupUser() {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
    } else {
      console.log("Form is invalid");
    }
    // console.log(this.registrationForm.value);
    // console.log(this.registrationForm.status);

    // console.log(this.email);
    // add some logic for your data here
    //something like that
    //if (this.loginForm.valid)
    // this.service.post(this.loginForm.value)

    
  }
  router = inject(Router);
  goLogin(){
    this.router.navigate(['login'])
  }

  postAddUser() {
    const registeredUser = {
      vat: '',
      firstName: '',
      lastName: '',
      address: '',
      phoneNumber: '',
      email: '',
      userName: '',
      password: '',
      userType: '',
    };
    //this.service2.setRegisteredUser(registeredUser);

    this.service.postAddUser(registeredUser).subscribe({
      next: (response) => (this.answer = response),
      error: (err) => console.error(registeredUser),
    });
  }
}

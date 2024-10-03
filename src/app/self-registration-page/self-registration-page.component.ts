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
  imports: [ReactiveFormsModule],
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
  userForm!: FormGroup;
  propertyForm!: FormGroup;
  newUser = {
    vat: '',
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    email: '',
    userName: '',
    password: '',
    confirmPassword: '',
  };

  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        vat: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
        userName: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        address: ['', Validators.required],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$'
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: CustomValidatorsService.passwordMatchValidator,
      }
    );
  }

  get vat() {
    return this.registrationForm.get('vat');
  }
  get firstName() {
    return this.registrationForm.get('firstName');
  }
  get lastName() {
    return this.registrationForm.get('lastName');
  }
  get userName() {
    return this.registrationForm.get('userName');
  }
  get address() {
    return this.registrationForm.get('address');
  }

  get phoneNumber() {
    return this.registrationForm.get('phoneNumber');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }
  get confirmPassword() {
    return this.registrationForm.get('confirmPassword');
  }

  signupUser() {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
  postAddUser(): any {
    let userData = {
      ...this.registrationForm.value,
      isActive: true,
      userType: 'PROPERTY_OWNER',
    };
    delete userData.confirmPassword;

    this.service.postAddUser(userData).subscribe({
      next: (response) => {
        this.goLogin();
      },
      error: (err) => console.error(`Error adding user: ${err}`),
    });
  }
  router = inject(Router);
  goLogin() {
    this.router.navigate(['login']);
  }
}

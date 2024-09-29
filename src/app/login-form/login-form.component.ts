import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;
  fb = inject(FormBuilder);
  userService = inject(UserService);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          // Validators.minLength(4),
          // Validators.pattern('^[a-zA-Z]+$'),
        ],
      ],
    }); //ειναι αρχικη τιμη στη φορμα ο,τι γραψω μεσα
  }

  get userName() {
    return this.loginForm.get('userName');
  }

  get password() {
    return this.loginForm.get('password');
  }

  loginUser() {
    console.log(this.loginForm.value);
    console.log(this.loginForm.status);

    console.log(this.userName);
    this.userService.login(this.loginForm.value).subscribe({
      next: (response: any) => {
        localStorage.setItem(
          'authorizationHeader',
          btoa(`${this.userName}:${this.password}`)
        );
        debugger;
        const userRole = response.userType; //ADMIN,PROPERTY_OWNER
        this.navigateTo(userRole);
      },
      error: (err) => console.error(`Something is wrong... ${err}`),
    });
  }
  router = inject(Router);
  goSignUp() {
    this.router.navigate(['home']);
  }

  logoutUser() {
    localStorage.clear();
  }
  navigateTo(userRole: String) {
    if (userRole === 'ADMIN') {
      this.router.navigate(['admin/:id']);
    } else {
      this.router.navigate(['user/:id']);
    }
  }
}

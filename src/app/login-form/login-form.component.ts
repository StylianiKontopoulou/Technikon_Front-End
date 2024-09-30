import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

// @Component({
//   selector: 'app-login-form',
//   standalone: true,
//   imports: [ReactiveFormsModule],
//   templateUrl: './login-form.component.html',
//   styleUrl: './login-form.component.css',
// })
// export class LoginFormComponent implements OnInit {
//   loginForm!: FormGroup;
//   fb = inject(FormBuilder);
//   userService = inject(UserService);

//   ngOnInit(): void {
//     this.loginForm = this.fb.group({
//       userName: ['', [Validators.required]],
//       password: [
//         '',
//         [
//           Validators.required,
//           // Validators.minLength(4),
//           // Validators.pattern('^[a-zA-Z]+$'),
//         ],
//       ],
//     }); //ειναι αρχικη τιμη στη φορμα ο,τι γραψω μεσα
//   }

//   get userName() {
//       return this.loginForm.get('userName');

//   }

//   get password() {
//     return this.loginForm.get('password');
//   }

//   loginUser() {

//     this.userService.login(this.loginForm.value).subscribe({
//       next: (response: any) => {
//         localStorage.setItem(
//           'authorizationHeader',
//           btoa(`${this.userName?.value}:${this.password?.value}`)
//         );
//         localStorage.setItem('userId', response.id);
//         localStorage.setItem('userType', response.userType);
//         const userRole = response.userType; //ADMIN,PROPERTY_OWNER
//         this.navigateTo(userRole);
//       },
//       error: (err) => console.error(`Something is wrong... ${err}`),
//     });
//   }
//   router = inject(Router);
//   goSignUp() {
//     this.router.navigate(['home']);
//   }

//   navigateTo(userRole: String) {
//     if (userRole === 'ADMIN') {
//       this.router.navigate(['admin']);
//     } else if (userRole === 'PROPERTY_OWNER'){
//       this.router.navigate(['user/:id']);
//     }
//   }
// }
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
  authService = inject(AuthService); // Inject the AuthService

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get userName() {
    return this.loginForm.get('userName');
  }

  get password() {
    return this.loginForm.get('password');
  }

  loginUser() {
    this.userService.login(this.loginForm.value).subscribe({
      next: (response: any) => {
        localStorage.setItem(
          'authorizationHeader',
          btoa(`${this.userName?.value}:${this.password?.value}`)
        );
        localStorage.setItem('userId', response.id);
        localStorage.setItem('userType', response.userType);
        localStorage.setItem('firstName', response.firstName);

        // Notify AuthService about login and set userName
        this.authService.login();

        const userRole = response.userType;
        this.navigateTo(userRole);
      },
      error: (err) => console.error(`Something is wrong... ${err}`),
    });
  }

  router = inject(Router);
  goSignUp() {
    this.router.navigate(['signup']);
  }

  navigateTo(userRole: string) {
    if (userRole === 'ADMIN') {
      this.router.navigate(['admin']);
    } else if (userRole === 'PROPERTY_OWNER') {
      this.router.navigate(['user/:id']);
    }
  }
}

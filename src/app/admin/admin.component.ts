import { Component, inject } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  service = inject(AdminService);
  service2 = inject(UserService);
  users: any;
  answer: any;

  ngOnInit(): void {
    this.service.getAllUsers().subscribe({
      next: (response) => (this.users = response),
      error: (err) => console.error(`Something is wrong... ${err}`),
      //complete: () => console.log('Data Fetch completed...')
    });

    this.service.getAllProperties().subscribe({
      next: (response) => (this.users = response),
      error: (err) => console.error(`Something is wrong... ${err}`),
      //complete: () => console.log('Data Fetch completed...')
    });
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

  postAddProperty() {
    const data = {};

    this.service.postAddProperty(data).subscribe({
      next: (response) => (this.answer = response),
      error: (err) => console.error(data),
    });
  }
}

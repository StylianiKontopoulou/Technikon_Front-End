import { Component, OnInit, inject } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { UserService } from '../services/user.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomValidatorsService } from '../services/custom-validators.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  service = inject(AdminService);
  service2 = inject(UserService);
  users: any;
  properties: any;
  answer: any;
  userForm!: FormGroup;
  propertyForm!: FormGroup;
  fb = inject(FormBuilder);
  private baseUrl = 'http://localhost:8080/webTechnikon/resources/admin';

  // Αρχικοποίηση του νέου property με τα κατάλληλα πεδία
  newProperty = {
    address: '',
    propertyId: null,
    user: { id: null },
    yearOfConstruction: null,
    propertyType: null,
  };

  newUser = {
    vat: '',
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    email: '',
    userName: '',
    password: '',
    userType: 'PROPERTY_OWNER', // Ή ADMIN ανάλογα με την επιλογή
  };

  ngOnInit(): void {
    this.userForm = this.fb.group(
      {
        vat: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        userName: ['', Validators.required],
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
            Validators.pattern('^[a-zA-Z]+$'),
          ],
        ],
        confirmPassword: ['', Validators.required],
        userType: ['PropertyOwner', Validators.required],
      },
      {
        validators: CustomValidatorsService.passwordMatchValidator,
      }
    );
    this.propertyForm = this.fb.group({
      address: ['', Validators.required],
      propertyId: ['', Validators.required],
      userId: ['', Validators.required],
      yearOfConstruction: ['', Validators.required],
      propertyType: ['', Validators.required],
    });
    // Get all users
    this.service.getAllUsers().subscribe({
      next: (response) => {
        console.log('Users:', response);
        this.users = response;
      },
      error: (err) => console.error(`Error fetching users: ${err}`),
      //complete: () => console.log('Data Fetch completed...')
    });

    // Get all properties
    this.service.getAllProperties().subscribe({
      next: (response) => {
        console.log('Properties:', response);
        this.properties = response;
      },
      error: (err) => console.error(`Error fetching users: ${err}`),
      //complete: () => console.log('Data Fetch completed...')
    });
  }

  postAddProperty(): any {
    this.service
      .postAddProperty({ ...this.newProperty, isActive: true })
      .subscribe({
        next: (response) => {
          this.answer = response;
          // Προσθήκη της νέας ιδιοκτησίας
          this.properties.push(response);
          // Καθαρισμός φόρμας μετά την επιτυχία
          this.newProperty = {
            address: '',
            propertyId: null,
            user: { id: null },
            yearOfConstruction: null,
            propertyType: null,
          };
        },
        error: (err) => console.error(`Error adding property: ${err}`),
      });
  }

  postAddUser(): any {
    this.service.postAddUser({ ...this.newUser, isActive: true }).subscribe({
      next: (response) => {
        this.answer = response;
        this.users.push(response);
        this.newUser = {
          vat: '',
          firstName: '',
          lastName: '',
          address: '',
          phoneNumber: '',
          email: '',
          userName: '',
          password: '',
          userType: 'PROPERTY_OWNER',
        };
      },
      error: (err) => console.error(`Error adding user: ${err}`),
    });
  }
}

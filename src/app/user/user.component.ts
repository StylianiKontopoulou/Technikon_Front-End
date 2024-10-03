import { Component, OnInit, inject } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  service = inject(UserService);
  authService = inject(AuthService);
  currentUser: any = {};
  users: any;
  properties: any;
  answer: any;
  userForm!: FormGroup;
  propertyForm!: FormGroup;
  repairForm!: FormGroup;

  fb = inject(FormBuilder);
  router = inject(Router);
  response: any;
  firstName: string | null = null;
  lastName: string | null = null;
  userId: string | null = null;
  route = inject(ActivatedRoute);
  repairs: any[] = [];
  propertyId: number = 0;
  selectedPropertyId: number | null = null;

  // Αρχικοποίηση του νέου property με τα κατάλληλα πεδία
  newProperty = {
    address: '',
    propertyId: null,
    user: { id: null },
    yearOfConstruction: null,
    propertyType: null,
  };

  repairTypes = [
    { label: 'Painting', value: 'PAINTING' },
    { label: 'Insulation', value: 'INSULATION' },
    { label: 'Frames', value: 'FRAMES' },
    { label: 'Plumbing', value: 'PLUMBING' },
    { label: 'Electrical work', value: 'ELECTRICALWORK' },
  ];

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');

    this.service.getUser(this.userId).subscribe({
      next: (response) => {
        this.currentUser = response;
        if (this.userForm) {
          this.userForm.patchValue({
            address: this.currentUser.address,
            email: this.currentUser.email,
          });
        }

        if (this.propertyForm) {
          this.propertyForm.patchValue({
            userId: this.currentUser.id,
          });
        }
      },
      error: (err) => console.error(`Error fetching user: ${err}`),
    });
    this.userForm = this.fb.group(
      {
        address: ['', Validators.required],
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
    this.propertyForm = this.fb.group({
      address: ['', Validators.required],
      propertyId: ['', Validators.required],
      userId: ['', Validators.required],
      yearOfConstruction: ['', Validators.required],
      propertyType: ['', Validators.required],
    });
    this.repairForm = this.fb.group({
      property: this.fb.group({
        id: [null, Validators.required],
      }),
      typeOfRepair: [this.repairTypes[0].value, Validators.required],
      shortDescription: ['', Validators.required],

      description: ['', Validators.required],
    });

    // Get all user's properties
    this.service.getAllMyProperties(this.userId).subscribe({
      next: (response) => {
        this.properties = response;
        if (this.properties.length > 0) {
          this.repairForm.patchValue({
            property: {
              id: this.properties[0].id,
            },
          });
        }
      },
      error: (err) => console.error(`Error fetching users: ${err}`),
      //complete: () => console.log('Data Fetch completed...')
    });
  }

  postAddProperty() {
    this.newProperty.user = { id: this.currentUser.id };
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

  postAddRepair() {
    if (this.repairForm.valid) {
      const repairData = {
        ...this.repairForm.value,
        status: 'PENDING',
        isActive: true,
        submissionDate: new Date().toISOString().split('T')[0],
      };

      console.log('Repair Data:', repairData);
      this.service.postAddRepair(repairData).subscribe({
        next: (response) => {
          console.log('Repair added successfully:', response);
          this.repairs.push(response);
          this.repairForm.reset();
        },
        error: (err) => console.error(`Error adding repair: ${err}`),
      });
    }
  }

  softDeleteUser(): void {
    this.service.softDeleteUser(this.userId).subscribe({
      next: () => {
        this.authService.logout();

        this.router.navigate([`/home`]);
      },
      error: (err) => console.error(`Error deleting user: ${err}`),
    });
  }

  putUpdateUser() {
    let userData = {
      ...this.currentUser,
      ...this.userForm.value,
    };

    delete userData.confirmPassword;

    this.service.putUpdateUser(this.userId, userData).subscribe({
      next: () => {
        localStorage.setItem(
          'authorizationHeader',
          btoa(`${userData.userName}:${userData.password}`)
        );
        this.currentUser = { ...userData };
        alert('Your account has been updated.');
      },
      error: (err) => console.error(`Error updating user: ${err}`),
    });
  }

  selectProperty(event: Event) {
    const selectedPropertyId = (event.target as HTMLSelectElement).value;
    this.service.getMyRepairs(+selectedPropertyId).subscribe({
      next: (response) => {
        this.repairs = response;
        console.log(`Repairs for property ${this.propertyId}:`, this.repairs);
      },
      error: (err) => console.error(`Error fetching repairs: ${err}`),
    });
  }
}

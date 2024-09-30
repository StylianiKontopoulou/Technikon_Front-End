import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  isLoggedIn = false;
  userName: string | null = null;
  userType: string | null = null;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to the AuthService to react to login/logout
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });

    this.authService.userName$.subscribe((name) => {
      this.userName = name;
    });
    this.authService.userType$.subscribe((userType) => {
      this.userType = userType;
    });
  }

  // Logout functionality
  logout() {
    this.authService.logout();
  }
}

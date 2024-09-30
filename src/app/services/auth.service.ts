import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Observable to store the user's logged-in state

  private loggedIn = new BehaviorSubject<boolean>(
    !!localStorage.getItem('userId')
  );
  private userName = new BehaviorSubject<string | null>(
    localStorage.getItem('firstName')
  );
  private userType = new BehaviorSubject<string | null>(
    localStorage.getItem('userType')
  );

  // Expose the observable
  isLoggedIn$: Observable<boolean> = this.loggedIn.asObservable();
  userName$: Observable<string | null> = this.userName.asObservable();
  userType$: Observable<string | null> = this.userType.asObservable();

  // Call this when user logs in
  login() {
    this.loggedIn.next(true);
    this.userName.next(localStorage.getItem('firstName'));
    this.userType.next(localStorage.getItem('userType'));
  }

  // Call this when user logs out
  logout() {
    this.loggedIn.next(false);
    this.userName.next(null);
    this.userType.next(null);
    localStorage.clear(); // clear user data
  }
}

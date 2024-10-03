import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { retry, catchError, throwError, Observable, pipe } from 'rxjs';
import { CommonModule } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/webTechnikon/resources';

  // Δημιουργία headers για Basic Auth
  private createAuthorizationHeader(): HttpHeaders {
    const auth = 'Basic ' + localStorage.getItem('authorizationHeader');
    return new HttpHeaders({ Authorization: auth });
  }

  getUser(userId: any): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get(`${this.baseUrl}/users/${userId}`, { headers });
  }

  login(data: any) {
    const url = `${this.baseUrl}/users/login`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(url, JSON.stringify(data), { headers }).pipe(
      retry(1),
      catchError((error) => throwError(() => 'Something is wrong...'))
    );
  }

  // Κλήση για λήψη όλων των properties με Basic Auth
  getAllMyProperties(userId: any): Observable<any> {
    const headers = this.createAuthorizationHeader();
    const url = `${this.baseUrl}/properties?userId=${userId}`;
    return this.http.get(url, { headers });
  }

  // Κλήση για προσθήκη νέου property με Basic Auth
  postAddProperty(property: any): Observable<any> {
    const headers = this.createAuthorizationHeader().set(
      'Content-Type',
      'application/json'
    );
    const url = `${this.baseUrl}/properties`;
    return this.http.post(url, JSON.stringify(property), { headers }).pipe(
      retry(1),
      catchError((error) => throwError(() => 'Something is wrong...'))
    );
  }

  onPropertySelect(propertyId: number) {
    const headers = this.createAuthorizationHeader();

    return this.http
      .get(`${this.baseUrl}/properties?propertyId=${propertyId}`, { headers })
      .pipe(
        retry(1),
        catchError((error) => {
          console.error(
            `Error fetching repairs for property ${propertyId}:`,
            error
          );
          return throwError(
            () => 'Something went wrong while fetching repairs.'
          );
        })
      );
  }

  getMyRepairs(propertyId: number): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http
      .get(`${this.baseUrl}/repairs?propertyId=${propertyId}`, { headers })
      .pipe(
        retry(1),
        catchError((error) => {
          console.error(
            `Error fetching repairs for property ${propertyId}:`,
            error
          );
          return throwError(
            () => 'Something went wrong while fetching repairs.'
          );
        })
      );
  }

  postAddRepair(repair: any): Observable<any> {
    const headers = this.createAuthorizationHeader().set(
      'Content-Type',
      'application/json'
    );
    const url = `${this.baseUrl}/repairs`;
    return this.http.post(url, JSON.stringify(repair), { headers }).pipe(
      retry(1),
      catchError((error) => throwError(() => 'Something is wrong...'))
    );
  }

  softDeleteUser(userId: any): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http
      .delete(`${this.baseUrl}/users/${userId}`, { headers })
      .pipe(
        retry(1),
        catchError((error) => {
          console.error('Error deleting user:', error);
          return throwError(() => 'Error deleting user.');
        })
      );
  }

  putUpdateUser(userId: any, userData: any): Observable<any> {
    const url = `${this.baseUrl}/users/${userId}`;
    const headers = this.createAuthorizationHeader().set(
      'Content-Type',
      'application/json'
    );
    return this.http.put(url, JSON.stringify(userData), { headers }).pipe(
      retry(1),
      catchError((error) => throwError(() => 'Failed to update user...'))
    );
  }
}

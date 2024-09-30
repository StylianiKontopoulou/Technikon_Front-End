import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { retry, catchError, throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/webTechnikon/resources';

  // Δημιουργία headers για Basic Auth
  private createAuthorizationHeader(): HttpHeaders {
    const auth = 'Basic ' + localStorage.getItem('authorizationHeader');
    return new HttpHeaders({ Authorization: auth });
  }

  // Κλήση για λήψη όλων των users με Basic Auth
  getAllUsers(): Observable<any> {
    const headers = this.createAuthorizationHeader();
    const url = `${this.baseUrl}/admin/users`;
    return this.http.get(url, { headers });
  }

  // Κλήση για λήψη όλων των properties με Basic Auth
  getAllProperties(): Observable<any> {
    const headers = this.createAuthorizationHeader();
    const url = `${this.baseUrl}/admin/properties`;
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

  // Κλήση για προσθήκη νέου χρήστη με Basic Auth
  postAddUser(newUser: any): Observable<any> {
    const headers = this.createAuthorizationHeader().set(
      'Content-Type',
      'application/json'
    );
    const url = `${this.baseUrl}/users/register`;
    return this.http.post(url, JSON.stringify(newUser), { headers }).pipe(
      retry(1),
      catchError((error) => throwError(() => 'Something is wrong...'))
    );
  }
}

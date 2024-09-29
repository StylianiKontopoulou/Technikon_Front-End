import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { retry, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient);

  getUser() {
    const url ='http://localhost:8080/webTechnikon/resources/Users/property-owners';
    return this.http.get(url);
  }

  login(data: any){
    const url ='http://localhost:8080/webTechnikon/resources/users/login';
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')

    return this.http.post(url,JSON.stringify(data), {headers:headers})
    .pipe(
      retry(1),
      catchError(error => throwError(() => 'Something is wrong...')) 
    );
  }
}


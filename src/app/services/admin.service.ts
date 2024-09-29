import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { retry, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  http = inject(HttpClient);

  getAllUsers() {
    const url ='http://localhost:8080/webTechnikon/resources/admin/users';
    return this.http.get(url);
  }

  getAllProperties(){
    const url = 'http://localhost:8080/webTechnikon/resources/admin/properties';
    return this.http.get(url);
  }
  postAddProperty(data: any){
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('crossDomain', 'true') 

    const url ='http://localhost:8080/webTechnikon/resources/admin/properties';
    return this.http.post(url,JSON.stringify(data), {headers:headers})
    .pipe(
      retry(1),
      catchError(error => throwError(() => 'Something is wrong...')) 
    );
  }

  postAddUser(data: any){
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('crossDomain', 'true') 

    const url ='http://localhost:8080/webTechnikon/resources/admin/users';
    return this.http.post(url,JSON.stringify(data), {headers:headers})
    .pipe(
      retry(1),
      catchError(error => throwError(() => 'Something is wrong...')) 
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient);

  url = 'https://localhost:8080/..';

  getUser() {
    return this.http.get(this.url);
  }
}


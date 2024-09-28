import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-not-found',
  standalone: true,
  imports: [],
  templateUrl: './file-not-found.component.html',
  styleUrl: './file-not-found.component.css'
})
export class FileNotFoundComponent {
  router = inject(Router);
  goHome(){
    this.router.navigate(['home'])
  }
}

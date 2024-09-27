import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  //  @Input() id!: string;
  //  @Input() search!: string;

  //  router = inject(Router);
  //  goHome(){
  //   this.router.navigate(['home'])
  //  }

  //  goAdmin() {
  //   this.router.navigateByUrl('/admin')
  //  }
}

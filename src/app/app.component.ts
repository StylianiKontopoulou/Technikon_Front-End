import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AdminComponent } from "./admin/admin.component";
import { UserComponent } from "./user/user.component";
import { LoginFormComponent } from "./login-form/login-form.component";
import { SelfRegistrationPageComponent } from "./self-registration-page/self-registration-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AdminComponent, UserComponent, LoginFormComponent, SelfRegistrationPageComponent, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'technikon';
}

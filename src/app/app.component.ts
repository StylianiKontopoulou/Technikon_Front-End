import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AdminComponent } from "./admin/admin.component";
import { UserComponent } from "./user/user.component";
import { LoginFormComponent } from "./login-form/login-form.component";
import { SelfRegistrationPageComponent } from "./self-registration-page/self-registration-page.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AdminComponent, UserComponent, LoginFormComponent, SelfRegistrationPageComponent, RouterLink, RouterLinkActive, NavBarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'technikon';
}

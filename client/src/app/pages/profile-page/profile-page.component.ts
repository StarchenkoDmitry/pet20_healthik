import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';
import { UserService } from '@core/user/user.service';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, InputTextModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePage {
  authService = inject(AuthService);
  userService = inject(UserService);

  isAuthenticated = this.authService.isAuthenticated();

  me$ = this.userService.getMe();
}

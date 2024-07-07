import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';
import { UserService } from '@core/user/user.service';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { shareReplay } from 'rxjs';

@Component({
  selector: 'profile-menu',
  standalone: true,
  imports: [CommonModule, AvatarModule, ButtonModule, SkeletonModule],
  templateUrl: './profile-menu.component.html',
  styleUrl: './profile-menu.component.scss',
})
export class ProfileMenuComponent {
  userService = inject(UserService);

  isAuthenticated = inject(AuthService).isAuthenticated();

  user$ = this.userService.getMe().pipe(shareReplay(1));

  showMenu = false;

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}

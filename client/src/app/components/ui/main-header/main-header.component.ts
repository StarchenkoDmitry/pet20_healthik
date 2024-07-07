import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ProfileMenuComponent } from "../header/profile-menu/profile-menu.component";

@Component({
    selector: 'app-main-header',
    standalone: true,
    templateUrl: './main-header.component.html',
    styleUrl: './main-header.component.scss',
    imports: [ButtonModule, CommonModule, ProfileMenuComponent]
})
export class MainHeaderComponent {
  showMenu = false;

  openMenu() {
    this.showMenu = true;
  }

  closeMenu() {
    this.showMenu = false;
  }
}

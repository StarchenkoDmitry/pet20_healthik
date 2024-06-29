import { Component } from '@angular/core';
import { MainHeaderComponent } from '@components/ui/main-header/main-header.component';
@Component({
  selector: 'app-main-layout',
  standalone: true,
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  imports: [MainHeaderComponent],
})
export class MainLayoutComponent {}

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BecomeAdminResponse } from '@common/types/role';
import { RoleService } from '@core/role/role.service';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'become-admin-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PasswordModule,
    FloatLabelModule,
    ButtonModule,
  ],
  templateUrl: './become-admin-page.component.html',
  styleUrl: './become-admin-page.component.scss',
})
export class BecomeAdminPage {
  roleService = inject(RoleService);

  secret = '';

  becameAdmin = false;
  resultType: BecomeAdminResponse['type'] | 'bad-request' | '' = '';

  panding = false;

  onSubmit() {
    if (this.panding || this.becameAdmin) return;

    this.panding = true;
    this.resultType = '';

    this.roleService.becomeAdmin(this.secret).subscribe({
      next: (value) => {
        this.resultType = value.type;
        if (value.type === 'success' || value.type === 'already-admin') {
          this.becameAdmin = true;
        }
      },
      error: (err) => {
        this.resultType = 'bad-request';
        this.panding = false;
      },
      complete: () => {
        this.panding = false;
      },
    });
  }
}

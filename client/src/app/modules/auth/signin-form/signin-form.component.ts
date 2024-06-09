import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../services/auth.service';
import {
  MAX_EMAIL_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_EMAIL_LENGTH,
  MIN_PASSWORD_LENGTH,
} from '@common/constants/auth';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { isString } from '@shared/utils/check';

@Component({
  selector: 'signin-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
  ],
  templateUrl: './signin-form.component.html',
  styleUrl: './signin-form.component.scss',
})
export class SigninFormComponent {
  authService = inject(AuthService);

  signinForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(MIN_EMAIL_LENGTH),
      Validators.maxLength(MAX_EMAIL_LENGTH),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(MIN_PASSWORD_LENGTH),
      Validators.maxLength(MAX_PASSWORD_LENGTH),
    ]),
  });

  get minEmailLanght() {
    return MIN_EMAIL_LENGTH;
  }

  get maxEmailLanght() {
    return MAX_EMAIL_LENGTH;
  }

  get minPasswordLanght() {
    return MIN_PASSWORD_LENGTH;
  }

  get maxPasswordLanght() {
    return MAX_PASSWORD_LENGTH;
  }

  get email() {
    return this.signinForm.controls['email'];
  }
  get password() {
    return this.signinForm.controls['password'];
  }

  loading = false;

  async onSubmit() {
    if (this.signinForm.invalid) return;

    const { email, password } = this.signinForm.value;

    if (!isString(email) || !isString(password)) return;

    if (this.loading) return;

    this.loading = true;

    this.authService.signin({ email, password }).subscribe({
      next: () => {
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
      },
    });
  }
}

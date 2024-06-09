import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

import { AuthService } from '../services/auth.service';
import {
  MAX_EMAIL_LENGTH,
  MAX_NAME_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_EMAIL_LENGTH,
  MIN_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
} from '@common/constants/auth';
import { isString } from '@shared/utils/check';

@Component({
  selector: 'signup-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,

    InputTextModule,
    FloatLabelModule,
    PasswordModule,
    ButtonModule,

    CommonModule,
  ],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss',
})
export class SignupFormComponent {
  authService = inject(AuthService);

  signupForm = new FormGroup({
    name: new FormControl('', [
      Validators.minLength(MIN_NAME_LENGTH),
      Validators.maxLength(MAX_NAME_LENGTH),
    ]),
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

  get minPasswordLanght() {
    return MIN_PASSWORD_LENGTH;
  }

  get maxPasswordLanght() {
    return MAX_PASSWORD_LENGTH;
  }

  get minEmailLanght() {
    return MIN_EMAIL_LENGTH;
  }

  get maxEmailLanght() {
    return MAX_EMAIL_LENGTH;
  }

  get name() {
    return this.signupForm.controls['name'];
  }
  get email() {
    return this.signupForm.controls['email'];
  }
  get password() {
    return this.signupForm.controls['password'];
  }

  loading = false;

  async onSubmit() {
    if (this.signupForm.invalid) return;

    const { name, email, password } = this.signupForm.value;

    if (!isString(name) || !isString(email) || !isString(password)) return;

    if (this.loading) return;

    this.loading = true;

    this.authService.signup({ name, email, password }).subscribe({
      next: () => {
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
      },
    });
  }
}

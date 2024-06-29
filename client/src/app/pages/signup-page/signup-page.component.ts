import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  debounceTime,
  map,
  of,
  switchMap,
  take,
} from 'rxjs';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '@core/auth/auth.service';
import {
  EMAIL_VERIFICATION_DELAY_TIME_MS,
  MAX_EMAIL_LENGTH,
  MAX_NAME_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_EMAIL_LENGTH,
  MIN_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
} from '@common/constants/auth';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { isString } from '@shared/utils/check';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    FloatLabelModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
  ],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss',
})
export class SignupPageComponent {
  authService = inject(AuthService);
  fb = inject(FormBuilder);
  router = inject(Router);

  form = this.fb.group(
    {
      name: this.fb.control('', {
        validators: [
          Validators.required,
          Validators.minLength(MIN_NAME_LENGTH),
          Validators.maxLength(MAX_NAME_LENGTH),
        ],
      }),
      email: this.fb.control('', {
        validators: [
          Validators.required,
          Validators.minLength(MIN_EMAIL_LENGTH),
          Validators.maxLength(MAX_EMAIL_LENGTH),
        ],
        asyncValidators: [this.emailVerificationValidator()],
      }),
      password: this.fb.control('', {
        validators: [
          Validators.required,
          Validators.minLength(MIN_PASSWORD_LENGTH),
          Validators.maxLength(MAX_PASSWORD_LENGTH),
        ],
      }),
      confirm_password: this.fb.control('', {
        validators: [
          Validators.required,
          Validators.minLength(MIN_PASSWORD_LENGTH),
          Validators.maxLength(MAX_PASSWORD_LENGTH),
        ],
      }),
    },
    {
      validators: this.matchValidator('password', 'confirm_password'),
    }
  );

  emailVerificationValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const email = control.value;
      return new BehaviorSubject('').pipe(
        debounceTime(EMAIL_VERIFICATION_DELAY_TIME_MS),
        switchMap(() => this.authService.isEmailRegistered({ email })),
        catchError((error, obs) => {
          console.error('emailValidator error: ', error);
          return of(true);
        }),
        take(1),
        map((res) => {
          return res ? { emailExists: true } : null;
        })
      );
    };
  }

  matchValidator(
    controlName: string,
    matchingControlName: string
  ): ValidatorFn {
    return (abstractControl: AbstractControl) => {
      const control = abstractControl.get(controlName);
      const matchingControl = abstractControl.get(matchingControlName);

      if (
        matchingControl!.errors &&
        !matchingControl!.errors?.['confirmedValidator']
      ) {
        return null;
      }

      if (control!.value !== matchingControl!.value) {
        const error = { confirmedValidator: 'Passwords do not match.' };
        matchingControl!.setErrors(error);
        return error;
      } else {
        matchingControl!.setErrors(null);
        return null;
      }
    };
  }

  get name() {
    return this.form.controls['name'];
  }
  get email() {
    return this.form.controls['email'];
  }
  get password() {
    return this.form.controls['password'];
  }
  get confirm_password() {
    return this.form.controls['confirm_password'];
  }

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

  get isNotPasswordAMatch() {
    return (
      this.form.get('password')!.valid &&
      this.form.get('confirm_password')!.dirty &&
      this.form.get('password')!.value !==
      this.form.get('confirm_password')!.value
    );
  }

  loading = false;

  async onSubmit() {
    if (!this.form.valid) return;

    const { name, email, password } = this.form.value;

    if (!isString(name) || !isString(email) || !isString(password)) return;

    if (this.loading) return;
    this.loading = true;

    this.authService.signup({ name, email, password }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['']);
      },
      error: (error) => {
        this.loading = false;
      },
    });
  }
}

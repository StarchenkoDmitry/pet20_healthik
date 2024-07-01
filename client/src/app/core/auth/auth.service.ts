import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  IsEmailRegisteredRequest,
  IsEmailRegisteredResponse,
  LogoutResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from '@common/types/auth';
import { environment } from '@environment';
import { UserService } from '@core/user/user.service';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  userService = inject(UserService);
  http = inject(HttpClient);

  signup(signupData: SignUpRequest) {
    return this.http.post<SignUpResponse>(`${environment.baseUrl}auth/signup`, signupData, {
      withCredentials: true
    }).pipe(
      tap((result) => {
        this.userService.saveUserId(result.userId);
      })
    );
  }

  signin(signinData: SignInRequest) {
    return this.http.post<SignInResponse>(`${environment.baseUrl}auth/signin`, signinData, {
      withCredentials: true
    }).pipe(
      tap((result) => {
        this.userService.saveUserId(result.userId);
      })
    );
  }

  logout() {
    return this.http.post<LogoutResponse>(`${environment.baseUrl}auth/logout`, {}, {
      withCredentials: true
    }).pipe(
      tap((exited) => {
        if(exited) this.userService.deleteUserId();
      })
    );
  }

  isEmailRegistered(data: IsEmailRegisteredRequest) {
    return this.http.post<IsEmailRegisteredResponse>(`${environment.baseUrl}auth/is-email-registered`,data);
  }

  isAuthenticated(): boolean {
    return !!this.userService.getUserId();
  }
}

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  LogoutResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from '@common/types/auth';
import { environment } from '@environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  http = inject(HttpClient);

  signup(signupData: SignUpRequest) {
    return this.http.post<SignUpResponse>(`${environment.baseUrl}auth/signup`, signupData, {
      withCredentials: true
    });
  }

  signin(signinData: SignInRequest) {
    return this.http.post<SignInResponse>(`${environment.baseUrl}auth/signin`, signinData, {
      withCredentials: true
    });
  }

  logout() {
    return this.http.post<LogoutResponse>(`${environment.baseUrl}auth/logout`, {}, {
      withCredentials: true
    });
  }
}

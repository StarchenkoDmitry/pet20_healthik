import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MeResponse } from '@common/types/user';
import { environment } from '@environment';

export const USER_ID_TOKEN = 'USER_ID';

@Injectable({ providedIn: 'root' })
export class UserService {
  http = inject(HttpClient);

  saveUserId(userId: string) {
    localStorage.setItem(USER_ID_TOKEN, userId);
  }

  deleteUserId() {
    localStorage.removeItem(USER_ID_TOKEN);
  }

  getUserId(): string | null {
    return localStorage.getItem('USER_ID');
  }

  getMe(){
    return this.http.get<MeResponse>(`${environment.baseUrl}user/me`,{
      withCredentials:true
    })
  }
}

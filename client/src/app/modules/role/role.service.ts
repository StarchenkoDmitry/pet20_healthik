import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BecomeAdminRequest, BecomeAdminResponse } from '@common/types/role';
import { environment } from '@environment';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  http = inject(HttpClient);

  becomeAdmin(secret: string) {
    const data: BecomeAdminRequest = { secret };
    const url = `${environment.baseUrl}api/role/become-admin`;
    return this.http.post<BecomeAdminResponse>(url, data, {
      withCredentials: true,
    });
  }
}

export class SignUpRequest {
  name!: string;
  email!: string;
  password!: string;
}

export class SignInRequest {
  email!: string;
  password!: string;
}

export type SignUpResponse = { id: string };
export type SignInResponse = boolean;
export type LogoutResponse = boolean;

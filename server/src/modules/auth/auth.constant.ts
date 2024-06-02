import { User } from '../user/user.entity';

export const REQ_KEY_USER = Symbol('user');

declare module 'express' {
  interface Request {
    [REQ_KEY_USER]: User | null | undefined;
  }
}

import { Socket } from 'socket.io';
import { User } from '../user/user.entity';

export interface UserSocket extends Socket {
  userSessionToken: string;
  user: User;
  userId: string;
}

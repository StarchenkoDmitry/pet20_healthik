import { User } from '../user/user.entity';

export type SignUpResult =
  | {
      _t: 'success';
      user: User;
    }
  | {
      _t: 'failed';
    };

export type SignInResult =
  | {
      _t: 'seccess';
      token: string;
    }
  | {
      _t:
        | 'user-not-found'
        | 'incorrect-password'
        | 'token-creation-error';
    };

export type CreateSessionResult =
  | { _t: 'seccess'; token: string }
  | { _t: 'failed' };

export type LogOutResult = { logOuted: boolean };

export type UserAndSessionResult =
  | {
      type: 'normal';
      user: User;
    }
  | {
      type: 'token-refresh';
      user: User;
      newToken: string;
    }
  | {
      type: 'token-not-found';
    }
  | {
      type: 'token-expired';
    };

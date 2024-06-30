// example string of '{userId}-{currentToken}'
export type RefreshID = string;

export interface RefreshTokenTask {
  userId: string;
  oldToken: string;
  newToken: string;
  lastUsed: Date;
  isCompleted: boolean;
  process: RefreshTokenPromise;
}

export type RefreshTokenPromise = Promise<RefreshResult>;

export type RefreshResult = {
  newToken: string;
};

export type CheckTokenLifetimeResult =
  | {
      needToUpdate: true;
      newToken: string;
    }
  | {
      needToUpdate: false;
    };

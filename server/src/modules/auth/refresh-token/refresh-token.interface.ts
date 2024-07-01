// example string of '{userId/{currentToken}'
export type RefreshID = string;

export interface RefreshTokenTask {
  lastUsed: Date;
  isCompleted: boolean;
  process: RefreshTokenPromise;
}

export type RefreshTokenPromise = Promise<RefreshResult>;

export type RefreshResult = {
  newToken: string;
};

export type BecomeAdminRequest = {
  secret: string;
};

export type BecomeAdminResponse = {
  type:  'success' | 'wrong-secret' | 'already-admin' | 'failed';
};

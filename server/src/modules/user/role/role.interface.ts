export type BecomeAdminResult = {
  type: 'success' | 'wrong-secret' | 'already-admin' | 'failed';
};

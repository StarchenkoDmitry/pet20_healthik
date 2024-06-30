import { SECOND } from 'src/common/constants/date';

export const SESSION_TOKEN_LENGTH = 16;
export const PASSWORD_SALT_ROUNDS = 8;

export const TOKEN_LIFETIME = 120 * SECOND;
export const TOKEN_UPDATE_TIME = 10 * SECOND;

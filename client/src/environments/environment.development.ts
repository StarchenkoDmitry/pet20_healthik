import { IEnvironment } from './environment.interface';

const BASE_URL = `http://${window.location.hostname}:3000/`;

export const environment: IEnvironment = {
  production: false,
  baseUrl: BASE_URL,
};

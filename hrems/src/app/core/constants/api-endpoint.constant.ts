import { environment } from '../../../environments/environment';

const API_BASE_URL = environment.apiBaseUrl;

export const API_ENDPOINT = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
};

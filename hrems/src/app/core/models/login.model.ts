export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: {
    status: string;
    statusCode: number;
    message: string;
  },
  data: TokenData
}

export interface TokenData {
    employeeId: string;
    name: string;
    role: string;
    token: string;
}

export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
    user: string;
}

export interface ForgotPasswordRequest {
  password: string;
}
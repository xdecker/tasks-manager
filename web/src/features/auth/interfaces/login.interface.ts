export interface LoginResponse {
  access_token: string;
  name: string;
  email: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

import { apiClient } from "@/lib/api";
import { LoginResponse, SignUpRequest } from "../interfaces";

export const loginRequest = (email: string, password: string) =>
  apiClient<LoginResponse>("/auth/login", "POST", {
    data: { email, password },
  });

export const signUpRequest = (data: SignUpRequest) =>
  apiClient<LoginResponse>("/auth/signup", "POST", {
    data,
  });

import { apiClient } from "../../../api/client";
import {
  LoginRequest,
  LoginResponse,
  SignUpRequest,
} from "@/features/auth/types/auth.types";

export async function loginRequest(data: LoginRequest) {
  const response = await apiClient.post<LoginResponse>("/auth/login", data);
  return response.data;
}

export async function signupRequest(data: SignUpRequest) {
  const response = await apiClient.post<LoginResponse>("/auth/signup", data);
  return response.data;
}

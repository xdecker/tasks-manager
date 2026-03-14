import { apiClient } from "../../../api/client";
import { LoginResponse } from "@/features/auth/types/auth.types";
import { LoginFormData } from "../schemas/login.schema";
import { SignupFormData } from "../schemas/signup.schema";

export async function loginRequest(data: LoginFormData) {
  const response = await apiClient.post<LoginResponse>("/auth/login", data);
  return response.data;
}

export async function signupRequest(data: SignupFormData) {
  const response = await apiClient.post<LoginResponse>("/auth/signup", data);
  return response.data;
}

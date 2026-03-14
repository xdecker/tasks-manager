import { loginRequest, signupRequest } from "@/features/auth/api/auth.api";
import { SignupFormData } from "../schemas/signup.schema";

export async function login(email: string, password: string) {
  const result = await loginRequest({
    email,
    password,
  });
  return result;
}

export async function signup(data: SignupFormData) {
  const result = await signupRequest(data);
  return result;
}

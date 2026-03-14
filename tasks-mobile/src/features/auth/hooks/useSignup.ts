import { useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { signup } from "../services/auth.service";
import { SignupFormData } from "../schemas/signup.schema";

export function useSignup() {
  const setToken = useAuthStore((state) => state.setToken);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (data: SignupFormData) => {
    try {
      setLoading(true);
      setError(null);

      const result = await signup(data);
      setToken(result.access_token);
    } catch (err: any) {
      setError(err.message ?? "something was wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSignup,
    loading,
    error,
  };
}

import { useState } from "react";
import { login } from "../services/auth.service";
import { useAuthStore } from "@/store/auth.store";

export function useLogin() {
  const setToken = useAuthStore((state) => state.setToken);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const result = await login(email, password);
      setToken(result.access_token);
    } catch (err: any) {
      setError(err.message ?? "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleLogin,
    loading,
    error,
  };
}

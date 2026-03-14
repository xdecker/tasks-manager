"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUpRequest } from "../api/auth.api";
import { useAuth } from "@/providers/auth.provider";
import { SignUpRequest } from "../interfaces";

export function useSignup() {
  const router = useRouter();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (data: SignUpRequest) => {
    try {
      setLoading(true);
      setError(null);

      const res = await signUpRequest(data);

      login(res.access_token, { email: res.email, name: res.name });

      router.replace("/dashboard");
    } catch (err: any) {
      setError(
        Array.isArray(err.message) ? err.message.join(", ") : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return { handleSignUp, loading, error };
}

"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useLogin } from "../hooks/useLogin";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { LoginRequest } from "../interfaces";
import Link from "next/link";

export const LoginForm = () => {
  const { handleLogin, loading, error } = useLogin();
  const {
    handleSubmit,
    register,
    formState: { isValid, errors },
    reset,
  } = useForm<LoginRequest>({});

  const onSubmit = (data: LoginRequest) => {
    handleLogin({ email: data.email, password: data.password });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="email@company.com"
          className={clsx("h-11", {
            "border-red-500": errors.email,
          })}
          {...register("email", { required: true })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          className={clsx("h-11", {
            "border-red-500": errors.password,
          })}
          {...register("password", { required: true })}
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button
        type="submit"
        disabled={!isValid}
        className="w-full h-11 text-base font-medium"
      >
        {loading ? "Loading..." : "Sign In"}
      </Button>
      <p className="text-center mb-3 font-bold">don't have account?</p>

      <Link href="/auth/signup" className="hover:underline">
        <div className=" p-3 bg-secondary font-bold rounded text-center">
          Sign Up
        </div>
      </Link>
    </form>
  );
};

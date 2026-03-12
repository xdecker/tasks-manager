"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { SignUpRequest } from "../interfaces";
import Link from "next/link";
import { useSignup } from "../hooks/useSignup";

export const SignUpForm = () => {
  const { handleSignUp, loading, error } = useSignup();

  const {
    handleSubmit,
    register,
    formState: { isValid, errors },
    watch,
  } = useForm<SignUpRequest>({});
  const password = watch("password");
  const onSubmit = (data: SignUpRequest) => {
    handleSignUp(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Insert your name"
          className={clsx("h-11", {
            "border-red-500": errors.name,
          })}
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Minimum 3 characters",
            },
          })}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="email@company.com"
          className={clsx("h-11", {
            "border-red-500": errors.email,
          })}
          {...register("email", { required: "Email is required" })}
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
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 4,
              message: "Minimum 4 characters",
            },
          })}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="cpassword">Confirm Password</Label>
        <Input
          id="cpassword"
          type="password"
          placeholder="••••••••"
          className={clsx("h-11", {
            "border-red-500": errors.confirmPassword,
          })}
          {...register("confirmPassword", {
            required: "Confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
        />

        {errors.confirmPassword && (
          <p className="text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" className="w-full h-11 text-base font-medium">
        {loading ? "Loading..." : "Sign Up"}
      </Button>
      <p className="text-center mb-3 font-bold">already have an account?</p>
      <Link href="/auth/login" className="hover:underline">
        <div className=" p-3 bg-secondary font-bold rounded text-center">
          Sign In
        </div>
      </Link>
    </form>
  );
};

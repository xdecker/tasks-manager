"use client";

import { useState } from "react";
import { AuthProvider } from "@/providers/auth.provider";
import { CustomDialogProvider } from "@/providers/custom-dialog.provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CustomDialogProvider>{children}</CustomDialogProvider>
    </AuthProvider>
  );
}

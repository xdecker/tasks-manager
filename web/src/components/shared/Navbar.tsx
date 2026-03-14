"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth.provider";
import { CheckSquare, LogOut } from "lucide-react";

export function Navbar() {
  const { logout } = useAuth();

  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <CheckSquare className="h-5 w-5" />
          <span className="font-semibold">Task Manager</span>
        </div>

        <nav className="flex items-center gap-6 text-sm">
          <button
            onClick={logout}
            className="cursor-pointer flex items-center gap-2 text-muted-foreground hover:text-foreground transition"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </nav>
      </div>
    </header>
  );
}

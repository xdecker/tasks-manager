import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { SignUpForm } from "@/features/auth/components";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background to-muted/40 p-4">
      <Card className="w-full max-w-md rounded-2xl shadow-xl border-muted/40">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Sign Up
          </CardTitle>

          <CardDescription>Enter your details to register</CardDescription>
        </CardHeader>

        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
}

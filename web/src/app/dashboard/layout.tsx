import { Navbar } from "@/components/shared";
import { AuthGuard } from "@/guards/auth.guard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-muted/40">
        <Navbar />
        <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
      </div>
    </AuthGuard>
  );
}

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ContextualHelp from "@/components/ui/ContextualHelp";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header variant="app" />
      <ProtectedRoute>
        <main className="min-h-screen">{children}</main>
        <ContextualHelp />
      </ProtectedRoute>
      <Footer />
    </>
  );
}

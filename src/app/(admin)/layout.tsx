import React from "react";
import { Sidebar } from "@/components/admin/sidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen bg-muted/40">
      <Sidebar />
      <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10">
        {children}
      </main>
    </div>
  );
} 
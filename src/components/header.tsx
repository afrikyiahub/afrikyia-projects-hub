"use client";

import { ThemeToggle } from "./theme-toggle";
import { LogOut, User } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle could go here */}
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        
        <div className="h-8 w-px bg-border mx-2"></div>
        
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col text-left rtl:text-right">
            <span className="text-sm font-medium">المسؤول</span>
            <span className="text-xs text-muted-foreground">admin@afrikyia.com</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground border border-border">
            <User className="w-5 h-5" />
          </div>
          <button
            onClick={handleLogout}
            className="p-2 rounded-full hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400 transition-colors text-muted-foreground"
            title="تسجيل الخروج"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

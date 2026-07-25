"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  CheckCircle2,
  Settings,
  Archive,
  PauseCircle,
  Wrench,
  MonitorPlay,
} from "lucide-react";

const navItems = [
  { href: "/", label: "الرئيسية", icon: LayoutDashboard },
  { href: "/projects", label: "جميع المشاريع", icon: FolderKanban },
  { href: "/projects?status=production", label: "المشاريع المنشورة", icon: CheckCircle2 },
  { href: "/projects?status=development", label: "قيد التطوير", icon: MonitorPlay },
  { href: "/projects?status=paused", label: "المتوقفة", icon: PauseCircle },
  { href: "/projects?status=archived", label: "المؤرشفة", icon: Archive },
  { href: "/tools", label: "أدوات العمل", icon: Wrench },
  { href: "/settings", label: "الإعدادات", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-card border-l border-border flex flex-col h-screen hidden md:flex sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-border">
        <h1 className="font-bold text-xl text-primary">Afrikyia Hub</h1>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith("/projects") && item.href === "/projects");
          // Note: A more complex matching might be needed if searchParams are used, 
          // but for simplicity, we just match pathname.

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-border">
        <div className="text-xs text-center text-muted-foreground">
          © {new Date().getFullYear()} Afrikyia Projects
        </div>
      </div>
    </aside>
  );
}

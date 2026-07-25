"use client";

import { useTheme } from "next-themes";
import { User, Moon, Sun, Monitor, Bell, Shield, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export function SettingsClient({ email }: { email: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (!mounted) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">الإعدادات</h1>
        <p className="text-muted-foreground">
          إدارة حسابك وتفضيلات المظهر لمنصة Afrikyia.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Profile Settings */}
        <section className="md:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              المعلومات الشخصية
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">البريد الإلكتروني (المسؤول)</label>
                <input 
                  type="email" 
                  disabled 
                  value={email} 
                  className="w-full p-2 rounded-lg border border-border bg-muted text-muted-foreground cursor-not-allowed" 
                />
                <p className="text-xs text-muted-foreground">البريد الإلكتروني لا يمكن تغييره من هنا.</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              الأمان
            </h2>
            <div className="space-y-4">
              <button disabled className="w-full md:w-auto bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-medium opacity-50 cursor-not-allowed flex items-center justify-center gap-2">
                تغيير كلمة المرور (قريباً)
              </button>
            </div>
          </div>
        </section>

        {/* Preferences */}
        <section className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Monitor className="w-5 h-5 text-primary" />
              المظهر (Theme)
            </h2>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setTheme("light")}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${theme === 'light' ? 'border-primary bg-primary/5 text-primary' : 'border-border bg-background hover:bg-muted'}`}
              >
                <Sun className="w-5 h-5" />
                الوضع الفاتح
              </button>
              <button 
                onClick={() => setTheme("dark")}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${theme === 'dark' ? 'border-primary bg-primary/5 text-primary' : 'border-border bg-background hover:bg-muted'}`}
              >
                <Moon className="w-5 h-5" />
                الوضع الداكن
              </button>
              <button 
                onClick={() => setTheme("system")}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${theme === 'system' ? 'border-primary bg-primary/5 text-primary' : 'border-border bg-background hover:bg-muted'}`}
              >
                <Monitor className="w-5 h-5" />
                مطابقة النظام
              </button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              الإشعارات
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              سيتم إضافة إعدادات الإشعارات في التحديثات القادمة.
            </p>
          </div>

          <div className="pt-4 border-t border-border">
            <button 
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 p-3 text-destructive hover:bg-destructive/10 rounded-lg transition-colors font-medium"
            >
              <LogOut className="w-5 h-5" />
              تسجيل الخروج
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}

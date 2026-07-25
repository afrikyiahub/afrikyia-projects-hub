"use client";

import { addTool } from "@/app/actions/tools";
import Link from "next/link";
import { ArrowRight, Save } from "lucide-react";
import { useState } from "react";

export default function NewToolPage() {
  const [isPaid, setIsPaid] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/tools"
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ArrowRight className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-primary">إضافة أداة جديدة</h1>
          <p className="text-muted-foreground mt-1">
            أدخل تفاصيل الأداة ومعلومات الدخول (اختياري).
          </p>
        </div>
      </div>

      <form action={addTool} className="space-y-6 bg-card border border-border rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">اسم الأداة *</label>
            <input 
              type="text" 
              name="name" 
              required
              placeholder="مثال: GitHub"
              className="w-full p-2.5 rounded-lg border border-border bg-background focus:outline-none focus:border-primary transition-colors" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">الرابط (URL) *</label>
            <input 
              type="url" 
              name="url" 
              required
              placeholder="https://..."
              className="w-full p-2.5 rounded-lg border border-border bg-background focus:outline-none focus:border-primary transition-colors text-left" 
              dir="ltr"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">رمز الأداة (إيموجي) *</label>
            <input 
              type="text" 
              name="icon" 
              required
              defaultValue="📁"
              className="w-full p-2.5 rounded-lg border border-border bg-background focus:outline-none focus:border-primary transition-colors text-center text-2xl" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">لون الخلفية (Tailwind Classes) *</label>
            <input 
              type="text" 
              name="color" 
              required
              defaultValue="bg-zinc-100 dark:bg-zinc-800"
              className="w-full p-2.5 rounded-lg border border-border bg-background focus:outline-none focus:border-primary transition-colors text-left" 
              dir="ltr"
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-medium">وصف الأداة *</label>
            <textarea 
              name="description" 
              required
              rows={3}
              placeholder="اكتب وصفاً قصيراً لدور هذه الأداة..."
              className="w-full p-2.5 rounded-lg border border-border bg-background focus:outline-none focus:border-primary transition-colors resize-none" 
            />
          </div>
        </div>

        <hr className="border-border" />

        <h3 className="font-bold text-lg">بيانات الدخول (اختياري)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">البريد الإلكتروني / اسم المستخدم</label>
            <input 
              type="text" 
              name="login_email" 
              placeholder="email@example.com"
              className="w-full p-2.5 rounded-lg border border-border bg-background focus:outline-none focus:border-primary transition-colors text-left" 
              dir="ltr"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">كلمة المرور</label>
            <input 
              type="text" 
              name="login_password" 
              placeholder="••••••••"
              className="w-full p-2.5 rounded-lg border border-border bg-background focus:outline-none focus:border-primary transition-colors text-left" 
              dir="ltr"
            />
          </div>
        </div>

        <hr className="border-border" />

        <h3 className="font-bold text-lg">بيانات الاشتراك</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              name="is_paid" 
              value="true"
              checked={isPaid}
              onChange={(e) => setIsPaid(e.target.checked)}
              className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
            />
            <span className="font-medium">هذه الأداة مدفوعة (تحتاج اشتراك)</span>
          </label>

          {isPaid && (
            <div className="space-y-2 max-w-md">
              <label className="text-sm font-medium">حالة الاشتراك</label>
              <select 
                name="subscription_status"
                className="w-full p-2.5 rounded-lg border border-border bg-background focus:outline-none focus:border-primary transition-colors cursor-pointer"
              >
                <option value="نشط (يجدد شهرياً)">نشط (يجدد شهرياً)</option>
                <option value="نشط (سنوي)">نشط (سنوي)</option>
                <option value="منتهي">منتهي</option>
                <option value="تم الإلغاء">تم الإلغاء</option>
                <option value="مدى الحياة (Lifetime)">مدى الحياة (Lifetime)</option>
              </select>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <button 
            type="submit"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            حفظ الأداة
          </button>
        </div>
      </form>
    </div>
  );
}

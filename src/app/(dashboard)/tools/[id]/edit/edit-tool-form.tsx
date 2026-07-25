"use client";

import { updateTool } from "@/app/actions/tools";
import { Save } from "lucide-react";
import { useState } from "react";
import { Tool } from "@/types";

export function EditToolForm({ tool }: { tool: Tool }) {
  const [isPaid, setIsPaid] = useState(tool.is_paid);
  
  const updateToolWithId = updateTool.bind(null, tool.id);

  return (
    <form action={updateToolWithId} className="space-y-6 bg-card border border-border rounded-xl p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">اسم الأداة *</label>
          <input 
            type="text" 
            name="name" 
            required
            defaultValue={tool.name}
            className="w-full p-2.5 rounded-lg border border-border bg-background focus:outline-none focus:border-primary transition-colors" 
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">الرابط (URL) *</label>
          <input 
            type="url" 
            name="url" 
            required
            defaultValue={tool.url}
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
            defaultValue={tool.icon}
            className="w-full p-2.5 rounded-lg border border-border bg-background focus:outline-none focus:border-primary transition-colors text-center text-2xl" 
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">لون الخلفية (Tailwind Classes) *</label>
          <input 
            type="text" 
            name="color" 
            required
            defaultValue={tool.color}
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
            defaultValue={tool.description}
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
            defaultValue={tool.login_email || ""}
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
            defaultValue={tool.login_password || ""}
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
              defaultValue={tool.subscription_status || "نشط (يجدد شهرياً)"}
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
          حفظ التعديلات
        </button>
      </div>
    </form>
  );
}

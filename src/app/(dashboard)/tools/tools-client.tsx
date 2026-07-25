"use client";

import { Tool } from "@/types";
import { deleteTool } from "@/app/actions/tools";
import { ExternalLink, Edit, Trash2, KeyRound, Copy, Check, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function ToolsClient({ tools }: { tools: Tool[] }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleReveal = (id: string) => {
    const newSet = new Set(revealedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setRevealedIds(newSet);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">أدوات العمل</h1>
          <p className="text-muted-foreground">
            دليل الروابط السريعة، بيانات الدخول، وإدارة الاشتراكات الخاصة بالشركة.
          </p>
        </div>
        <Link 
          href="/tools/new"
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          إضافة أداة
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="group bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col h-full"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${tool.color} text-3xl`}>
                  {tool.icon}
                </div>
                <div>
                  <h2 className="font-bold text-xl">{tool.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    {tool.is_paid ? (
                      <span className="text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500 px-2 py-0.5 rounded-full">
                        مدفوع
                      </span>
                    ) : (
                      <span className="text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500 px-2 py-0.5 rounded-full">
                        مجاني
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link 
                  href={`/tools/${tool.id}/edit`}
                  className="p-1.5 hover:bg-muted rounded-md text-muted-foreground hover:text-primary transition-colors"
                  title="تعديل"
                >
                  <Edit className="w-4 h-4" />
                </Link>
                <form action={deleteTool.bind(null, tool.id)}>
                  <button 
                    type="submit" 
                    className="p-1.5 hover:bg-destructive/10 rounded-md text-muted-foreground hover:text-destructive transition-colors"
                    title="حذف"
                    onClick={(e) => {
                      if (!confirm("هل أنت متأكد من حذف هذه الأداة؟")) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
            
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              {tool.description}
            </p>

            {tool.is_paid && tool.subscription_status && (
              <div className="mb-4 text-xs font-medium bg-muted p-2 rounded-md border border-border/50 text-foreground">
                <span className="text-muted-foreground ml-1">حالة الاشتراك:</span>
                {tool.subscription_status}
              </div>
            )}

            {(tool.login_email || tool.login_password) && (
              <div className="mb-6 bg-muted/50 rounded-lg p-3 border border-border/50">
                <button 
                  onClick={() => toggleReveal(tool.id)}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors w-full"
                >
                  <KeyRound className="w-4 h-4" />
                  {revealedIds.has(tool.id) ? "إخفاء بيانات الدخول" : "إظهار بيانات الدخول"}
                </button>
                
                {revealedIds.has(tool.id) && (
                  <div className="mt-3 space-y-2 text-sm" dir="ltr">
                    {tool.login_email && (
                      <div className="flex items-center justify-between bg-background p-2 rounded border border-border">
                        <span className="text-muted-foreground truncate ml-2">Email: {tool.login_email}</span>
                        <button 
                          onClick={() => handleCopy(tool.login_email!, `email-${tool.id}`)}
                          className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors shrink-0"
                        >
                          {copiedId === `email-${tool.id}` ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    )}
                    {tool.login_password && (
                      <div className="flex items-center justify-between bg-background p-2 rounded border border-border">
                        <span className="text-muted-foreground truncate ml-2">Pass: {tool.login_password}</span>
                        <button 
                          onClick={() => handleCopy(tool.login_password!, `pass-${tool.id}`)}
                          className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors shrink-0"
                        >
                          {copiedId === `pass-${tool.id}` ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            
            <div className="mt-auto pt-4 border-t border-border flex items-center justify-between text-sm text-primary font-medium opacity-80 hover:opacity-100 transition-opacity">
              <a
                href={tool.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 w-full"
              >
                <span>فتح الأداة</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
        {tools.length === 0 && (
          <div className="md:col-span-2 lg:col-span-3 text-center py-20 border-2 border-dashed border-border rounded-xl">
            <p className="text-muted-foreground text-lg">لم تقم بإضافة أي أدوات بعد.</p>
            <Link 
              href="/tools/new"
              className="text-primary hover:underline mt-2 inline-block font-medium"
            >
              أضف أول أداة الآن
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

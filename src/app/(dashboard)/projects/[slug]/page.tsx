import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { StatusBadge } from "@/components/status-badge";
import { 
  ExternalLink, GitBranch, Monitor, Database, Settings, 
  Calendar, CheckSquare, Clock, User, ArrowRight, Edit
} from "lucide-react";
import Link from "next/link";

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const supabase = await createClient();

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", resolvedParams.slug)
    .single();

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-muted-foreground text-sm">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <ArrowRight className="w-4 h-4" />
            العودة للرئيسية
          </Link>
          <span>/</span>
          <span>المشاريع</span>
          <span>/</span>
          <span className="text-foreground font-medium">{project.name}</span>
        </div>
        
        <Link 
          href={`/projects/${project.slug}/edit`}
          className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-medium hover:bg-secondary/80 transition-colors flex items-center gap-2 border border-border"
        >
          <Edit className="w-4 h-4" />
          تعديل المشروع
        </Link>
      </div>

      <div className="bg-card border border-border rounded-2xl p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start">
        <div className="w-24 h-24 rounded-2xl bg-muted flex items-center justify-center text-4xl shrink-0">
          {project.logo}
        </div>
        
        <div className="flex-1 space-y-4 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">{project.name}</h1>
              <p className="text-muted-foreground">{project.category}</p>
            </div>
            <StatusBadge status={project.status} />
          </div>
          
          <p className="text-lg leading-relaxed">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 pt-4">
            {(project.technologies || []).map((tech: string) => (
              <span key={tech} className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full border border-border">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-primary" />
              تفاصيل المشروع
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground block">العميل</span>
                <span className="font-medium flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  {project.client || "غير محدد"}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground block">تاريخ البدء</span>
                <span className="font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  {project.startDate ? new Date(project.startDate).toLocaleDateString("en-GB") : "غير محدد"}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground block">تاريخ التسليم</span>
                <span className="font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  {project.deliveryDate ? new Date(project.deliveryDate).toLocaleDateString("en-GB") : "غير محدد"}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground block">آخر تحديث</span>
                <span className="font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  {new Date(project.lastUpdate).toLocaleDateString("en-GB")}
                </span>
              </div>
            </div>
          </section>

          {project.notes && (
            <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">ملاحظات ومهام حالية</h2>
              <div className="p-4 bg-muted/50 rounded-lg border border-border/50 text-sm leading-relaxed whitespace-pre-wrap">
                {project.notes}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-6">
          <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4">روابط سريعة</h2>
            <div className="space-y-3">
              {project.productionUrl && (
                <a href={project.productionUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted border border-border transition-colors">
                  <div className="flex items-center gap-3">
                    <ExternalLink className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">البيئة الحية (Production)</span>
                  </div>
                </a>
              )}
              {project.previewUrl && (
                <a href={project.previewUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted border border-border transition-colors">
                  <div className="flex items-center gap-3">
                    <Monitor className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium">بيئة المعاينة (Preview)</span>
                  </div>
                </a>
              )}
              {project.adminUrl && (
                <a href={project.adminUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted border border-border transition-colors">
                  <div className="flex items-center gap-3">
                    <Settings className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">لوحة الإدارة (Admin)</span>
                  </div>
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted border border-border transition-colors">
                  <div className="flex items-center gap-3">
                    <GitBranch className="w-4 h-4 text-foreground" />
                    <span className="text-sm font-medium">مستودع الكود (GitHub)</span>
                  </div>
                </a>
              )}
              {project.supabaseUrl && (
                <a href={project.supabaseUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted border border-border transition-colors">
                  <div className="flex items-center gap-3">
                    <Database className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">قاعدة البيانات (Supabase)</span>
                  </div>
                </a>
              )}
              {!project.productionUrl && !project.previewUrl && !project.adminUrl && !project.githubUrl && !project.supabaseUrl && (
                <div className="text-center py-4 text-sm text-muted-foreground">
                  لا توجد روابط مضافة لهذا المشروع.
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

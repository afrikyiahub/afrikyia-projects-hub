import { updateProject } from "@/app/actions/projects";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Save } from "lucide-react";

export default async function EditProjectPage({
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

  // We need to bind the project ID to the updateProject action
  const updateProjectWithId = updateProject.bind(null, project.id);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 text-muted-foreground text-sm">
        <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
          <ArrowRight className="w-4 h-4" />
          العودة للرئيسية
        </Link>
        <span>/</span>
        <Link href={`/projects/${project.slug}`} className="hover:text-primary transition-colors">
          المشاريع
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">تعديل: {project.name}</span>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-primary mb-6">تعديل المشروع: {project.name}</h1>
        
        <form action={updateProjectWithId} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Basic Info */}
            <div className="space-y-4 md:col-span-2">
              <h2 className="text-lg font-semibold border-b border-border pb-2">المعلومات الأساسية</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">اسم المشروع *</label>
                  <input required name="name" type="text" defaultValue={project.name} className="w-full p-2 rounded-lg border border-border bg-background" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">أيقونة (إيموجي) - اختياري</label>
                  <input name="logo" type="text" defaultValue={project.logo} className="w-full p-2 rounded-lg border border-border bg-background" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">التصنيف *</label>
                  <input required name="category" type="text" defaultValue={project.category} className="w-full p-2 rounded-lg border border-border bg-background" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">الحالة *</label>
                  <select required name="status" defaultValue={project.status} className="w-full p-2 rounded-lg border border-border bg-background">
                    <option value="production">منشور (Production)</option>
                    <option value="development">قيد التطوير (Development)</option>
                    <option value="paused">متوقف (Paused)</option>
                    <option value="archived">مؤرشف (Archived)</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">العميل</label>
                  <input name="client" type="text" defaultValue={project.client || ""} className="w-full p-2 rounded-lg border border-border bg-background" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">وصف المشروع *</label>
                <textarea required name="description" defaultValue={project.description || ""} rows={3} className="w-full p-2 rounded-lg border border-border bg-background"></textarea>
              </div>
            </div>

            {/* URLs */}
            <div className="space-y-4 md:col-span-2 mt-4">
              <h2 className="text-lg font-semibold border-b border-border pb-2">الروابط السريعة</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary">البيئة الحية (Production URL)</label>
                  <input name="productionUrl" type="url" defaultValue={project.productionUrl || ""} className="w-full p-2 rounded-lg border border-border bg-background" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-orange-500">بيئة المعاينة (Preview URL)</label>
                  <input name="previewUrl" type="url" defaultValue={project.previewUrl || ""} className="w-full p-2 rounded-lg border border-border bg-background" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">لوحة الإدارة (Admin URL)</label>
                  <input name="adminUrl" type="url" defaultValue={project.adminUrl || ""} className="w-full p-2 rounded-lg border border-border bg-background" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">مستودع الكود (GitHub URL)</label>
                  <input name="githubUrl" type="url" defaultValue={project.githubUrl || ""} className="w-full p-2 rounded-lg border border-border bg-background" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Vercel URL</label>
                  <input name="vercelUrl" type="url" defaultValue={project.vercelUrl || ""} className="w-full p-2 rounded-lg border border-border bg-background" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-green-500">Supabase URL</label>
                  <input name="supabaseUrl" type="url" defaultValue={project.supabaseUrl || ""} className="w-full p-2 rounded-lg border border-border bg-background" />
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4 md:col-span-2 mt-4">
              <h2 className="text-lg font-semibold border-b border-border pb-2">التفاصيل الفنية والزمنية</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">تاريخ البدء</label>
                  <input name="startDate" type="date" defaultValue={project.startDate ? String(project.startDate).split('T')[0] : ""} className="w-full p-2 rounded-lg border border-border bg-background" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">تاريخ التسليم المتوقع</label>
                  <input name="deliveryDate" type="date" defaultValue={project.deliveryDate ? String(project.deliveryDate).split('T')[0] : ""} className="w-full p-2 rounded-lg border border-border bg-background" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">التقنيات المستخدمة (مفصولة بفاصلة)</label>
                  <input name="technologies" type="text" defaultValue={(project.technologies || []).join(", ")} className="w-full p-2 rounded-lg border border-border bg-background" placeholder="Next.js, Tailwind CSS, Supabase" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">ملاحظات ومهام إضافية</label>
                  <textarea name="notes" rows={3} defaultValue={project.notes || ""} className="w-full p-2 rounded-lg border border-border bg-background"></textarea>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-6 border-t border-border flex justify-end">
            <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
              <Save className="w-5 h-5" />
              حفظ التعديلات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

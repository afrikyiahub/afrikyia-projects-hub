"use client";

import { useState } from "react";
import { StatCard } from "@/components/stat-card";
import { ProjectCard } from "@/components/project-card";
import { Project, ProjectStatus } from "@/types";
import { FolderKanban, CheckCircle2, MonitorPlay, PauseCircle, Search, Plus } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export function DashboardClient({ initialProjects }: { initialProjects: Project[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const initialStatus = searchParams.get("status") as ProjectStatus | "all" || "all";
  
  const [searchQuery, setSearchQuery] = useState("");
  const statusFilter = initialStatus;
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const categories = Array.from(new Set(initialProjects.map(p => p.category)));

  const filteredProjects = initialProjects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (project.description || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || project.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalCount = initialProjects.length;
  const productionCount = initialProjects.filter(p => p.status === "production").length;
  const devCount = initialProjects.filter(p => p.status === "development").length;
  const pausedCount = initialProjects.filter(p => p.status === "paused").length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-1 text-primary">نظرة عامة على المشاريع</h2>
          <p className="text-muted-foreground">ملخص لجميع مشاريع شركة Afrikyia الحالية والسابقة.</p>
        </div>
        <Link 
          href="/projects/new" 
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2 w-fit"
        >
          <Plus className="w-5 h-5" />
          إضافة مشروع جديد
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="إجمالي المشاريع" value={totalCount} icon={<FolderKanban className="w-5 h-5" />} />
        <StatCard title="مشاريع منشورة" value={productionCount} icon={<CheckCircle2 className="w-5 h-5" />} />
        <StatCard title="قيد التطوير" value={devCount} icon={<MonitorPlay className="w-5 h-5" />} />
        <StatCard title="مشاريع متوقفة" value={pausedCount} icon={<PauseCircle className="w-5 h-5" />} />
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border border-border">
        <div className="relative w-full md:w-96">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="ابحث عن مشروع..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-background border border-border rounded-lg pl-4 pr-10 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="flex w-full md:w-auto gap-4">
          <select
            value={statusFilter}
            onChange={(e) => {
              router.push(`/?status=${e.target.value}`);
            }}
            className="w-full md:w-auto bg-background border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer"
          >
            <option value="all">جميع الحالات</option>
            <option value="production">منشور</option>
            <option value="development">قيد التطوير</option>
            <option value="paused">متوقف</option>
            <option value="archived">مؤرشف</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full md:w-auto bg-background border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer"
          >
            <option value="all">جميع التصنيفات</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-muted-foreground bg-card rounded-xl border border-border border-dashed flex flex-col items-center justify-center gap-4">
          <p>لا توجد مشاريع مطابقة للبحث أو التصفية.</p>
          <Link 
            href="/projects/new" 
            className="text-primary hover:underline flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            أضف مشروعاً جديداً
          </Link>
        </div>
      )}
    </div>
  );
}

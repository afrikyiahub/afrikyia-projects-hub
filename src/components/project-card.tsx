import Link from "next/link";
import { Project } from "@/types";
import { StatusBadge } from "./status-badge";
import { ExternalLink, GitBranch, Monitor, Database, Settings } from "lucide-react";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-card text-card-foreground border border-border rounded-xl p-6 shadow-sm hover:shadow-md hover:border-primary/50 transition-all flex flex-col h-full relative group cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-2xl">
            {project.logo}
          </div>
          <div>
            <Link href={`/projects/${project.slug}`} className="hover:underline before:absolute before:inset-0 before:z-0">
              <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{project.name}</h3>
            </Link>
            <p className="text-xs text-muted-foreground">{project.category}</p>
          </div>
        </div>
        <StatusBadge status={project.status} />
      </div>

      <p className="text-sm text-muted-foreground mb-6 flex-1 line-clamp-3">
        {project.description}
      </p>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
        <div className="flex gap-2 relative z-10">
          {project.productionUrl && (
            <a
              href={project.productionUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              title="رابط الموقع"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          {project.adminUrl && (
            <a
              href={project.adminUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              title="لوحة الإدارة"
            >
              <Settings className="w-4 h-4" />
            </a>
          )}
          {project.previewUrl && (
            <a
              href={project.previewUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              title="رابط Preview"
            >
              <Monitor className="w-4 h-4" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              title="GitHub"
            >
              <GitBranch className="w-4 h-4" />
            </a>
          )}
          {project.supabaseUrl && (
            <a
              href={project.supabaseUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              title="Supabase"
            >
              <Database className="w-4 h-4" />
            </a>
          )}
        </div>
        <div className="text-xs text-muted-foreground">
          آخر تحديث: {new Date(project.lastUpdate).toLocaleDateString("ar-EG")}
        </div>
      </div>
    </div>
  );
}

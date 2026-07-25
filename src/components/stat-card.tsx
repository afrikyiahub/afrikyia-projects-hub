import { type ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  description?: string;
  className?: string;
}

export function StatCard({ title, value, icon, description, className = "" }: StatCardProps) {
  return (
    <div className={`bg-card text-card-foreground border border-border rounded-xl p-6 shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="text-primary">{icon}</div>
      </div>
      <div className="text-3xl font-bold">{value}</div>
      {description && <p className="text-xs text-muted-foreground mt-2">{description}</p>}
    </div>
  );
}

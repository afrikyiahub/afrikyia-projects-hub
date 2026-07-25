import { ProjectStatus } from "@/types";

const statusConfig: Record<ProjectStatus, { label: string; className: string }> = {
  production: {
    label: "منشور",
    className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  },
  development: {
    label: "قيد التطوير",
    className: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  },
  paused: {
    label: "متوقف",
    className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  },
  archived: {
    label: "مؤرشف",
    className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400",
  },
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}

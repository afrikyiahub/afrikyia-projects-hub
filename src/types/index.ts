export type ProjectStatus = "production" | "development" | "paused" | "archived";

export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  category: string;
  status: ProjectStatus;
  productionUrl?: string;
  adminUrl?: string;
  previewUrl?: string;
  githubUrl?: string;
  vercelUrl?: string;
  supabaseUrl?: string;
  technologies: string[];
  client?: string;
  startDate?: string;
  deliveryDate?: string;
  lastUpdate: string;
  notes?: string;
}

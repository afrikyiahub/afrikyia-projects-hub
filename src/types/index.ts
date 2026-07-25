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

export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: string;
  color: string;
  login_email?: string | null;
  login_password?: string | null;
  is_paid: boolean;
  subscription_status?: string | null;
  created_at: string;
}

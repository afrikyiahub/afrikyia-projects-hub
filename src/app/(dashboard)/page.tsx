import { Suspense } from "react";
import { createClient } from "@/utils/supabase/server";
import { DashboardClient } from "./dashboard-client";

export default async function DashboardHome() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">جاري التحميل...</div>}>
      <DashboardClient initialProjects={projects || []} />
    </Suspense>
  );
}

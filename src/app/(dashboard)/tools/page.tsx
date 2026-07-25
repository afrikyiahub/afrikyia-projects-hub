import { createClient } from "@/utils/supabase/server";
import { ToolsClient } from "./tools-client";

export default async function ToolsPage() {
  const supabase = await createClient();
  const { data: tools } = await supabase
    .from("tools")
    .select("*")
    .order("created_at", { ascending: false });

  return <ToolsClient tools={tools || []} />;
}

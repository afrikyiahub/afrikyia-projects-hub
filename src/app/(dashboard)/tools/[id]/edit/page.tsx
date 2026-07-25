import { updateTool } from "@/app/actions/tools";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Save } from "lucide-react";
import { EditToolForm } from "./edit-tool-form";

export default async function EditToolPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  
  const { data: tool } = await supabase
    .from("tools")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!tool) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/tools"
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ArrowRight className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-primary">تعديل الأداة: {tool.name}</h1>
          <p className="text-muted-foreground mt-1">
            قم بتحديث تفاصيل الأداة ومعلومات الدخول والاشتراك.
          </p>
        </div>
      </div>

      <EditToolForm tool={tool} />
    </div>
  );
}

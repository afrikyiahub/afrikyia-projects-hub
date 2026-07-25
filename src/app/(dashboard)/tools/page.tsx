import { Wrench } from "lucide-react";

export default function ToolsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] space-y-4">
      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
        <Wrench className="w-10 h-10 text-primary" />
      </div>
      <h1 className="text-3xl font-bold text-primary">أدوات العمل</h1>
      <p className="text-muted-foreground text-lg text-center max-w-md">
        هذا القسم قيد التطوير. قريباً ستتمكن من الوصول إلى جميع أدوات العمل الخاصة بشركة Afrikyia من هنا.
      </p>
    </div>
  );
}

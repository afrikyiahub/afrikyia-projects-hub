import { ExternalLink, GitBranch, Database, PenTool, Briefcase, Mail, MonitorPlay } from "lucide-react";

export default function ToolsPage() {
  const tools = [
    {
      name: "GitHub",
      description: "مستودعات الكود المصدري الخاصة بمشاريع Afrikyia. يحتوي على جميع السورسات الخاصة بالمنصات.",
      url: "https://github.com",
      icon: <GitBranch className="w-8 h-8 text-foreground" />,
      color: "bg-zinc-100 dark:bg-zinc-800",
    },
    {
      name: "Vercel",
      description: "منصة الاستضافة السحابية لجميع واجهات المشاريع (Front-end) ولوحات التحكم.",
      url: "https://vercel.com",
      icon: <MonitorPlay className="w-8 h-8 text-foreground" />,
      color: "bg-zinc-100 dark:bg-zinc-800",
    },
    {
      name: "Supabase",
      description: "قواعد البيانات، وإدارة المستخدمين، ومساحات التخزين الخاصة بجميع المشاريع.",
      url: "https://supabase.com",
      icon: <Database className="w-8 h-8 text-green-500" />,
      color: "bg-green-100 dark:bg-green-900/30",
    },
    {
      name: "Figma",
      description: "مساحة تصميم واجهات المستخدم (UI/UX) والنماذج الأولية للمشاريع الجديدة.",
      url: "https://figma.com",
      icon: <PenTool className="w-8 h-8 text-pink-500" />,
      color: "bg-pink-100 dark:bg-pink-900/30",
    },
    {
      name: "Google Workspace",
      description: "البريد الإلكتروني للشركة، المستندات، وجداول البيانات المشتركة بين الفريق.",
      url: "https://workspace.google.com",
      icon: <Mail className="w-8 h-8 text-blue-500" />,
      color: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      name: "Notion",
      description: "توثيق المشاريع، وكتابة المتطلبات، وإدارة المهام وتدوين ملاحظات الاجتماعات.",
      url: "https://notion.so",
      icon: <Briefcase className="w-8 h-8 text-foreground" />,
      color: "bg-zinc-100 dark:bg-zinc-800",
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">أدوات العمل (Quick Links)</h1>
        <p className="text-muted-foreground">
          دليل الروابط السريعة للوصول إلى كافة الأدوات والمنصات التي تعتمد عليها شركة Afrikyia.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <a
            key={tool.name}
            href={tool.url}
            target="_blank"
            rel="noreferrer"
            className="group bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md hover:border-primary/50 transition-all flex flex-col h-full"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${tool.color}`}>
                {tool.icon}
              </div>
              <div>
                <h2 className="font-bold text-xl group-hover:text-primary transition-colors">{tool.name}</h2>
              </div>
            </div>
            
            <p className="text-muted-foreground text-sm flex-1 leading-relaxed mb-6">
              {tool.description}
            </p>
            
            <div className="mt-auto pt-4 border-t border-border flex items-center justify-between text-sm text-primary font-medium opacity-80 group-hover:opacity-100 transition-opacity">
              <span>فتح الأداة</span>
              <ExternalLink className="w-4 h-4" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

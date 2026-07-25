import { login } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>;
}) {
  const resolvedSearchParams = await searchParams;

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mt-[20vh] mx-auto">
      <div className="flex flex-col text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-primary">Afrikyia Projects Hub</h1>
        <p className="text-muted-foreground text-sm">تسجيل الدخول للوصول إلى لوحة الإدارة</p>
      </div>

      <form className="flex-1 flex flex-col w-full justify-center gap-4 text-foreground">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium" htmlFor="email">
            البريد الإلكتروني
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border border-border focus:border-primary focus:outline-none transition-colors"
            name="email"
            placeholder="you@example.com"
            required
            dir="ltr"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium" htmlFor="password">
            كلمة المرور
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border border-border focus:border-primary focus:outline-none transition-colors"
            type="password"
            name="password"
            placeholder="••••••••"
            required
            dir="ltr"
          />
        </div>

        <button
          formAction={login}
          className="bg-primary text-primary-foreground font-medium rounded-md px-4 py-2 mt-4 hover:bg-primary/90 transition-colors"
        >
          تسجيل الدخول
        </button>

        {resolvedSearchParams?.message && (
          <p className="mt-4 p-4 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-center rounded-md text-sm">
            {resolvedSearchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}

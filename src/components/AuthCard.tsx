import type { ReactNode } from "react";

export function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-start justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
          {subtitle ? (
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
        <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-[0_10px_40px_-24px_oklch(0.208_0.042_265.755_/_0.55)] sm:p-8">
          {children}
        </div>
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  FlaskConical,
  Bot,
  ChevronLeft,
  ChevronRight,
  Settings,
  User,
} from "lucide-react";

const navigation = [
  { name: "Resumen", href: "/", icon: LayoutDashboard },
  { name: "Proyecto", href: "/proyecto", icon: FolderKanban },
  { name: "Operativo", href: "/operativo", icon: FlaskConical },
  { name: "Chatbot", href: "/chatbot", icon: Bot },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-[var(--background)]">
      {/* Sidebar */}
      <aside
        className={`flex flex-col border-r border-[var(--border)] bg-[var(--sidebar)] transition-all duration-300 ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-[var(--border)] px-4">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary)] neon-border-cyan">
                <span className="text-sm font-bold text-[var(--primary-foreground)] text-glow-cyan">VL</span>
              </div>
              <span className="font-semibold text-[var(--foreground)] text-glow-cyan">VeriTest.LAB</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-lg p-1.5 text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-3">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[var(--primary)]/10 text-[var(--primary)] neon-border-cyan"
                    : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                <item.icon className={`h-5 w-5 flex-shrink-0 ${isActive ? "text-glow-cyan" : ""}`} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-[var(--border)] p-3">
          <div
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-[var(--muted-foreground)] hover:bg-[var(--muted)] transition-colors ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary)]/20 border border-[var(--primary)]">
              <User className="h-4 w-4 text-[var(--primary)]" />
            </div>
            {!collapsed && (
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-[var(--foreground)]">Carlos R.</p>
                <p className="text-xs text-[var(--muted-foreground)]">Administrador</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-[var(--border)] bg-[var(--card)] px-6">
          <div>
            <h1 className="text-lg font-semibold text-[var(--foreground)]">
              {navigation.find((n) => n.href === pathname)?.name || "Dashboard"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[var(--muted-foreground)]">
              {new Date().toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <button className="rounded-lg p-2 text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
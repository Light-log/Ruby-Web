"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: string | number;
}

export interface NavGroup {
  title?: string;
  items: NavItem[];
}

interface SidebarNavProps {
  groups: NavGroup[];
  className?: string;
}

export function SidebarNav({ groups, className }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("space-y-6", className)}>
      {groups.map((group, gi) => (
        <div key={gi}>
          {group.title && (
            <p className="px-3 mb-2 text-xs font-semibold tracking-widest uppercase text-slate-400">
              {group.title}
            </p>
          )}
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                      active
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-slate-300 hover:bg-slate-700/60 hover:text-white"
                    )}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge !== undefined && (
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-xs font-semibold",
                          active
                            ? "bg-white/20 text-white"
                            : "bg-slate-600 text-slate-200"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

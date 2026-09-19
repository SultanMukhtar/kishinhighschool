"use client";

import { Menu, User } from "lucide-react";
import { Student } from "@/data/students";
import ThemeToggle from "@/components/ThemeToggle";

interface TopbarProps {
  student: Student;
  onMenuClick: () => void;
  title?: string;
}

export default function Topbar({ student, onMenuClick, title }: TopbarProps) {
  return (
    <header className="glass-panel sticky top-0 z-20 flex items-center gap-4 border-b border-kishin-line/8 px-4 py-4 sm:px-6">
      <button
        onClick={onMenuClick}
        className="rounded-md p-2 text-kishin-white hover:bg-kishin-line/5 lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-lg tracking-[0.08em] text-kishin-white sm:text-xl">
          {title ?? "KISHIN HIGH SCHOOL"}
        </p>
      </div>

      <ThemeToggle />

      <div className="flex items-center gap-2.5 rounded-full border border-kishin-line/10 bg-kishin-inset/40 py-1.5 pl-1.5 pr-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-kishin-red/20 text-kishin-red">
          <User className="h-4 w-4" />
        </div>
        <div className="hidden text-left sm:block">
          <p className="text-xs font-semibold leading-tight text-kishin-white">{student.icName}</p>
          <p className="text-[10px] leading-tight text-kishin-gray">{student.class}</p>
        </div>
      </div>
    </header>
  );
}

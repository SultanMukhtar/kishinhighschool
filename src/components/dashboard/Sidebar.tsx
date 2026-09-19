"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  User,
  Landmark,
  ScrollText,
  BookOpen,
  Swords,
  Building2,
  GraduationCap,
  Megaphone,
  AlertOctagon,
  Settings,
  LogOut,
  X,
  ShieldCheck,
  Lock,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import KishinLogo from "@/components/KishinLogo";
import { FeatureKey, getLockedFeatures } from "@/lib/permissions";

const navItems: { href: string; label: string; icon: React.ElementType; feature?: FeatureKey }[] = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/profile", label: "Student Profile", icon: User },
  { href: "/school-information", label: "School Information", icon: Landmark },
  { href: "/rules", label: "School Rules", icon: ScrollText },
  { href: "/curriculum", label: "Curriculum", icon: BookOpen },
  { href: "/coaching-clinic", label: "Coaching Clinic", icon: Swords, feature: "coaching-clinic" },
  { href: "/facilities", label: "Facilities", icon: Building2 },
  { href: "/classes", label: "Class Directory", icon: GraduationCap, feature: "classes" },
  { href: "/announcements", label: "Announcements", icon: Megaphone, feature: "announcements" },
  { href: "/report", label: "Report Player", icon: AlertOctagon, feature: "report" },
  { href: "/settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { student, logout } = useAuth();
  const lockedFeatures = student ? getLockedFeatures(student.status) : [];

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-white/8 px-6 py-6">
        <KishinLogo size={40} className="shadow-red-glow-sm" />
        <div className="min-w-0">
          <p className="truncate font-display text-lg tracking-[0.1em] text-kishin-white">
            KISHIN HIGH SCHOOL
          </p>
          <p className="text-[10px] tracking-[0.25em] text-kishin-gray">GAKURAN ROLEPLAY</p>
        </div>
        <button
          onClick={onClose}
          className="ml-auto rounded-md p-1.5 text-kishin-gray hover:bg-white/5 hover:text-white lg:hidden"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            const locked = item.feature ? lockedFeatures.includes(item.feature) : false;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  title={locked ? "Fitur dikunci untuk status keanggotaan Anda saat ini" : undefined}
                  className={`group flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-all ${
                    locked
                      ? "text-kishin-gray/50 hover:bg-white/5 hover:text-kishin-gray"
                      : active
                        ? "bg-kishin-red/15 text-kishin-white shadow-[inset_2px_0_0_0_#c81e2c]"
                        : "text-kishin-gray hover:bg-white/5 hover:text-kishin-white"
                  }`}
                >
                  <Icon
                    className={`h-[18px] w-[18px] shrink-0 ${
                      locked
                        ? "text-kishin-gray/40"
                        : active
                          ? "text-kishin-red"
                          : "text-kishin-gray group-hover:text-kishin-red"
                    }`}
                  />
                  <span className="truncate tracking-wide">{item.label}</span>
                  {locked && <Lock className="ml-auto h-3.5 w-3.5 shrink-0 text-kishin-gray/40" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-white/8 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg border border-kishin-red/30 bg-kishin-red/5 px-3.5 py-2.5 text-sm font-semibold tracking-wide text-kishin-redlight transition hover:bg-kishin-red/20"
        >
          <LogOut className="h-[18px] w-[18px]" />
          Logout
        </button>
        <div className="mt-3 flex items-center gap-1.5 px-1 text-[10px] tracking-[0.2em] text-kishin-gray/70">
          <ShieldCheck className="h-3 w-3" />
          LOCAL SESSION SECURED
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="glass-panel fixed inset-y-0 left-0 z-30 hidden w-72 lg:flex">{content}</aside>

      <div
        className={`fixed inset-0 z-40 lg:hidden ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div
          onClick={onClose}
          className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <aside
          className={`glass-panel absolute inset-y-0 left-0 w-72 transform transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {content}
        </aside>
      </div>
    </>
  );
}

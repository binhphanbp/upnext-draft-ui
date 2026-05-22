import {
  Bot,
  BriefcaseBusiness,
  ClipboardCheck,
  FileText,
  Gauge,
  House,
  Layers3,
  LockKeyhole,
  Search,
  ShieldAlert,
  ShieldCheck,
  UsersRound,
  WalletCards,
} from "lucide-react";
import type { Role, RouteItem } from "./types";

export const routes: RouteItem[] = [
  { path: "/login", label: "Login", role: "access", icon: LockKeyhole },
  { path: "/register", label: "Register", role: "access", icon: LockKeyhole },
  { path: "/candidate", label: "Find Jobs", role: "candidate", icon: Search, badge: "326" },
  { path: "/candidate/profile", label: "Profile & CV", role: "candidate", icon: FileText, badge: "4" },
  { path: "/candidate/applications", label: "Applications", role: "candidate", icon: ClipboardCheck, badge: "12" },
  { path: "/candidate/ai", label: "AI Interview", role: "candidate", icon: Bot },
  { path: "/employer", label: "Recruitment Report", role: "employer", icon: House },
  { path: "/employer/jobs", label: "Job Posts", role: "employer", icon: BriefcaseBusiness, badge: "36" },
  { path: "/employer/candidates", label: "Candidates", role: "employer", icon: UsersRound, badge: "1.2k" },
  { path: "/employer/pipeline", label: "Pipeline", role: "employer", icon: Layers3, badge: "82" },
  { path: "/employer/company", label: "Company & Billing", role: "employer", icon: ShieldCheck },
  { path: "/admin", label: "Platform Stats", role: "admin", icon: Gauge },
  { path: "/admin/moderation", label: "Moderation", role: "admin", icon: ShieldAlert, badge: "19" },
  { path: "/admin/users-finance", label: "Users & Finance", role: "admin", icon: WalletCards },
];

export const roleHome: Record<Role, string> = {
  candidate: "/candidate",
  employer: "/employer",
  admin: "/admin",
};

export function roleFromPath(path: string): Role {
  if (path.startsWith("/candidate")) return "candidate";
  if (path.startsWith("/admin")) return "admin";
  return "employer";
}

export function normalizePath(path: string) {
  if (path === "/" || path === "") return "/candidate";
  return path.replace(/\/$/, "") || "/candidate";
}

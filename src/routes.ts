import {
  Bot,
  BriefcaseBusiness,
  ClipboardCheck,
  Code2,
  FileSearch,
  FileText,
  Gauge,
  House,
  Layers3,
  LockKeyhole,
  MessageSquareText,
  ScrollText,
  Search,
  Settings,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  Tags,
  UserCog,
  UsersRound,
  WalletCards,
} from "lucide-react";
import type { Role, RouteItem } from "./types";

export const routes: RouteItem[] = [
  { path: "/login", label: "Đăng nhập", role: "access", icon: LockKeyhole },
  { path: "/register", label: "Đăng ký", role: "access", icon: LockKeyhole },
  { path: "/candidate", label: "Tìm việc", role: "candidate", icon: Search, badge: "326" },
  { path: "/candidate/profile", label: "Hồ sơ & CV", role: "candidate", icon: FileText, badge: "4" },
  { path: "/candidate/applications", label: "Ứng tuyển", role: "candidate", icon: ClipboardCheck, badge: "12" },
  { path: "/candidate/saved", label: "Việc đã lưu", role: "candidate", icon: Tags, badge: "28" },
  { path: "/candidate/companies", label: "Công ty", role: "candidate", icon: BriefcaseBusiness },
  { path: "/candidate/salary", label: "Cẩm nang lương", role: "candidate", icon: Code2 },
  { path: "/candidate/messages", label: "Tin nhắn", role: "candidate", icon: MessageSquareText, badge: "6" },
  { path: "/candidate/ai", label: "Phỏng vấn AI", role: "candidate", icon: Bot },
  { path: "/candidate/settings", label: "Cài đặt", role: "candidate", icon: Settings },
  { path: "/employer", label: "Báo cáo tuyển dụng", role: "employer", icon: House },
  { path: "/employer/jobs", label: "Tin tuyển dụng", role: "employer", icon: BriefcaseBusiness, badge: "36" },
  { path: "/employer/candidates", label: "Ứng viên", role: "employer", icon: UsersRound, badge: "1.2k" },
  { path: "/employer/talent-pool", label: "Talent Pool", role: "employer", icon: Tags, badge: "342" },
  { path: "/employer/pipeline", label: "Pipeline", role: "employer", icon: Layers3, badge: "82" },
  { path: "/employer/interviews", label: "Phỏng vấn", role: "employer", icon: ClipboardCheck, badge: "18" },
  { path: "/employer/team", label: "Đội ngũ & quyền", role: "employer", icon: UserCog },
  { path: "/employer/analytics", label: "Phân tích", role: "employer", icon: SlidersHorizontal },
  { path: "/employer/company", label: "Công ty & thanh toán", role: "employer", icon: ShieldCheck },
  { path: "/admin", label: "Thống kê nền tảng", role: "admin", icon: Gauge },
  { path: "/admin/moderation", label: "Kiểm duyệt", role: "admin", icon: ShieldAlert, badge: "19" },
  { path: "/admin/users-finance", label: "Người dùng & tài chính", role: "admin", icon: WalletCards },
  { path: "/admin/roles", label: "Vai trò & phân quyền", role: "admin", icon: UserCog },
  { path: "/admin/seo", label: "SEO Console", role: "admin", icon: FileSearch },
  { path: "/admin/sales", label: "Sales CRM", role: "admin", icon: BriefcaseBusiness },
  { path: "/admin/audit", label: "Audit log", role: "admin", icon: ScrollText },
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

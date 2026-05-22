import {
  Bell,
  ChevronDown,
  ChevronRight,
  Command,
  MessageCircle,
  MoreHorizontal,
  Search,
  Settings2,
  Sparkles,
  Zap,
} from "lucide-react";
import { upnextLogo } from "../brand";
import { roleFromPath, roleHome, routes } from "../routes";
import type { Role } from "../types";

type LayoutProps = {
  path: string;
  navigate: (path: string) => void;
  children: React.ReactNode;
};

export function AppShell({ path, navigate, children }: LayoutProps) {
  const activeRoute = routes.find((route) => route.path === path) ?? routes.find((route) => route.path === "/candidate");
  const activeRole = roleFromPath(path);

  return (
    <main className="app-shell">
      <Rail path={path} navigate={navigate} />
      <Sidebar path={path} activeRole={activeRole} navigate={navigate} />
      <section className="workspace">
        <TopBar title={activeRoute?.label ?? "UpNext"} activeRole={activeRole} navigate={navigate} />
        <section className="page-scroll">{children}</section>
      </section>
      <button className="chat-fab" aria-label="Open assistant">
        <MessageCircle size={22} fill="currentColor" />
      </button>
    </main>
  );
}

function Rail({ path, navigate }: { path: string; navigate: (path: string) => void }) {
  const shortcuts = ["/candidate", "/employer/candidates", "/employer/pipeline", "/admin/moderation", "/candidate/ai"];
  return (
    <aside className="rail">
      <button className="rail-logo" onClick={() => navigate("/login")} aria-label="Auth">
        <img src={upnextLogo.icon} alt="" />
      </button>
      <div className="rail-icons">
        {shortcuts.map((item) => {
          const route = routes.find((entry) => entry.path === item);
          if (!route) return null;
          const Icon = route.icon;
          return (
            <button className={path === item ? "rail-icon active" : "rail-icon"} key={item} onClick={() => navigate(item)} aria-label={route.label}>
              <Icon size={16} />
            </button>
          );
        })}
      </div>
      <div className="rail-bottom">
        <button className="rail-icon" aria-label="Settings">
          <Settings2 size={16} />
        </button>
        <button className="rail-icon active" aria-label="AI">
          <Sparkles size={16} />
        </button>
      </div>
    </aside>
  );
}

function Sidebar({
  path,
  activeRole,
  navigate,
}: {
  path: string;
  activeRole: Role;
  navigate: (path: string) => void;
}) {
  const visibleRoutes = routes.filter((route) => route.role === "access" || route.role === activeRole);

  return (
    <aside className="sidebar">
      <div className="brand">
        <img className="brand-logo" src={upnextLogo.wordmark} alt="UpNext" />
        <Command size={15} />
      </div>
      <div className="workspace-switcher">
        {(["candidate", "employer", "admin"] as Role[]).map((role) => (
          <button className={activeRole === role ? "active" : ""} key={role} onClick={() => navigate(roleHome[role])}>
            {role === "candidate" ? "Candidate" : role === "employer" ? "Recruiter" : "Admin"}
          </button>
        ))}
      </div>
      <nav className="side-nav">
        {["access", activeRole].map((group) => (
          <section key={group}>
            <p>{group === "access" ? "Access" : group}</p>
            {visibleRoutes.filter((route) => route.role === group).map((route) => {
              const Icon = route.icon;
              return (
                <button className={path === route.path ? "nav-item active" : "nav-item"} key={route.path} onClick={() => navigate(route.path)}>
                  <Icon size={17} />
                  <span>{route.label}</span>
                  {route.badge && <b>{route.badge}</b>}
                </button>
              );
            })}
          </section>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="plan-pill">
          <Zap size={14} fill="currentColor" />
          Pro hiring
        </div>
        <button className="ghost-icon">
          <MoreHorizontal size={18} />
        </button>
      </div>
    </aside>
  );
}

function TopBar({ title, activeRole, navigate }: { title: string; activeRole: Role; navigate: (path: string) => void }) {
  return (
    <header className="topbar">
      <div className="breadcrumb">
        <ChevronRight size={15} />
        <span>{title}</span>
      </div>
      <label className="global-search">
        <Search size={16} />
        <input placeholder="Search jobs, CVs, companies, skills..." />
      </label>
      <div className="top-actions">
        <button className="secondary-button top-role" onClick={() => navigate("/login")}>
          {activeRole === "candidate" ? "Candidate" : activeRole === "admin" ? "Admin" : "Recruiter"}
          <ChevronDown size={13} />
        </button>
        <button className="upgrade">
          <Zap size={14} fill="currentColor" />
          Upgrade
        </button>
        <button className="bell">
          <Bell size={16} />
          <i />
        </button>
        <button className="avatar">V</button>
        <ChevronDown size={14} className="muted" />
      </div>
    </header>
  );
}

import { useState } from "react";
import {
  Bell,
  Building2,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  FileText,
  MessageCircle,
  MoreHorizontal,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  X,
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
  const [pricingOpen, setPricingOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <main className={sidebarCollapsed ? "app-shell sidebar-collapsed" : "app-shell"}>
      <Sidebar
        path={path}
        activeRole={activeRole}
        collapsed={sidebarCollapsed}
        navigate={navigate}
        onToggle={() => setSidebarCollapsed((current) => !current)}
        onUpgrade={() => setPricingOpen(true)}
      />
      <section className="workspace">
        <TopBar title={activeRoute?.label ?? "UpNext"} activeRole={activeRole} navigate={navigate} onUpgrade={() => setPricingOpen(true)} />
        <section className="page-scroll">{children}</section>
      </section>
      <button className="chat-fab" aria-label="Mở trợ lý">
        <MessageCircle size={22} fill="currentColor" />
      </button>
      {pricingOpen && <PricingModal onClose={() => setPricingOpen(false)} />}
    </main>
  );
}

export function CandidateShell({ path, navigate, children }: LayoutProps) {
  const [pricingOpen, setPricingOpen] = useState(false);
  const navItems = [
    ["Việc làm", "/candidate"],
    ["Tạo CV", "/candidate/profile"],
    ["Công ty IT", "/candidate/companies"],
    ["Lương IT", "/candidate/salary"],
    ["Tin nhắn", "/candidate/messages"],
  ];

  return (
    <main className="candidate-site">
      <header className="candidate-site-header">
        <button className="candidate-site-logo" onClick={() => navigate("/candidate")} aria-label="Trang chủ UpNext">
          <img src={upnextLogo.icon} alt="" />
          <strong>UPNEXT</strong>
        </button>
        <nav className="candidate-site-nav" aria-label="Điều hướng ứng viên">
          {navItems.map(([label, href]) => (
            <button className={path === href ? "active" : ""} key={href} onClick={() => navigate(href)}>
              {label}
              {label === "Việc làm" && <ChevronDown size={14} />}
            </button>
          ))}
          <button onClick={() => setPricingOpen(true)}>UpNext <b>Pro</b></button>
        </nav>
        <div className="candidate-site-actions">
          <button className="candidate-outline" onClick={() => navigate("/register")}>Đăng ký</button>
          <button className="candidate-solid" onClick={() => navigate("/login")}>Đăng nhập</button>
          <button className="candidate-employer" onClick={() => navigate("/employer")}>Đăng tuyển & tìm hồ sơ</button>
        </div>
      </header>
      <section className="candidate-public-main">{children}</section>
      <div className="candidate-floating-stack" aria-label="Thao tác nhanh">
        <button><Bell size={17} /><span>0</span></button>
        <button><FileText size={17} /></button>
        <button><MessageCircle size={17} fill="currentColor" /></button>
      </div>
      {pricingOpen && <PricingModal onClose={() => setPricingOpen(false)} />}
    </main>
  );
}

function Sidebar({
  path,
  activeRole,
  collapsed,
  navigate,
  onToggle,
  onUpgrade,
}: {
  path: string;
  activeRole: Role;
  collapsed: boolean;
  navigate: (path: string) => void;
  onToggle: () => void;
  onUpgrade: () => void;
}) {
  const visibleRoutes = routes.filter((route) => route.role === "access" || route.role === activeRole);
  const switcherRoles = activeRole === "admin" ? (["admin"] as Role[]) : (["candidate", "employer"] as Role[]);

  return (
    <aside className={collapsed ? "sidebar collapsed" : "sidebar"} aria-label="Điều hướng chính">
      <div className="brand">
        <button className="brand-mark" onClick={() => navigate(roleHome[activeRole])} aria-label="Về trang chính">
          <img src={collapsed ? upnextLogo.icon : upnextLogo.wordmark} alt="UpNext" />
        </button>
        <button className="sidebar-toggle" onClick={onToggle} aria-label={collapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}>
          {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>
      <div className="workspace-switcher" aria-hidden={collapsed}>
        {switcherRoles.map((role) => (
          <button className={activeRole === role ? "active" : ""} key={role} onClick={() => navigate(roleHome[role])}>
            {role === "candidate" ? "Ứng viên" : role === "employer" ? "Nhà tuyển dụng" : "Admin"}
          </button>
        ))}
      </div>
      <nav className="side-nav">
        {["access", activeRole].map((group) => (
          <section key={group}>
            <p>{group === "access" ? "Truy cập" : group === "candidate" ? "Ứng viên" : group === "employer" ? "Nhà tuyển dụng" : "Admin"}</p>
            {visibleRoutes.filter((route) => route.role === group).map((route) => {
              const Icon = route.icon;
              return (
                <button className={path === route.path ? "nav-item active" : "nav-item"} key={route.path} onClick={() => navigate(route.path)} title={route.label}>
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
        <button className="plan-pill" onClick={onUpgrade}>
          <Zap size={14} fill="currentColor" />
          <span>Gói tuyển dụng Pro</span>
        </button>
        <button className="ghost-icon">
          <MoreHorizontal size={18} />
        </button>
      </div>
    </aside>
  );
}

function TopBar({ title, activeRole, navigate, onUpgrade }: { title: string; activeRole: Role; navigate: (path: string) => void; onUpgrade: () => void }) {
  return (
    <header className="topbar">
      <div className="breadcrumb">
        <ChevronRight size={15} />
        <span>{title}</span>
      </div>
      <label className="global-search">
        <Search size={16} />
        <input placeholder="Tìm việc, CV, công ty, kỹ năng..." />
      </label>
      <div className="top-actions">
        <button className="secondary-button top-role" onClick={() => navigate("/login")}>
          {activeRole === "candidate" ? "Ứng viên" : activeRole === "admin" ? "Admin" : "Nhà tuyển dụng"}
          <ChevronDown size={13} />
        </button>
        <button className="upgrade" onClick={onUpgrade}>
          <Zap size={14} fill="currentColor" />
          Nâng cấp
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

const pricingPlans = [
  {
    name: "Dùng thử",
    icon: ShieldCheck,
    description: "Dành cho đội mới thử quy trình tuyển dụng có AI.",
    price: "Miễn phí",
    cadence: "",
    current: true,
    features: ["CRM theo dõi ứng viên", "1 tin tuyển dụng đang chạy", "Parse CV", "Báo cáo tuyển dụng cơ bản"],
  },
  {
    name: "Khởi đầu",
    icon: Sparkles,
    description: "Cho startup cần đăng tin và lọc CV ổn định.",
    price: "$49",
    cadence: "/tháng",
    features: ["5 tin tuyển dụng đang chạy", "300 lượt parse CV", "3 thành viên", "10 bản ghi phỏng vấn AI"],
  },
  {
    name: "Tăng trưởng",
    icon: TrendingUp,
    badge: "Phổ biến",
    description: "Gói phù hợp nhất cho đội tuyển dụng IT đang scale.",
    price: "$149",
    cadence: "/tháng",
    featured: true,
    features: ["30 tin tuyển dụng đang chạy", "2.000 lượt AI match", "Tự động hóa Pipeline", "Đồng bộ lịch Google/Outlook"],
  },
  {
    name: "Doanh nghiệp",
    icon: Building2,
    description: "Cho công ty cần SLA, phân quyền và thanh toán riêng.",
    price: "Theo nhu cầu",
    cadence: "",
    features: ["Không giới hạn tin tuyển dụng", "Không giới hạn thành viên", "SSO và audit log", "SLA hỗ trợ riêng"],
  },
];

function PricingModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="pricing-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="pricing-modal" role="dialog" aria-modal="true" aria-label="Bảng giá nâng cấp" onMouseDown={(event) => event.stopPropagation()}>
        <button className="pricing-close" onClick={onClose} aria-label="Đóng bảng giá">
          <X size={18} />
        </button>
        <header className="pricing-header">
          <span><Zap size={14} fill="currentColor" /> Nâng cấp Plus</span>
          <h2>Gói rõ ràng, không phí ẩn</h2>
          <p>Chọn gói phù hợp cho ứng viên, nhà tuyển dụng hoặc đội vận hành tuyển dụng IT.</p>
          <div className="billing-toggle" aria-label="Chu kỳ thanh toán">
            <button className="active">Hàng tháng</button>
            <button>Hàng năm <b>Tiết kiệm 20%</b></button>
          </div>
        </header>
        <div className="pricing-grid">
          {pricingPlans.map((plan) => {
            const Icon = plan.icon;
            return (
              <article className={plan.featured ? "pricing-card featured" : "pricing-card"} key={plan.name}>
                <div className="pricing-card-head">
                  <div>
                    <h3>{plan.name} {plan.badge && <em>{plan.badge}</em>}</h3>
                    <p>{plan.description}</p>
                  </div>
                  <span className="plan-icon"><Icon size={21} /></span>
                </div>
                <div className="pricing-price">
                  <strong>{plan.price}<small>{plan.cadence}</small></strong>
                  <button className={plan.current ? "secondary-button" : plan.featured ? "primary-button" : "upgrade"}>
                    {plan.current ? "Gói hiện tại" : plan.name === "Doanh nghiệp" ? "Đặt lịch tư vấn" : "Nâng cấp"}
                  </button>
                </div>
                <div className="pricing-features">
                  <span>Bao gồm:</span>
                  {plan.features.map((feature) => (
                    <p key={feature}><CheckCircle2 size={14} fill="currentColor" /> {feature}</p>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
        <footer className="pricing-note">
          <CheckCircle2 size={15} />
          Không tính phí ẩn. Có thể đổi gói hoặc hủy gia hạn ở trang Công ty & thanh toán.
        </footer>
      </section>
    </div>
  );
}

import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  AlertTriangle,
  BadgeCheck,
  Banknote,
  Bell,
  Bot,
  BriefcaseBusiness,
  CalendarClock,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Clock3,
  Command,
  FileCheck2,
  FileText,
  Filter,
  Flag,
  Gauge,
  Github,
  Heart,
  House,
  Layers3,
  LockKeyhole,
  Mail,
  MessageCircle,
  Mic,
  MoreHorizontal,
  PenLine,
  Plus,
  RefreshCw,
  Search,
  Settings2,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  UserCheck,
  UsersRound,
  WandSparkles,
  Zap,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";
import "./styles.css";

type PageId =
  | "gateway"
  | "candidate-explore"
  | "candidate-profile"
  | "candidate-applications"
  | "candidate-ai"
  | "employer-dashboard"
  | "employer-jobs"
  | "employer-candidates"
  | "employer-pipeline"
  | "employer-company"
  | "admin-dashboard"
  | "admin-moderation"
  | "admin-users-finance";

type NavItem = {
  id: PageId;
  label: string;
  icon: React.ElementType;
  badge?: string;
};

const chartBars = [
  { label: "13 Jan", female: 36, male: 78 },
  { label: "Feb", female: 75, male: 95 },
  { label: "Mar", female: 21, male: 41 },
  { label: "Apr", female: 37, male: 79 },
  { label: "May", female: 72, male: 98 },
  { label: "Jun", female: 35, male: 65 },
  { label: "Jul", female: 20, male: 46 },
  { label: "Aug", female: 70, male: 92 },
  { label: "Sep", female: 20, male: 54 },
  { label: "Oct", female: 35, male: 65 },
  { label: "Nov", female: 20, male: 47 },
  { label: "31 Dec", female: 28, male: 50 },
];

const applicantTrend = [
  { day: "Mon", applied: 42, shortlist: 20, interviews: 9 },
  { day: "Tue", applied: 55, shortlist: 31, interviews: 12 },
  { day: "Wed", applied: 49, shortlist: 28, interviews: 11 },
  { day: "Thu", applied: 68, shortlist: 39, interviews: 16 },
  { day: "Fri", applied: 63, shortlist: 34, interviews: 15 },
  { day: "Sat", applied: 76, shortlist: 45, interviews: 18 },
  { day: "Sun", applied: 73, shortlist: 43, interviews: 17 },
];

const matchDistribution = [
  { name: "90-100", value: 24, color: "#2faf72" },
  { name: "75-89", value: 46, color: "#7a2cf3" },
  { name: "60-74", value: 21, color: "#f6a311" },
  { name: "<60", value: 9, color: "#ef4444" },
];

const jobs = [
  {
    title: "Senior Frontend Engineer",
    company: "Nexa Fintech",
    place: "Ho Chi Minh",
    salary: "$2,500 - $3,800",
    match: 96,
    trust: 92,
    tags: ["React", "TypeScript", "Fintech"],
    status: "Apply fast",
  },
  {
    title: "Backend Node.js Platform",
    company: "CloudBridge Labs",
    place: "Hybrid - Ha Noi",
    salary: "$2,000 - $3,200",
    match: 91,
    trust: 86,
    tags: ["Node.js", "AWS", "PostgreSQL"],
    status: "Saved",
  },
  {
    title: "DevOps Engineer",
    company: "Orbit Commerce",
    place: "Da Nang",
    salary: "$1,800 - $2,900",
    match: 84,
    trust: 78,
    tags: ["K8s", "Terraform", "CI/CD"],
    status: "Follow company",
  },
];

const candidates = [
  {
    name: "Nguyen Minh Khoa",
    role: "Senior Frontend Engineer",
    job: "React Lead - Fintech",
    match: 96,
    exp: "6 years",
    salary: "$3.2k",
    stage: "Interview 2",
    skills: ["React", "TypeScript", "Next.js"],
    reason: "Strong React architecture, fintech domain, salary fits range.",
  },
  {
    name: "Tran Bao Anh",
    role: "Backend Engineer",
    job: "Node.js Platform",
    match: 92,
    exp: "5 years",
    salary: "$2.8k",
    stage: "Shortlisted",
    skills: ["Node.js", "AWS", "PostgreSQL"],
    reason: "Good cloud experience and high API ownership score.",
  },
  {
    name: "Pham Quoc Viet",
    role: "DevOps Engineer",
    job: "Cloud Infrastructure",
    match: 89,
    exp: "4 years",
    salary: "$2.4k",
    stage: "Screening",
    skills: ["K8s", "Terraform", "CI/CD"],
    reason: "Excellent automation skills, needs more security exposure.",
  },
  {
    name: "Le Thu Ha",
    role: "QA Automation",
    job: "SDET - E-commerce",
    match: 84,
    exp: "3 years",
    salary: "$1.9k",
    stage: "Applied",
    skills: ["Playwright", "API Test", "Java"],
    reason: "Automation stack aligns, moderate domain match.",
  },
];

type Candidate = (typeof candidates)[number];

type PipelineItem = {
  id: string;
  title: string;
  person: string;
  sla: string;
  tag: string;
  match: number;
};

type PipelineColumn = {
  id: string;
  title: string;
  color: string;
  bg: string;
  items: PipelineItem[];
};

const pipelineSeed: PipelineColumn[] = [
  {
    id: "applied",
    title: "Applied",
    color: "#3196ec",
    bg: "#eaf4ff",
    items: [
      { id: "p-1", title: "React Lead - 31 CV", person: "Nguyen Minh Khoa", sla: "SLA 1 day", tag: "Need review", match: 96 },
      { id: "p-2", title: "DevOps - 22 CV", person: "Pham Quoc Viet", sla: "SLA 2 days", tag: "High match", match: 89 },
      { id: "p-3", title: "SDET - 18 CV", person: "Le Thu Ha", sla: "SLA 3 days", tag: "Need review", match: 84 },
    ],
  },
  {
    id: "shortlisted",
    title: "Shortlisted",
    color: "#7a2cf3",
    bg: "#f2ebff",
    items: [
      { id: "p-4", title: "Bao Anh - Node.js", person: "Tran Bao Anh", sla: "SLA 1 day", tag: "High match", match: 92 },
      { id: "p-5", title: "Khoa - React Lead", person: "Nguyen Minh Khoa", sla: "SLA today", tag: "Schedule", match: 96 },
      { id: "p-6", title: "Viet - DevOps", person: "Pham Quoc Viet", sla: "SLA 3 days", tag: "Need review", match: 89 },
    ],
  },
  {
    id: "interview",
    title: "Interview",
    color: "#f6a311",
    bg: "#fff4de",
    items: [
      { id: "p-7", title: "Khoa - Fri 09:00", person: "Nguyen Minh Khoa", sla: "Loop 1/2", tag: "Confirmed", match: 96 },
      { id: "p-8", title: "Bao Anh - Tue 14:00", person: "Tran Bao Anh", sla: "Loop 1/2", tag: "Waiting", match: 92 },
      { id: "p-9", title: "Viet - Thu 10:30", person: "Pham Quoc Viet", sla: "Loop 2/2", tag: "Final loop", match: 89 },
    ],
  },
  {
    id: "offer",
    title: "Offer",
    color: "#2faf72",
    bg: "#e9f8f0",
    items: [
      { id: "p-10", title: "Frontend Lead", person: "Nguyen Minh Khoa", sla: "Offer sent", tag: "Negotiating", match: 96 },
      { id: "p-11", title: "Cloud Engineer", person: "Pham Quoc Viet", sla: "Offer review", tag: "Approved", match: 89 },
      { id: "p-12", title: "QA Automation", person: "Le Thu Ha", sla: "Waiting", tag: "Drafting", match: 84 },
    ],
  },
];

const posts = [
  { title: "React Lead - Fintech", status: "Active", expiry: "12 days", views: "8,920", cvs: 128, trust: "Clean" },
  { title: "Node.js Platform Engineer", status: "Boosting", expiry: "6 days", views: "6,140", cvs: 84, trust: "Clean" },
  { title: "Data Engineer", status: "Expired", expiry: "0 days", views: "2,380", cvs: 31, trust: "Renew" },
  { title: "Junior Tester", status: "Locked", expiry: "18 days", views: "1,190", cvs: 14, trust: "Policy issue" },
];

const applicationSteps = ["Submitted", "Viewed", "Shortlisted", "Interview", "Offer"];

const adminAlerts = [
  "Tin tuyển dụng chứa từ ngữ lách luật",
  "Nhà tuyển dụng có trust score dưới 50",
  "AI matching latency vượt ngưỡng 1.8s",
];

const navGroups: Array<{ title: string; items: NavItem[] }> = [
  {
    title: "Access",
    items: [{ id: "gateway", label: "Role & Sign in", icon: LockKeyhole }],
  },
  {
    title: "Candidate",
    items: [
      { id: "candidate-explore", label: "Job Discovery", icon: Search, badge: "326" },
      { id: "candidate-profile", label: "Profile & CV", icon: FileText, badge: "4" },
      { id: "candidate-applications", label: "Applications", icon: ClipboardCheck, badge: "12" },
      { id: "candidate-ai", label: "AI Interview", icon: Bot },
    ],
  },
  {
    title: "Employer",
    items: [
      { id: "employer-dashboard", label: "Recruitment Report", icon: House },
      { id: "employer-jobs", label: "Job Posts", icon: BriefcaseBusiness, badge: "36" },
      { id: "employer-candidates", label: "Candidates", icon: UsersRound, badge: "1.2k" },
      { id: "employer-pipeline", label: "Pipeline", icon: Layers3, badge: "82" },
      { id: "employer-company", label: "Company & Billing", icon: ShieldCheck },
    ],
  },
  {
    title: "Admin",
    items: [
      { id: "admin-dashboard", label: "Platform Stats", icon: Gauge },
      { id: "admin-moderation", label: "Moderation", icon: ShieldAlert, badge: "19" },
      { id: "admin-users-finance", label: "Users & Finance", icon: Banknote },
    ],
  },
];

const pageTitles: Record<PageId, string> = {
  gateway: "Role Access",
  "candidate-explore": "Candidate Workspace",
  "candidate-profile": "Profile & CV Manager",
  "candidate-applications": "Application Tracker",
  "candidate-ai": "AI Career Coach",
  "employer-dashboard": "Recruitment Report",
  "employer-jobs": "Job Post Manager",
  "employer-candidates": "Candidate Ranking",
  "employer-pipeline": "Hiring Pipeline",
  "employer-company": "Company Trust & Billing",
  "admin-dashboard": "Admin Command Center",
  "admin-moderation": "Policy Moderation",
  "admin-users-finance": "Users, Plans & Invoices",
};

const pageIds = Object.keys(pageTitles) as PageId[];

type WorkspaceRole = "candidate" | "employer" | "admin";

const roleLanding: Record<WorkspaceRole, PageId> = {
  candidate: "candidate-explore",
  employer: "employer-dashboard",
  admin: "admin-dashboard",
};

function getWorkspaceRole(page: PageId): WorkspaceRole {
  if (page.startsWith("candidate")) return "candidate";
  if (page.startsWith("admin")) return "admin";
  return "employer";
}

function App() {
  const [activePage, setActivePage] = useState<PageId>(() => {
    const requestedPage = new URLSearchParams(window.location.search).get("page") as PageId | null;
    return requestedPage && pageIds.includes(requestedPage) ? requestedPage : "employer-dashboard";
  });
  const activeRole = getWorkspaceRole(activePage);
  const activeItem = useMemo(
    () => navGroups.flatMap((group) => group.items).find((item) => item.id === activePage),
    [activePage],
  );

  return (
    <main className="app-shell">
      <Rail activePage={activePage} setActivePage={setActivePage} />
      <Sidebar activePage={activePage} activeRole={activeRole} setActivePage={setActivePage} />
      <section className="workspace">
        <TopBar title={activeItem?.label ?? pageTitles[activePage]} activeRole={activeRole} setActivePage={setActivePage} />
        <section className="page-scroll">
          <PageRenderer activePage={activePage} setActivePage={setActivePage} />
        </section>
      </section>
      <button className="chat-fab" aria-label="Open assistant">
        <MessageCircle size={22} fill="currentColor" />
      </button>
    </main>
  );
}

function Rail({ activePage, setActivePage }: { activePage: PageId; setActivePage: (page: PageId) => void }) {
  const shortcuts = [
    ["employer-dashboard", House],
    ["candidate-explore", Search],
    ["employer-candidates", UsersRound],
    ["employer-pipeline", Layers3],
    ["admin-moderation", ShieldAlert],
    ["candidate-ai", Bot],
  ] as const;

  return (
    <aside className="rail">
      <button className="rail-logo" onClick={() => setActivePage("gateway")} aria-label="Gateway">
        <ShieldCheck size={16} />
      </button>
      <div className="rail-icons">
        {shortcuts.map(([page, Icon]) => (
          <button
            className={activePage === page ? "rail-icon active" : "rail-icon"}
            key={page}
            onClick={() => setActivePage(page)}
            aria-label={page}
          >
            <Icon size={16} />
          </button>
        ))}
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
  activePage,
  activeRole,
  setActivePage,
}: {
  activePage: PageId;
  activeRole: WorkspaceRole;
  setActivePage: (page: PageId) => void;
}) {
  const visibleGroups = navGroups.filter((group) => group.title === "Access" || group.title.toLowerCase() === activeRole);

  return (
    <aside className="sidebar">
      <div className="brand">
        <div>
          <strong>UpNext</strong>
          <span>IT Recruitment Platform</span>
        </div>
        <Command size={15} />
      </div>
      <div className="workspace-switcher">
        {([
          ["candidate", "Candidate"],
          ["employer", "Recruiter"],
          ["admin", "Admin"],
        ] as const).map(([role, label]) => (
          <button
            className={activeRole === role ? "active" : ""}
            key={role}
            onClick={() => setActivePage(roleLanding[role])}
          >
            {label}
          </button>
        ))}
      </div>
      <nav className="side-nav">
        {visibleGroups.map((group) => (
          <section key={group.title}>
            <p>{group.title}</p>
            {group.items.map((item) => (
              <button
                className={activePage === item.id ? "nav-item active" : "nav-item"}
                key={item.id}
                onClick={() => setActivePage(item.id)}
              >
                <item.icon size={17} />
                <span>{item.label}</span>
                {item.badge && <b>{item.badge}</b>}
              </button>
            ))}
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

function TopBar({
  title,
  activeRole,
  setActivePage,
}: {
  title: string;
  activeRole: WorkspaceRole;
  setActivePage: (page: PageId) => void;
}) {
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
        <button className="secondary-button top-role" onClick={() => setActivePage("gateway")}>
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

function PageRenderer({
  activePage,
  setActivePage,
}: {
  activePage: PageId;
  setActivePage: (page: PageId) => void;
}) {
  switch (activePage) {
    case "gateway":
      return <GatewayPage setActivePage={setActivePage} />;
    case "candidate-explore":
      return <CandidateExplorePage />;
    case "candidate-profile":
      return <CandidateProfilePage />;
    case "candidate-applications":
      return <CandidateApplicationsPage />;
    case "candidate-ai":
      return <CandidateAiPage />;
    case "employer-jobs":
      return <EmployerJobsPage />;
    case "employer-candidates":
      return <EmployerCandidatesPage />;
    case "employer-pipeline":
      return <EmployerPipelinePage />;
    case "employer-company":
      return <EmployerCompanyPage />;
    case "admin-dashboard":
      return <AdminDashboardPage />;
    case "admin-moderation":
      return <AdminModerationPage />;
    case "admin-users-finance":
      return <AdminUsersFinancePage />;
    default:
      return <EmployerDashboardPage />;
  }
}

function GatewayPage({ setActivePage }: { setActivePage: (page: PageId) => void }) {
  const [role, setRole] = useState<"candidate" | "employer">(
    () => (localStorage.getItem("upnext-role") as "candidate" | "employer" | null) ?? "candidate",
  );
  const [mode, setMode] = useState<"login" | "register">("login");
  const [authStep, setAuthStep] = useState<"email" | "verify">("email");

  useEffect(() => {
    localStorage.setItem("upnext-role", role);
  }, [role]);

  return (
    <>
      <PageHeader
        title="Choose your UpNext workspace"
        eyebrow="Role-aware entry"
        description="Hệ thống ghi nhớ lựa chọn cuối cùng để lần truy cập sau gợi ý đúng form và đúng trải nghiệm."
        actions={
          <>
            <button className="secondary-button" onClick={() => setAuthStep("verify")}>
              <Mail size={15} />
              Send magic link
            </button>
            <button className="primary-button" onClick={() => setActivePage(role === "candidate" ? "candidate-explore" : "employer-dashboard")}>
              Continue
              <ChevronRight size={15} />
            </button>
          </>
        }
      />
      <div className="gateway-grid">
        <section className="panel role-card">
          <Segmented
            value={role}
            options={[
              ["candidate", "Tôi là ứng viên"],
              ["employer", "Tôi là nhà tuyển dụng"],
            ]}
            onChange={(value) => setRole(value as "candidate" | "employer")}
          />
          <div className="role-preview">
            <div className="role-icon">{role === "candidate" ? <UserCheck size={26} /> : <BriefcaseBusiness size={26} />}</div>
            <h2>{role === "candidate" ? "Ứng viên tìm việc CNTT" : "Doanh nghiệp tuyển nhân sự IT"}</h2>
            <p>
              {role === "candidate"
                ? "Tìm việc theo match score, quản lý CV mặc định, theo dõi hồ sơ và luyện phỏng vấn AI."
                : "Đăng tin, ranking ứng viên, đặt lịch phỏng vấn, quản lý trust score và tài nguyên gói."}
            </p>
          </div>
          <div className="trust-list compact">
            <p>
              <CheckCircle2 size={14} />
              Google sign in supported
            </p>
            <p>
              <CheckCircle2 size={14} />
              Email verification and OTP recovery
            </p>
            <p>
              <CheckCircle2 size={14} />
              Role is saved in localStorage
            </p>
          </div>
        </section>
        <section className="panel auth-panel pro-auth">
          <PanelHeader icon={<LockKeyhole size={17} />} title={mode === "login" ? "Passwordless sign in" : role === "candidate" ? "Candidate registration" : "Employer verification"} action="Secure auth" />
          <Segmented
            value={mode}
            options={[
              ["login", "Đăng nhập"],
              ["register", "Đăng ký"],
            ]}
            onChange={(value) => {
              setMode(value as "login" | "register");
              setAuthStep("email");
            }}
          />
          <div className="oauth-grid">
            <button className="oauth-button">
              <span className="google-mark">G</span>
              Continue with Google
            </button>
            <button className="oauth-button">
              <Github size={16} />
              Continue with GitHub
            </button>
          </div>
          <div className="divider"><span>or use email</span></div>
          {mode === "login" ? (
            <div className="login-flow">
              <Field label="Email" value={role === "candidate" ? "khoa.nguyen@email.com" : "talent@nexa.vn"} />
              <div className="login-methods">
                <button className={authStep === "email" ? "method-card active" : "method-card"} onClick={() => setAuthStep("email")}>
                  <Mail size={16} />
                  <strong>Magic link</strong>
                  <span>Gửi link đăng nhập vào email</span>
                </button>
                <button className={authStep === "verify" ? "method-card active" : "method-card"} onClick={() => setAuthStep("verify")}>
                  <Command size={16} />
                  <strong>OTP code</strong>
                  <span>Xác thực 6 chữ số</span>
                </button>
              </div>
              {authStep === "verify" && (
                <div className="otp-row">
                  {["7", "4", "2", "9", "1", "6"].map((digit, index) => (
                    <input key={index} value={digit} readOnly aria-label={`OTP ${index + 1}`} />
                  ))}
                </div>
              )}
              <button className="primary-button auth-submit" onClick={() => setActivePage(role === "candidate" ? "candidate-explore" : "employer-dashboard")}>
                {authStep === "verify" ? "Verify OTP" : "Send magic link"}
              </button>
            </div>
          ) : (
            <div className="form-grid auth-register-grid">
              {role === "candidate" ? (
              <>
                <Field label="Họ tên" value="Nguyen Minh Khoa" />
                <Field label="Email" value="khoa.nguyen@email.com" />
                <Field label="Vị trí ứng tuyển" value="Senior Frontend Engineer" />
                <Field label="Khu vực" value="Ho Chi Minh, Hybrid" />
                <Field label="CV mặc định" value="Frontend Lead CV.pdf" />
                <Field label="Trạng thái" value="Đang tìm việc" />
              </>
            ) : (
              <>
                <Field label="Tên công ty" value="Nexa Fintech JSC" />
                <Field label="Email công ty" value="talent@nexa.vn" />
                <Field label="Mã số thuế" value="0318 884 209" />
                <Field label="Người đại diện" value="Tran Hoang Lan" />
                <Field label="Số điện thoại" value="+84 902 118 772" />
                <Field label="Giấy phép kinh doanh" value="verified-license.pdf" />
              </>
            )}
            </div>
          )}
          <div className="auth-warning">
            <AlertTriangle size={16} />
            <span>
              {role === "candidate"
                ? "Đăng nhập không dùng mật khẩu: nhập email, xác thực bằng OTP hoặc magic link. Nếu email đã tồn tại khi đăng ký, hệ thống báo tài khoản đã tồn tại."
                : "Email doanh nghiệp và mã số thuế chỉ được đăng ký một tài khoản. Nhà tuyển dụng phải kích hoạt qua email trước khi đăng tin."}
            </span>
          </div>
        </section>
      </div>
    </>
  );
}

function CandidateExplorePage() {
  const [selectedJob, setSelectedJob] = useState<(typeof jobs)[number] | null>(null);

  return (
    <>
      <PageHeader
        eyebrow="Candidate"
        title="Find IT jobs that fit your CV, goals and timing"
        description="Workspace cho ứng viên: tìm kiếm ngữ nghĩa, gợi ý công việc phù hợp, công ty uy tín, ngành đang tăng trưởng, CV match score và quick apply."
        actions={
          <>
            <button className="secondary-button">
              <Filter size={15} />
              Bộ lọc nâng cao
            </button>
            <button className="primary-button">
              <Sparkles size={15} />
              Tìm kiếm AI
            </button>
          </>
        }
      />
      <section className="candidate-hero panel">
        <div>
          <span className="eyebrow">Default CV: Frontend Lead CV</span>
          <h2>96% match với Senior Frontend Engineer tại Nexa Fintech</h2>
          <p>AI ưu tiên job có kỹ năng, kinh nghiệm, salary range và địa điểm phù hợp. Ứng viên có thể apply nhanh bằng CV mặc định.</p>
          <div className="candidate-hero-actions">
            <button className="primary-button" onClick={() => setSelectedJob(jobs[0])}>
              <Zap size={15} />
              Quick apply
            </button>
            <button className="secondary-button">
              <WandSparkles size={15} />
              Viết thư ứng tuyển AI
            </button>
          </div>
        </div>
        <div className="candidate-hero-score">
          <ScoreRing label="Match" value={96} />
          <Metric title="Ứng tuyển đang theo dõi" value="12" detail="3 lịch phỏng vấn cần phản hồi" />
        </div>
      </section>
      <div className="candidate-home-grid">
        <section className="panel search-panel candidate-main-section">
          <PanelHeader icon={<Search size={17} />} title="Recommended jobs for you" action="View all" />
          <div className="search-strip">
            <Field label="Keyword" value="React, Node.js, DevOps" />
            <Field label="Location" value="Ho Chi Minh / Remote" />
            <Field label="Salary" value="$1,500 - $4,000" />
            <Field label="Experience" value="3+ years" />
          </div>
          <div className="job-list">
            {jobs.map((job, index) => (
              <article className="job-card" key={job.title}>
                <div className="company-dot">{job.company.charAt(0)}</div>
                <div className="job-main">
                  <div className="job-title-row">
                    <div>
                      <h3>{job.title}</h3>
                      <span>{job.company} • {job.place}</span>
                    </div>
                    <button className={index === 0 ? "primary-button small" : "secondary-button small"}>{job.status}</button>
                  </div>
                  <div className="skill-list">
                    {job.tags.map((tag) => (
                      <i key={tag}>{tag}</i>
                    ))}
                  </div>
                </div>
                <ScoreRing label="Match" value={job.match} />
                <div className="job-meta">
                  <strong>{job.salary}</strong>
                  <span>Trust score {job.trust}</span>
                  <button className="secondary-button small" onClick={() => setSelectedJob(job)}>Details</button>
                </div>
              </article>
            ))}
          </div>
        </section>
        <aside className="right-stack candidate-side">
          <InsightCard title="Market trend" value="Frontend +18%" icon={TrendingUp} color="#2f99f3" note="React, cloud and AI product roles are rising in HCMC." />
          <section className="panel right-panel">
            <PanelHeader icon={<Star size={17} />} title="Top Companies" action="View all" />
            {["Nexa Fintech", "CloudBridge Labs", "Orbit Commerce"].map((company, index) => (
              <div className="mini-row" key={company}>
                <Avatar name={company} index={index} />
                <div>
                  <strong>{company}</strong>
                  <span>{92 - index * 6} trust • {124 - index * 22} followers</span>
                </div>
                <button className="icon-button">
                  <Heart size={15} />
                </button>
              </div>
            ))}
          </section>
          <section className="panel right-panel">
            <PanelHeader icon={<WandSparkles size={17} />} title="AI suggestions" action="Tune" />
            <div className="ai-action">
              <Sparkles size={16} />
              <div>
                <strong>3 jobs moved to the top</strong>
                <span>Based on your default CV: React Lead 96, Node Platform 91, DevOps 84.</span>
              </div>
            </div>
          </section>
        </aside>
      </div>
      <div className="candidate-section-grid">
        <section className="panel">
          <PanelHeader icon={<Target size={17} />} title="Explore by career goal" action="Customize" />
          <div className="career-grid">
            {[
              ["Frontend Specialist", "128 jobs", "React, Vue, UI platform"],
              ["Backend Platform", "96 jobs", "Node.js, Go, cloud"],
              ["DevOps & SRE", "64 jobs", "Kubernetes, Terraform"],
              ["QA Automation", "52 jobs", "Playwright, API, Java"],
            ].map(([title, count, detail]) => (
              <article className="career-card" key={title}>
                <strong>{title}</strong>
                <span>{count}</span>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="panel">
          <PanelHeader icon={<ClipboardCheck size={17} />} title="Application health" action="Open tracker" />
          <div className="health-grid">
            <Metric title="Đã nộp" value="12" detail="5 đã xem, 3 shortlist" />
            <Metric title="Phỏng vấn" value="3" detail="1 lịch cần xác nhận" />
            <Metric title="Từ chối sau SLA" value="2" detail="Quá 7 ngày không xử lý" />
          </div>
        </section>
      </div>
      {selectedJob && (
        <Modal title={selectedJob.title} onClose={() => setSelectedJob(null)}>
          <div className="job-detail-modal">
            <div className="modal-job-head">
              <div className="company-dot">{selectedJob.company.charAt(0)}</div>
              <div>
                <h3>{selectedJob.company}</h3>
                <span>{selectedJob.place} • {selectedJob.salary}</span>
              </div>
              <ScoreRing label="Match" value={selectedJob.match} />
            </div>
            <div className="match-reasons">
              <div><strong>Đáp ứng</strong><p>React, TypeScript, frontend architecture, dashboard performance.</p></div>
              <div><strong>Còn thiếu</strong><p>Chưa có nhiều bằng chứng về banking compliance.</p></div>
              <div><strong>Điểm cộng</strong><p>Fintech B2B SaaS, design system ownership, salary phù hợp.</p></div>
            </div>
            <div className="modal-actions">
              <button className="secondary-button"><Heart size={15} /> Save job</button>
              <button className="primary-button"><Zap size={15} /> Apply with default CV</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

function CandidateProfilePage() {
  return (
    <>
      <PageHeader
        eyebrow="Candidate"
        title="Profile, CV storage and default resume"
        description="Ứng viên quản lý hồ sơ, nhiều CV PDF/DOCX hoặc CV tạo trong hệ thống, trạng thái đang tìm/ngừng tìm việc."
        actions={
          <>
            <button className="secondary-button">
              <RefreshCw size={15} />
              Stop looking
            </button>
            <button className="primary-button">
              <Plus size={15} />
              Create CV
            </button>
          </>
        }
      />
      <div className="profile-grid">
        <section className="panel profile-card">
          <div className="profile-top">
            <Avatar name="Nguyen Minh Khoa" index={1} large />
            <div>
              <h2>Nguyen Minh Khoa</h2>
              <span>Senior Frontend Engineer • 6 years • Ho Chi Minh</span>
            </div>
            <span className="status-pill green">Open to work</span>
          </div>
          <div className="profile-stats">
            <Metric title="Default CV score" value="92" detail="Ready for quick apply" />
            <Metric title="Profile strength" value="88%" detail="Add degree to reach 95%" />
            <Metric title="AI interview" value="4/5" detail="Last practice score" />
          </div>
          <div className="field-table">
            {["Bằng cấp: Bachelor of Software Engineering", "Kỹ năng: React, TypeScript, Next.js, Design System", "Kinh nghiệm: Fintech dashboard, B2B SaaS, realtime products", "Giới tính: Nam • Ảnh đại diện: Đã cập nhật"].map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </section>
        <section className="panel cv-panel">
          <PanelHeader icon={<FileText size={17} />} title="CV Library" action="Upload PDF/DOCX" />
          {["Frontend Lead - default", "Fullstack Product", "English CV", "Fintech CV"].map((cv, index) => (
            <div className="cv-row" key={cv}>
              <FileCheck2 size={18} />
              <div>
                <strong>{cv}</strong>
                <span>{index === 0 ? "Default for quick apply and match score" : "Saved version"}</span>
              </div>
              <button className={index === 0 ? "status-pill green" : "status-pill"}>{index === 0 ? "Default" : "Set default"}</button>
            </div>
          ))}
        </section>
        <section className="panel ai-letter">
          <PanelHeader icon={<WandSparkles size={17} />} title="AI cover letter" action="Generate" />
          <div className="letter-box">
            <p>Dear Nexa Fintech hiring team,</p>
            <p>I am applying for the Senior Frontend Engineer role with 6 years building React systems, design tokens and performance-focused dashboards...</p>
          </div>
          <div className="match-breakdown">
            <Metric title="Skill" value="50%" detail="React/TS strong" />
            <Metric title="Experience" value="30%" detail="Domain fits" />
            <Metric title="Other" value="20%" detail="Salary/location ok" />
          </div>
        </section>
      </div>
    </>
  );
}

function CandidateApplicationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Candidate"
        title="Track submitted CVs and interview schedules"
        description="Ứng viên xem timeline trạng thái, xác nhận/từ chối/hẹn lại lịch. Quá 7 ngày không xử lý sẽ chuyển sang từ chối."
        actions={<button className="primary-button"><CalendarDays size={15} /> Sync Calendar</button>}
      />
      <div className="applications-grid">
        <section className="panel application-list">
          <PanelHeader icon={<ClipboardCheck size={17} />} title="Submitted applications" action="Filter" />
          {jobs.map((job, jobIndex) => (
            <article className="application-card" key={job.title}>
              <div>
                <h3>{job.title}</h3>
                <span>{job.company} • Last update {jobIndex + 2} days ago</span>
              </div>
              <div className="timeline">
                {applicationSteps.map((step, index) => (
                  <span className={index <= 2 + jobIndex % 2 ? "done" : ""} key={step}>
                    <i />
                    {step}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </section>
        <aside className="right-stack">
          <section className="panel right-panel">
            <PanelHeader icon={<CalendarClock size={17} />} title="Interview request" action="Reschedule" />
            <div className="interview-card primary">
              <div className="date-chip">
                <span>Fri</span>
                <b>24</b>
              </div>
              <div>
                <strong>Technical Interview</strong>
                <span>Nexa Fintech • 09:00 - 10:00</span>
                <p>Loop 1/2. Candidate can propose one new time.</p>
              </div>
            </div>
            <div className="button-row">
              <button className="secondary-button small">Decline</button>
              <button className="primary-button small">Confirm</button>
            </div>
          </section>
          <section className="panel right-panel">
            <PanelHeader icon={<Heart size={17} />} title="Saved jobs" action="Open" />
            {["Node.js Platform Engineer", "DevOps Engineer", "Data Engineer"].map((item, index) => (
              <div className="mini-row" key={item}>
                <Avatar name={item} index={index} />
                <div>
                  <strong>{item}</strong>
                  <span>Expires in {6 + index * 3} days</span>
                </div>
              </div>
            ))}
          </section>
        </aside>
      </div>
    </>
  );
}

function CandidateAiPage() {
  return (
    <>
      <PageHeader
        eyebrow="Candidate AI"
        title="Interview simulation, chatbot and cover letter"
        description="AI phỏng vấn bằng giọng nói, theo dõi tiến độ 3/5, chấm điểm theo tốc độ, chuyên môn và xử lý tình huống."
        actions={<button className="primary-button"><Mic size={15} /> Start voice session</button>}
      />
      <div className="ai-grid">
        <section className="panel interview-sim">
          <PanelHeader icon={<Bot size={17} />} title="AI interview simulation" action="React Lead" />
          <div className="question-card">
            <span>Question 3/5</span>
            <h2>How would you migrate a legacy React dashboard to a typed design system without blocking feature delivery?</h2>
            <div className="progress-line"><span style={{ width: "60%" }} /></div>
          </div>
          <div className="score-grid">
            <Metric title="Speed" value="82" detail="Clear pace" />
            <Metric title="Expertise" value="91" detail="Strong examples" />
            <Metric title="Situation" value="78" detail="Add tradeoffs" />
          </div>
        </section>
        <section className="panel coach-panel">
          <PanelHeader icon={<MessageCircle size={17} />} title="Chatbot support" action="Escalate" />
          <div className="chat-window">
            <p className="bot">Bạn muốn tối ưu CV cho vị trí nào?</p>
            <p className="user">Senior Frontend Engineer tại Nexa Fintech.</p>
            <p className="bot">Nên nhấn mạnh React architecture, performance metrics và ownership với design system.</p>
          </div>
          <Field label="Ask UpNext AI" value="Cách viết thư ứng tuyển cho Fintech?" />
        </section>
        <section className="panel coach-panel">
          <PanelHeader icon={<Target size={17} />} title="Key points to improve" action="Apply to CV" />
          {["Quantify dashboard performance impact", "Add experience with PCI/finance data", "Prepare one system design story"].map((item) => (
            <div className="check-row" key={item}>
              <CheckCircle2 size={15} />
              <span>{item}</span>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

function EmployerDashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Employer"
        title="Hello, Track Your Insights"
        description="Recruitment command center for IT hiring, AI matching, interviews, offers and employer reputation."
        actions={
          <>
            <button className="date-button">1 Jan, 2026</button>
            <button className="date-button">31 Dec, 2026 <ChevronDown size={14} /></button>
            <button className="secondary-button">Export</button>
          </>
        }
      />
      <section className="panel hero-chart">
        <PanelHeader icon={<UsersRound size={17} />} title="Staff & Candidate Flow" action="Details" />
        <div className="hero-kpi">
          <strong>82</strong>
          <Trend value="12%" />
          <div className="chart-legend">
            <span><i className="orange" /> Female 3902</span>
            <span><i className="blue" /> Male 982</span>
          </div>
        </div>
        <div className="bar-chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartBars} barCategoryGap={26}>
              <CartesianGrid vertical={false} stroke="#ececf2" />
              <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#808497", fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#808497", fontSize: 11 }} />
              <Tooltip content={<ChartTooltip />} cursor={false} />
              <Bar dataKey="female" fill="#f6a311" radius={[8, 8, 0, 0]} maxBarSize={14} isAnimationActive={false} />
              <Bar dataKey="male" fill="#3196ec" radius={[8, 8, 0, 0]} maxBarSize={14} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="hero-summary">
          <Metric title="Active Staff" value="41" detail="31 vs previous period" />
          <Metric title="Avg. Tenure" value="2.4 years" detail="Attrition rate: 7.8%" />
          <Metric title="Onboarding Staff" value="4" detail="31 vs previous period" />
          <Metric title="Avg. Time" value="6 days" detail="Pending task: 13" />
          <Metric title="Offboarding Staff" value="5" detail="31 vs previous period" />
          <Metric title="Avg. Time" value="12 days" detail="Pending clearance: 31" />
        </div>
      </section>
      <div className="dashboard-grid">
        <ApplicationsPanel />
        <PriorityPanel />
        <OverduePanel />
        <RankingPanel compact />
        <TrustPanel />
        <AiOperationsPanel />
      </div>
    </>
  );
}

function EmployerJobsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Employer"
        title="Create, boost and renew job posts"
        description="Đăng tin với editor, gợi ý AI, quản lý trạng thái hoạt động/hết hạn/bị khóa và tài nguyên đẩy tin."
        actions={
          <>
            <button className="secondary-button"><WandSparkles size={15} /> AI draft</button>
            <button className="primary-button"><Plus size={15} /> Create post</button>
          </>
        }
      />
      <div className="jobs-grid">
        <section className="panel editor-panel">
          <PanelHeader icon={<PenLine size={17} />} title="Job editor" action="Preview" />
          <div className="editor-toolbar">
            {["Yêu cầu", "Quyền lợi", "Thông tin ứng tuyển", "Weights"].map((item) => (
              <button key={item}>{item}</button>
            ))}
          </div>
          <Field label="Job title" value="Senior Frontend Engineer" />
          <div className="editor-box">
            <p><strong>Requirements</strong></p>
            <p>5+ years React, TypeScript, performance optimization, design system ownership and fintech product experience.</p>
            <button className="ai-chip"><Sparkles size={14} /> Generate with AI</button>
          </div>
          <div className="weight-grid">
            <Metric title="Skill weight" value="50%" detail="React, TS, FE architecture" />
            <Metric title="Experience" value="30%" detail="5+ years, domain" />
            <Metric title="Other" value="20%" detail="Salary, language, location" />
          </div>
        </section>
        <section className="panel table-panel">
          <PanelHeader icon={<BriefcaseBusiness size={17} />} title="Post list" action="Bulk actions" />
          <div className="post-table">
            {posts.map((post) => (
              <div className="post-row" key={post.title}>
                <div>
                  <strong>{post.title}</strong>
                  <span>{post.views} views • {post.cvs} CVs</span>
                </div>
                <span className={post.status === "Locked" ? "status-pill red" : post.status === "Boosting" ? "status-pill purple" : "status-pill green"}>{post.status}</span>
                <span>{post.expiry}</span>
                <button className="secondary-button small">{post.status === "Expired" ? "Renew" : "Boost"}</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

function EmployerCandidatesPage() {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate>(candidates[0]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Employer"
        title="Ranking table and candidate bank"
        description="AI tự động chấm điểm theo JD/CV, giải thích lý do phù hợp và hỗ trợ đổi trạng thái hàng loạt."
        actions={
          <>
            <button className="secondary-button"><Filter size={15} /> Skills / years / job</button>
            <button className="primary-button"><Sparkles size={15} /> Re-score CVs</button>
          </>
        }
      />
      <div className="recruiter-summary-strip">
        <InsightCard title="New applications" value="128" icon={UsersRound} color="#3196ec" note="31 CVs need first review today" />
        <InsightCard title="High match CVs" value="46" icon={Sparkles} color="#7a2cf3" note="Score 85+ across active jobs" />
        <InsightCard title="Interview-ready" value="18" icon={CalendarClock} color="#f6a311" note="Require schedule confirmation" />
        <InsightCard title="Talent pool" value="342" icon={Heart} color="#2faf72" note="Saved for future campaigns" />
      </div>
      <div className="candidate-rank-grid">
        <RankingPanel selectedName={selectedCandidate.name} onSelect={setSelectedCandidate} />
        <section className="panel cv-preview">
          <PanelHeader icon={<FileText size={17} />} title="CV preview" action="Open full profile" onAction={() => setIsDetailOpen(true)} />
          <div className="candidate-head">
            <Avatar name={selectedCandidate.name} index={candidates.indexOf(selectedCandidate)} large />
            <div>
              <h2>{selectedCandidate.name}</h2>
              <span>{selectedCandidate.role} • {selectedCandidate.salary} • Ho Chi Minh</span>
            </div>
            <ScoreRing label="Match" value={selectedCandidate.match} />
          </div>
          <div className="preview-actions">
            <button className="primary-button small"><CalendarClock size={14} /> Schedule</button>
            <button className="secondary-button small"><Heart size={14} /> Talent pool</button>
            <button className="secondary-button small"><Mail size={14} /> Message</button>
          </div>
          <div className="reason-box">
            <strong>AI reason</strong>
            <p>{selectedCandidate.reason}</p>
          </div>
          <div className="match-reasons compact">
            <div><strong>Skill</strong><p>50% weight: {selectedCandidate.skills.join(", ")}</p></div>
            <div><strong>Experience</strong><p>30% weight: {selectedCandidate.exp}, product delivery evidence.</p></div>
            <div><strong>Other</strong><p>20% weight: salary, location, language and availability.</p></div>
          </div>
          <div className="resume-paper">
            <h3>Experience</h3>
            <p>B2B SaaS dashboards, charting, permission-based workflows, interview-ready communication and delivery ownership.</p>
            <h3>Skills</h3>
            <p>{selectedCandidate.skills.join(", ")}, system design, testing, stakeholder communication.</p>
          </div>
        </section>
      </div>
      {isDetailOpen && (
        <Modal title="Candidate profile review" onClose={() => setIsDetailOpen(false)}>
          <div className="candidate-modal-grid">
            <div className="candidate-head modal-head">
              <Avatar name={selectedCandidate.name} index={candidates.indexOf(selectedCandidate)} large />
              <div>
                <h2>{selectedCandidate.name}</h2>
                <span>{selectedCandidate.role} • {selectedCandidate.exp} • expected {selectedCandidate.salary}</span>
              </div>
              <ScoreRing label="Match" value={selectedCandidate.match} />
            </div>
            <div className="field-table">
              {[
                `Applied job: ${selectedCandidate.job}`,
                `Current stage: ${selectedCandidate.stage}`,
                `Top skills: ${selectedCandidate.skills.join(", ")}`,
                `AI reason: ${selectedCandidate.reason}`,
              ].map((item) => <p key={item}>{item}</p>)}
            </div>
            <div className="modal-actions">
              <button className="secondary-button">Reject with reason</button>
              <button className="secondary-button">Move to shortlist</button>
              <button className="primary-button">Schedule interview</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

function EmployerPipelinePage() {
  const [columns, setColumns] = useState<PipelineColumn[]>(pipelineSeed);
  const [dragged, setDragged] = useState<{ columnId: string; itemId: string } | null>(null);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  function moveCard(targetColumnId: string) {
    if (!dragged || dragged.columnId === targetColumnId) {
      setDragged(null);
      return;
    }

    setColumns((current) => {
      const sourceColumn = current.find((column) => column.id === dragged.columnId);
      const movingItem = sourceColumn?.items.find((item) => item.id === dragged.itemId);
      if (!movingItem) return current;

      return current.map((column) => {
        if (column.id === dragged.columnId) {
          return { ...column, items: column.items.filter((item) => item.id !== dragged.itemId) };
        }
        if (column.id === targetColumnId) {
          return { ...column, items: [{ ...movingItem, sla: targetColumnId === "interview" ? "Needs schedule" : movingItem.sla }, ...column.items] };
        }
        return column;
      });
    });
    setDragged(null);
  }

  return (
    <>
      <PageHeader
        eyebrow="Employer"
        title="Pipeline, interview loops and candidate notifications"
        description="Chuyển trạng thái cập nhật sang ứng viên. Kéo thả candidate giữa các cột; khi chuyển hẹn phỏng vấn, hệ thống bắt buộc nhập lịch và kiểm soát tối đa 2 vòng lặp."
        actions={<button className="primary-button" onClick={() => setScheduleOpen(true)}><CalendarClock size={15} /> Schedule interview</button>}
      />
      <div className="pipeline-board">
        {columns.map((column) => (
          <section
            className={dragged ? "pipeline-column is-droppable" : "pipeline-column"}
            key={column.id}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => moveCard(column.id)}
          >
            <div className="pipeline-head" style={{ "--column-color": column.color, "--column-bg": column.bg } as React.CSSProperties}>
              <span>{column.title}</span>
              <b>{column.items.length}</b>
            </div>
            {column.items.map((card) => (
              <article
                className="pipeline-card"
                key={card.id}
                draggable
                onDragStart={() => setDragged({ columnId: column.id, itemId: card.id })}
                onDragEnd={() => setDragged(null)}
              >
                <div className="pipeline-card-top">
                  <strong>{card.title}</strong>
                  <b>{card.match}</b>
                </div>
                <span><Clock3 size={12} /> {card.sla}</span>
                <p>{card.person}</p>
                <div className="skill-list">
                  <i>{card.tag}</i>
                </div>
              </article>
            ))}
          </section>
        ))}
      </div>
      <section className="panel schedule-panel">
        <PanelHeader icon={<CalendarDays size={17} />} title="Interview scheduling logic" action="View calendar" />
        <div className="schedule-grid">
          <Metric title="Loop limit" value="2" detail="NTD gửi -> ứng viên hẹn lại -> NTD gửi lại" />
          <Metric title="Pending replies" value="6" detail="Auto email reminder after 24h" />
          <Metric title="Rejected by SLA" value="3" detail="No movement after 7 days" />
          <Metric title="Calendar sync" value="98%" detail="Google/Outlook ready" />
        </div>
      </section>
      {scheduleOpen && (
        <Modal title="Schedule interview" onClose={() => setScheduleOpen(false)}>
          <div className="schedule-modal">
            <div className="form-grid">
              <Field label="Candidate" value="Nguyen Minh Khoa" />
              <Field label="Interview round" value="Technical Interview - Loop 1/2" />
              <Field label="Date" value="24 May 2026" />
              <Field label="Time" value="09:00 - 10:00" />
              <Field label="Interviewers" value="Ahmad Zainy, Lylia Workman" />
              <Field label="Meeting link" value="meet.upnext.vn/react-lead-khoa" />
            </div>
            <div className="auth-warning">
              <AlertTriangle size={16} />
              <span>Nếu ứng viên từ chối và đề xuất lịch khác, hệ thống chỉ cho phép tối đa 2 vòng gửi lại để tránh spam.</span>
            </div>
            <div className="modal-actions">
              <button className="secondary-button">Save draft</button>
              <button className="primary-button">Send invite + email</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

function EmployerCompanyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Employer"
        title="Company profile, trust score and subscription"
        description="Doanh nghiệp bổ sung xác thực để tăng điểm uy tín, theo dõi gói dịch vụ, tài nguyên, lịch sử mua hàng và hóa đơn."
        actions={<button className="primary-button"><BadgeCheck size={15} /> Verify company</button>}
      />
      <div className="company-grid">
        <TrustPanel wide />
        <section className="panel company-profile">
          <PanelHeader icon={<ShieldCheck size={17} />} title="Company profile" action="Edit" />
          <div className="field-table">
            {["Business license: Verified", "Tax code: 0318 884 209", "Address: 12 Nguyen Hue, District 1", "Representative: Tran Hoang Lan", "Response SLA: 88% within 24h"].map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </section>
        <section className="panel billing-panel">
          <PanelHeader icon={<CircleDollarSign size={17} />} title="Plan resources" action="Buy more" />
          <div className="resource-grid">
            <Metric title="Plan" value="Pro" detail="Valid until 31 Dec 2026" />
            <Metric title="Boost credits" value="18" detail="Used 12/30" />
            <Metric title="AI JD drafts" value="64" detail="Monthly quota" />
            <Metric title="Invoices" value="12" detail="3 awaiting payment" />
          </div>
        </section>
      </div>
    </>
  );
}

function AdminDashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Admin"
        title="Platform statistics and AI health"
        description="Theo dõi user mới, bài đăng mới, doanh thu gói, hiệu năng AI và cảnh báo gián đoạn dịch vụ."
        actions={<button className="primary-button"><Flag size={15} /> Review alerts</button>}
      />
      <div className="admin-kpi-grid">
        <InsightCard title="New users" value="1,284" icon={UsersRound} color="#2f99f3" note="Candidate +18%, employer +7%" />
        <InsightCard title="New posts" value="386" icon={BriefcaseBusiness} color="#7a2cf3" note="27 waiting moderation" />
        <InsightCard title="Revenue" value="$42.8k" icon={Banknote} color="#2faf72" note="30 days subscription sales" />
        <InsightCard title="AI latency" value="1.4s" icon={Gauge} color="#f6a311" note="Match scoring p95" />
      </div>
      <div className="dashboard-grid admin">
        <ApplicationsPanel />
        <section className="panel">
          <PanelHeader icon={<AlertTriangle size={17} />} title="System alerts" action="Open queue" />
          {adminAlerts.map((alert) => (
            <div className="alert-row" key={alert}>
              <AlertTriangle size={15} />
              <span>{alert}</span>
            </div>
          ))}
        </section>
        <PriorityPanel />
      </div>
    </>
  );
}

function AdminModerationPage() {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const moderationItems = ["Junior Tester - suspicious fee", "Remote DevOps - banned keyword", "React Lead - clean appeal", "Data Intern - lách luật"];

  return (
    <>
      <PageHeader
        eyebrow="Admin"
        title="Job post moderation and banned words"
        description="Quét tự động phát hiện nội dung vi phạm, ẩn/mở bài có lý do dropdown, hỗ trợ khiếu nại bằng chứng hợp lệ."
        actions={<button className="primary-button"><RefreshCw size={15} /> Re-scan all posts</button>}
      />
      <div className="moderation-grid">
        <section className="panel table-panel">
          <PanelHeader icon={<ShieldAlert size={17} />} title="Moderation queue" action="Reason dropdown" onAction={() => setSelectedCase(moderationItems[0])} />
          {moderationItems.map((item, index) => (
            <div className="post-row" key={item}>
              <div>
                <strong>{item}</strong>
                <span>{index % 2 ? "Auto hidden, employer notified" : "Needs admin decision"}</span>
              </div>
              <span className={index % 2 ? "status-pill red" : "status-pill yellow"}>{index % 2 ? "Hidden" : "Review"}</span>
              <button className="secondary-button small" onClick={() => setSelectedCase(item)}>Open</button>
            </div>
          ))}
        </section>
        <section className="panel">
          <PanelHeader icon={<Flag size={17} />} title="Banned word library" action="Add word" />
          <div className="word-cloud">
            {["phí giữ chỗ", "cam kết lương ảo", "không hợp đồng", "thu hộ", "né thuế", "đặt cọc"].map((word) => (
              <span key={word}>{word}</span>
            ))}
          </div>
          <div className="auth-warning">
            <AlertTriangle size={16} />
            <span>Khi danh sách cập nhật, hệ thống quét lại toàn bộ bài đăng và gửi lý do xóa tới nhà tuyển dụng.</span>
          </div>
        </section>
      </div>
      {selectedCase && (
        <Modal title="Moderation decision" onClose={() => setSelectedCase(null)}>
          <div className="schedule-modal">
            <div className="reason-box">
              <strong>{selectedCase}</strong>
              <p>Nội dung chứa dấu hiệu vi phạm chính sách sàn. Admin phải chọn lý do chuẩn để hệ thống lưu trữ và gửi thông báo cho nhà tuyển dụng.</p>
            </div>
            <div className="form-grid">
              <Field label="Decision" value="Hide post and notify employer" />
              <Field label="Reason dropdown" value="Nội dung chứa từ ngữ không phù hợp hoặc vi phạm chính sách của sàn" />
              <Field label="Appeal status" value="Cho phép khiếu nại kèm bằng chứng hợp lệ" />
              <Field label="Re-scan scope" value="Apply updated banned words to all active posts" />
            </div>
            <div className="modal-actions">
              <button className="secondary-button">Request evidence</button>
              <button className="secondary-button">Restore post</button>
              <button className="primary-button">Hide and send reason</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

function AdminUsersFinancePage() {
  return (
    <>
      <PageHeader
        eyebrow="Admin"
        title="Employers, candidates, plans and admin roles"
        description="Giám sát nhà tuyển dụng, ứng viên, gói dịch vụ, hóa đơn, hoàn tiền và phân quyền admin phụ."
        actions={<button className="primary-button"><Plus size={15} /> Add sub-admin</button>}
      />
      <div className="finance-grid">
        <section className="panel table-panel">
          <PanelHeader icon={<BriefcaseBusiness size={17} />} title="Employer accounts" action="Lock / unlock" />
          {["Nexa Fintech - 92 trust", "CloudBridge Labs - 86 trust", "NewSoft Co - 54 trust", "Risky Hiring - 28 trust"].map((item, index) => (
            <div className="post-row" key={item}>
              <div>
                <strong>{item}</strong>
                <span>{index < 2 ? "Using Pro plan" : index === 2 ? "Limited features" : "Temporary locked"}</span>
              </div>
              <span className={index === 3 ? "status-pill red" : index === 2 ? "status-pill yellow" : "status-pill green"}>{index === 3 ? "Locked" : "Active"}</span>
            </div>
          ))}
        </section>
        <section className="panel billing-panel">
          <PanelHeader icon={<Banknote size={17} />} title="Plans & invoices" action="Edit prices" />
          <div className="resource-grid">
            <Metric title="Basic" value="$49" detail="30 posts/month" />
            <Metric title="Pro" value="$149" detail="AI + boost credits" />
            <Metric title="Enterprise" value="$399" detail="SLA and support" />
            <Metric title="Refunds" value="4" detail="Policy approved" />
          </div>
        </section>
        <section className="panel">
          <PanelHeader icon={<UserCheck size={17} />} title="Sub-admin roles" action="Manage" />
          {["Admin Sale", "Admin duyệt tin", "Admin hỗ trợ khách hàng"].map((role, index) => (
            <div className="mini-row" key={role}>
              <Avatar name={role} index={index} />
              <div>
                <strong>{role}</strong>
                <span>{index + 3} permissions enabled</span>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

function ApplicationsPanel() {
  return (
    <section className="panel chart-panel">
      <PanelHeader icon={<TrendingUp size={17} />} title="Applications & Shortlist" action="Details" />
      <ResponsiveContainer width="100%" height={210}>
        <LineChart data={applicantTrend} margin={{ left: -16, right: 10, top: 10 }}>
          <CartesianGrid vertical={false} stroke="#ececf2" strokeDasharray="5 5" />
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#858897", fontSize: 11 }} />
          <YAxis hide domain={[0, 90]} />
          <Tooltip content={<ChartTooltip />} />
          <Line type="monotone" dataKey="applied" stroke="#3196ec" strokeWidth={2.5} dot={false} isAnimationActive={false} />
          <Line type="monotone" dataKey="shortlist" stroke="#2faf72" strokeWidth={2.5} dot={false} isAnimationActive={false} />
          <Line type="monotone" dataKey="interviews" stroke="#7a2cf3" strokeWidth={2.5} dot={false} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}

function PriorityPanel() {
  return (
    <section className="panel chart-panel">
      <PanelHeader icon={<Clock3 size={17} />} title="Task Priority" action="Details" />
      <ResponsiveContainer width="100%" height={170}>
        <PieChart>
          <Pie data={matchDistribution} dataKey="value" innerRadius={58} outerRadius={76} paddingAngle={4} stroke="none" isAnimationActive={false}>
            {matchDistribution.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="center-total">
        <strong>102</strong>
        <span>Priority</span>
      </div>
      <div className="priority-legend">
        <span>Low 853</span>
        <span>Medium 213</span>
        <span>High 355</span>
      </div>
    </section>
  );
}

function OverduePanel() {
  return (
    <section className="panel chart-panel">
      <PanelHeader icon={<AlertTriangle size={17} />} title="Overdue Task Trend" action="Details" />
      <div className="big-number">21 <Trend value="4%" negative /></div>
      <ResponsiveContainer width="100%" height={150}>
        <BarChart data={applicantTrend}>
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#858897", fontSize: 11 }} />
          <Tooltip content={<ChartTooltip />} cursor={false} />
          <Bar dataKey="interviews" fill="#ef3936" radius={[8, 8, 2, 2]} maxBarSize={24} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}

function RankingPanel({
  compact = false,
  selectedName,
  onSelect,
}: {
  compact?: boolean;
  selectedName?: string;
  onSelect?: (candidate: Candidate) => void;
}) {
  return (
    <section className={compact ? "panel ranking-panel compact" : "panel ranking-panel"}>
      <PanelHeader icon={<Star size={17} />} title="Match Score Ranking" action="Bulk status" />
      <div className="ranking-table">
        <div className="ranking-head">
          <span>Candidate</span>
          <span>Applied Job</span>
          <span>Skills</span>
          <span>Score</span>
          <span>Stage</span>
        </div>
        {candidates.map((candidate, index) => (
          <button
            className={selectedName === candidate.name ? "ranking-row selected" : "ranking-row"}
            key={candidate.name}
            onClick={() => onSelect?.(candidate)}
          >
            <div className="person-cell">
              <Avatar name={candidate.name} index={index} />
              <div>
                <strong>{candidate.name}</strong>
                <span>{candidate.role} • {candidate.exp}</span>
              </div>
            </div>
            <span>{candidate.job}</span>
            <div className="skill-list">
              {candidate.skills.slice(0, compact ? 1 : 2).map((skill) => (
                <i key={skill}>{skill}</i>
              ))}
            </div>
            <div className="score-bar">
              <b>{candidate.match}</b>
              <span><i style={{ width: `${candidate.match}%` }} /></span>
            </div>
            <span className="status-pill">{candidate.stage}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function TrustPanel({ wide = false }: { wide?: boolean }) {
  return (
    <section className={wide ? "panel trust-panel wide" : "panel trust-panel"}>
      <PanelHeader icon={<ShieldCheck size={17} />} title="Employer Trust Score" action="Improve" />
      <div className="trust-score">
        <strong>86</strong>
        <span>Doanh nghiệp tin cậy</span>
      </div>
      <div className="trust-meter"><span style={{ width: "86%" }} /></div>
      <div className="trust-list">
        <p><CheckCircle2 size={14} /> Business license verified (+12)</p>
        <p><CheckCircle2 size={14} /> Positive candidate reviews (+8)</p>
        <p><AlertTriangle size={14} /> Response SLA needs attention (-4)</p>
      </div>
    </section>
  );
}

function AiOperationsPanel() {
  const items = [
    ["AI viết tin tuyển dụng", "Tạo JD từ skills, level, salary range", WandSparkles],
    ["Match Score Ranking", "50% kỹ năng, 30% kinh nghiệm, 20% khác", Gauge],
    ["Chatbot hỗ trợ", "Kịch bản hỏi đáp và routing đến support", Bot],
  ] as const;
  return (
    <section className="panel ai-panel">
      <PanelHeader icon={<WandSparkles size={17} />} title="AI Operations" action="Configure" />
      {items.map(([title, detail, Icon]) => (
        <div className="ai-action" key={title}>
          <Icon size={16} />
          <div>
            <strong>{title}</strong>
            <span>{detail}</span>
          </div>
        </div>
      ))}
    </section>
  );
}

function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
}) {
  return (
    <header className="page-header">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {actions && <div className="header-actions">{actions}</div>}
    </header>
  );
}

function PanelHeader({
  icon,
  title,
  action,
  onAction,
}: {
  icon: React.ReactNode;
  title: string;
  action: string;
  onAction?: () => void;
}) {
  return (
    <div className="panel-header">
      <h2>{icon}{title}</h2>
      <button onClick={onAction}>{action}<ChevronRight size={13} /></button>
    </div>
  );
}

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal-panel" role="dialog" aria-modal="true" aria-label={title} onMouseDown={(event) => event.stopPropagation()}>
        <header className="modal-header">
          <h2>{title}</h2>
          <button className="ghost-icon" onClick={onClose} aria-label="Close modal">×</button>
        </header>
        {children}
      </section>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input value={value} readOnly />
    </label>
  );
}

function Metric({ title, value, detail }: { title: string; value: string; detail: string }) {
  return (
    <div className="metric">
      <span>{title}</span>
      <strong>{value}</strong>
      <em>{detail}</em>
    </div>
  );
}

function InsightCard({
  title,
  value,
  icon: Icon,
  color,
  note,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
  note: string;
}) {
  return (
    <section className="panel insight-card">
      <div className="insight-icon" style={{ color }}>
        <Icon size={18} />
      </div>
      <span>{title}</span>
      <strong>{value}</strong>
      <p>{note}</p>
    </section>
  );
}

function Segmented({
  value,
  options,
  onChange,
}: {
  value: string;
  options: Array<[string, string]>;
  onChange: (value: string) => void;
}) {
  return (
    <div className="segmented">
      {options.map(([id, label]) => (
        <button className={value === id ? "active" : ""} key={id} onClick={() => onChange(id)}>
          {label}
        </button>
      ))}
    </div>
  );
}

function ScoreRing({ value, label }: { value: number; label: string }) {
  return (
    <div className="score-ring" style={{ "--score": `${value * 3.6}deg` } as React.CSSProperties}>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function Avatar({ name, index, large = false }: { name: string; index: number; large?: boolean }) {
  const colors = ["#3196ec", "#2faf72", "#7a2cf3", "#f6a311", "#ef4444"];
  return (
    <span className={large ? "mini-avatar large" : "mini-avatar"} style={{ background: colors[index % colors.length] }}>
      {name.split(" ").slice(-1)[0].charAt(0)}
    </span>
  );
}

function Trend({ value, negative = false }: { value: string; negative?: boolean }) {
  return (
    <span className={negative ? "trend negative" : "trend"}>
      {negative ? "↘" : "↗"} {value} <em>vs previous period</em>
    </span>
  );
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ color: string; name: string; value: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      {label && <strong>{label}</strong>}
      {payload.map((item) => (
        <span key={item.name}>
          <i style={{ background: item.color }} />
          {item.name}: <b>{item.value}</b>
        </span>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

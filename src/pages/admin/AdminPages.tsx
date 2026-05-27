import { useState } from "react";
import {
  Area,
  AreaChart,
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
import {
  AlertTriangle,
  Banknote,
  BriefcaseBusiness,
  CheckCircle2,
  FileSearch,
  Flag,
  Gauge,
  Globe2,
  LockKeyhole,
  Plus,
  RefreshCw,
  ScrollText,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  UsersRound,
  WalletCards,
} from "lucide-react";
import { AuthNotice, Avatar, ChartTooltip, Field, InsightCard, Metric, Modal, PageHeader, PanelHeader } from "../../components/ui";

const moderationItems = ["Junior Tester - suspicious fee", "Remote DevOps - banned keyword", "React Lead - clean appeal", "Data Intern - lách luật"];
const permissionGroups = [
  ["User", ["user.read", "user.lock", "user.export"]],
  ["Employer", ["employer.verify", "employer.lock", "billing.refund"]],
  ["Content", ["post.moderate", "seo.edit", "blog.publish"]],
  ["Sales", ["lead.read", "deal.update", "invoice.view"]],
  ["System", ["role.create", "audit.read", "ai.configure"]],
];
const adminRoles = [
  { name: "Super Admin", owner: "CEO / CTO", enabled: 15, scope: "Full platform" },
  { name: "Admin SEO", owner: "Marketing Lead", enabled: 4, scope: "SEO, blog, landing pages" },
  { name: "Admin Sales", owner: "Sales Ops", enabled: 6, scope: "Leads, deals, invoices" },
  { name: "Admin kiểm duyệt", owner: "Trust & Safety", enabled: 5, scope: "Posts, appeals, banned words" },
  { name: "Admin Support", owner: "CS Lead", enabled: 7, scope: "Tickets, accounts, refunds view" },
];

const adminGrowth = [
  { day: "Mon", candidates: 1840, employers: 320, posts: 92 },
  { day: "Tue", candidates: 2110, employers: 380, posts: 108 },
  { day: "Wed", candidates: 2380, employers: 410, posts: 126 },
  { day: "Thu", candidates: 2660, employers: 460, posts: 144 },
  { day: "Fri", candidates: 2920, employers: 520, posts: 161 },
  { day: "Sat", candidates: 3180, employers: 570, posts: 148 },
  { day: "Sun", candidates: 3420, employers: 610, posts: 176 },
];

const revenueByPlan = [
  { plan: "Trial", revenue: 0, accounts: 420 },
  { plan: "Starter", revenue: 9800, accounts: 186 },
  { plan: "Growth", revenue: 24800, accounts: 142 },
  { plan: "Enterprise", revenue: 8200, accounts: 18 },
];

const roleDistribution = [
  { name: "Candidate", value: 72, color: "#3b82f6" },
  { name: "Employer", value: 21, color: "#10a778" },
  { name: "Admin", value: 7, color: "#574bf5" },
];

const moderationTrend = [
  { day: "Mon", flagged: 18, hidden: 7, restored: 3 },
  { day: "Tue", flagged: 24, hidden: 9, restored: 4 },
  { day: "Wed", flagged: 19, hidden: 6, restored: 5 },
  { day: "Thu", flagged: 31, hidden: 14, restored: 6 },
  { day: "Fri", flagged: 27, hidden: 12, restored: 3 },
  { day: "Sat", flagged: 22, hidden: 8, restored: 2 },
  { day: "Sun", flagged: 34, hidden: 16, restored: 5 },
];

const seoTraffic = [
  { page: "Home", clicks: 8200, impressions: 64200 },
  { page: "React", clicks: 4860, impressions: 39100 },
  { page: "Salary", clicks: 3420, impressions: 28400 },
  { page: "Company", clicks: 2910, impressions: 23600 },
  { page: "Blog", clicks: 2180, impressions: 19700 },
];

const salesFunnel = [
  { stage: "Lead", count: 420 },
  { stage: "Demo", count: 188 },
  { stage: "Trial", count: 112 },
  { stage: "Paid", count: 54 },
  { stage: "Renewal", count: 31 },
];

const auditTrend = [
  { day: "Mon", events: 132, risk: 6 },
  { day: "Tue", events: 151, risk: 9 },
  { day: "Wed", events: 146, risk: 5 },
  { day: "Thu", events: 184, risk: 12 },
  { day: "Fri", events: 173, risk: 8 },
  { day: "Sat", events: 118, risk: 4 },
  { day: "Sun", events: 127, risk: 7 },
];

export function AdminDashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Admin"
        title="Platform command center, revenue and AI health"
        description="Dashboard vận hành toàn nền tảng: tăng trưởng ứng viên/nhà tuyển dụng, doanh thu gói, kiểm duyệt, phân quyền và sức khỏe AI."
        actions={<button className="primary-button"><Flag size={15} /> Review alerts</button>}
      />
      <div className="admin-kpi-grid">
        <InsightCard title="New users" value="1,284" icon={UsersRound} color="#3b82f6" note="Candidate +18%, employer +7%" />
        <InsightCard title="New posts" value="386" icon={BriefcaseBusiness} color="#574bf5" note="27 waiting moderation" />
        <InsightCard title="Revenue" value="$42.8k" icon={Banknote} color="#10a778" note="30 days subscription sales" />
        <InsightCard title="AI latency" value="1.4s" icon={Gauge} color="#f59e0b" note="Match scoring p95" />
      </div>
      <div className="admin-command-grid">
        <section className="panel admin-chart-card wide">
          <PanelHeader icon={<UsersRound size={17} />} title="User, employer and job post growth" action="Open analytics" />
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={adminGrowth}>
              <defs>
                <linearGradient id="candidateGrowth" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.34} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="employerGrowth" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#10a778" stopOpacity={0.34} />
                  <stop offset="95%" stopColor="#10a778" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#ececf2" strokeDasharray="5 5" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#858897", fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#858897", fontSize: 11 }} width={42} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="candidates" stroke="#3b82f6" strokeWidth={2.4} fill="url(#candidateGrowth)" isAnimationActive={false} />
              <Area type="monotone" dataKey="employers" stroke="#10a778" strokeWidth={2.4} fill="url(#employerGrowth)" isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="chart-summary-row">
            <Metric title="Candidate growth" value="+18%" detail="Organic and referral sources" />
            <Metric title="Employer growth" value="+7%" detail="Paid acquisition stable" />
            <Metric title="New posts" value="176" detail="Sunday peak, 27 pending" />
          </div>
        </section>

        <section className="panel admin-chart-card">
          <PanelHeader icon={<UserCheck size={17} />} title="Workspace mix" action="Roles" />
          <ResponsiveContainer width="100%" height={230}>
            <PieChart>
              <Pie data={roleDistribution} innerRadius={58} outerRadius={86} paddingAngle={4} dataKey="value" isAnimationActive={false}>
                {roleDistribution.map((entry) => <Cell fill={entry.color} key={entry.name} />)}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="chart-legend">
            {roleDistribution.map((entry) => <span key={entry.name}><i style={{ background: entry.color }} />{entry.name} {entry.value}%</span>)}
          </div>
        </section>

        <section className="panel admin-chart-card">
          <PanelHeader icon={<Banknote size={17} />} title="Revenue by plan" action="Finance" />
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={revenueByPlan}>
              <CartesianGrid vertical={false} stroke="#ececf2" />
              <XAxis dataKey="plan" axisLine={false} tickLine={false} tick={{ fill: "#858897", fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#858897", fontSize: 11 }} width={42} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="revenue" fill="#574bf5" radius={[8, 8, 2, 2]} maxBarSize={44} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </section>

        <section className="panel admin-chart-card">
          <PanelHeader icon={<ShieldAlert size={17} />} title="Moderation workload" action="Queue" />
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={moderationTrend}>
              <CartesianGrid vertical={false} stroke="#ececf2" strokeDasharray="5 5" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#858897", fontSize: 11 }} />
              <YAxis hide />
              <Tooltip content={<ChartTooltip />} />
              <Line type="monotone" dataKey="flagged" stroke="#f59e0b" strokeWidth={2.4} dot={false} isAnimationActive={false} />
              <Line type="monotone" dataKey="hidden" stroke="#ef4444" strokeWidth={2.4} dot={false} isAnimationActive={false} />
              <Line type="monotone" dataKey="restored" stroke="#10a778" strokeWidth={2.4} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </section>

        <section className="panel admin-alert-panel">
          <PanelHeader icon={<AlertTriangle size={17} />} title="System alerts" action="Open queue" />
          {["Tin tuyển dụng chứa từ ngữ lách luật", "Nhà tuyển dụng có trust score dưới 50", "AI matching latency vượt ngưỡng 1.8s", "Refund request needs 2-person approval"].map((alert) => <div className="alert-row" key={alert}><AlertTriangle size={15} /><span>{alert}</span></div>)}
        </section>
      </div>
    </>
  );
}

export function AdminModerationPage() {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  return (
    <>
      <PageHeader
        eyebrow="Admin"
        title="Job post moderation and banned words"
        description="Quét tự động phát hiện nội dung vi phạm, ẩn/mở bài có lý do dropdown, hỗ trợ khiếu nại bằng chứng hợp lệ."
        actions={<button className="primary-button"><RefreshCw size={15} /> Re-scan all posts</button>}
      />
      <div className="admin-kpi-grid compact">
        <InsightCard title="Flagged today" value="34" icon={ShieldAlert} color="#f59e0b" note="16 auto-hidden, 5 appealed" />
        <InsightCard title="False positive" value="8%" icon={CheckCircle2} color="#10a778" note="Goal below 10%" />
        <InsightCard title="Avg review time" value="18m" icon={Gauge} color="#3b82f6" note="P95 below 45m" />
        <InsightCard title="Banned signals" value="142" icon={Flag} color="#ef4444" note="Fee, deposit, fake salary" />
      </div>
      <div className="admin-dashboard-row">
        <section className="panel admin-chart-card">
          <PanelHeader icon={<ShieldAlert size={17} />} title="Moderation trend" action="Last 7 days" />
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={moderationTrend}>
              <CartesianGrid vertical={false} stroke="#ececf2" strokeDasharray="5 5" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#858897", fontSize: 11 }} />
              <YAxis hide />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="flagged" stroke="#f59e0b" fill="#fff4de" strokeWidth={2.4} isAnimationActive={false} />
              <Area type="monotone" dataKey="hidden" stroke="#ef4444" fill="#ffeded" strokeWidth={2.4} isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </section>
        <section className="panel admin-chart-card">
          <PanelHeader icon={<Flag size={17} />} title="Reason distribution" action="Rules" />
          <div className="reason-bars">
            {["Deposit scam", "Fake salary", "Banned keyword", "Duplicate post", "Missing company proof"].map((item, index) => (
              <div key={item}><span>{item}</span><b style={{ width: `${82 - index * 12}%` }} /></div>
            ))}
          </div>
        </section>
      </div>
      <div className="moderation-grid">
        <section className="panel table-panel">
          <PanelHeader icon={<ShieldAlert size={17} />} title="Moderation queue" action="Reason dropdown" onAction={() => setSelectedCase(moderationItems[0])} />
          {moderationItems.map((item, index) => (
            <div className="post-row" key={item}>
              <div><strong>{item}</strong><span>{index % 2 ? "Auto hidden, employer notified" : "Needs admin decision"}</span></div>
              <span className={index % 2 ? "status-pill red" : "status-pill yellow"}>{index % 2 ? "Hidden" : "Review"}</span>
              <button className="secondary-button small" onClick={() => setSelectedCase(item)}>Open</button>
            </div>
          ))}
        </section>
        <section className="panel">
          <PanelHeader icon={<Flag size={17} />} title="Banned word library" action="Add word" />
          <div className="word-cloud">{["phí giữ chỗ", "cam kết lương ảo", "không hợp đồng", "thu hộ", "né thuế", "đặt cọc"].map((word) => <span key={word}>{word}</span>)}</div>
          <AuthNotice>Khi danh sách cập nhật, hệ thống quét lại toàn bộ bài đăng và gửi lý do xóa tới nhà tuyển dụng.</AuthNotice>
        </section>
      </div>
      {selectedCase && (
        <Modal title="Moderation decision" onClose={() => setSelectedCase(null)}>
          <div className="reason-box"><strong>{selectedCase}</strong><p>Admin phải chọn lý do chuẩn để hệ thống lưu trữ và gửi thông báo cho nhà tuyển dụng.</p></div>
          <div className="form-grid"><Field label="Decision" value="Hide post and notify employer" /><Field label="Reason dropdown" value="Nội dung chứa từ ngữ không phù hợp hoặc vi phạm chính sách" /></div>
          <div className="modal-actions"><button className="secondary-button">Request evidence</button><button className="secondary-button">Restore post</button><button className="primary-button">Hide and send reason</button></div>
        </Modal>
      )}
    </>
  );
}

export function AdminUsersFinancePage() {
  return (
    <>
      <PageHeader
        eyebrow="Admin"
        title="Employers, candidates, plans and admin roles"
        description="Giám sát nhà tuyển dụng, ứng viên, gói dịch vụ, hóa đơn, hoàn tiền và phân quyền admin phụ."
        actions={<button className="primary-button"><Plus size={15} /> Add sub-admin</button>}
      />
      <div className="admin-dashboard-row">
        <section className="panel admin-chart-card">
          <PanelHeader icon={<Banknote size={17} />} title="Plan revenue and active accounts" action="Export" />
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={revenueByPlan}>
              <CartesianGrid vertical={false} stroke="#ececf2" />
              <XAxis dataKey="plan" axisLine={false} tickLine={false} tick={{ fill: "#858897", fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#858897", fontSize: 11 }} width={44} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="revenue" fill="#10a778" radius={[8, 8, 2, 2]} maxBarSize={44} isAnimationActive={false} />
              <Bar dataKey="accounts" fill="#3b82f6" radius={[8, 8, 2, 2]} maxBarSize={44} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </section>
        <section className="panel admin-chart-card">
          <PanelHeader icon={<UsersRound size={17} />} title="Account growth" action="Segments" />
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={adminGrowth}>
              <CartesianGrid vertical={false} stroke="#ececf2" strokeDasharray="5 5" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#858897", fontSize: 11 }} />
              <YAxis hide />
              <Tooltip content={<ChartTooltip />} />
              <Line type="monotone" dataKey="candidates" stroke="#3b82f6" strokeWidth={2.4} dot={false} isAnimationActive={false} />
              <Line type="monotone" dataKey="employers" stroke="#10a778" strokeWidth={2.4} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </section>
      </div>
      <div className="finance-grid">
        <section className="panel table-panel">
          <PanelHeader icon={<BriefcaseBusiness size={17} />} title="Employer accounts" action="Lock / unlock" />
          {["Nexa Fintech - 92 trust", "CloudBridge Labs - 86 trust", "NewSoft Co - 54 trust", "Risky Hiring - 28 trust"].map((item, index) => (
            <div className="post-row" key={item}>
              <div><strong>{item}</strong><span>{index < 2 ? "Using Pro plan" : index === 2 ? "Limited features" : "Temporary locked"}</span></div>
              <span className={index === 3 ? "status-pill red" : index === 2 ? "status-pill yellow" : "status-pill green"}>{index === 3 ? "Locked" : "Active"}</span>
            </div>
          ))}
        </section>
        <section className="panel billing-panel">
          <PanelHeader icon={<Banknote size={17} />} title="Plans & invoices" action="Edit prices" />
          <div className="resource-grid"><Metric title="Basic" value="$49" detail="30 posts/month" /><Metric title="Pro" value="$149" detail="AI + boost credits" /><Metric title="Enterprise" value="$399" detail="SLA and support" /><Metric title="Refunds" value="4" detail="Policy approved" /></div>
        </section>
        <section className="panel">
          <PanelHeader icon={<UserCheck size={17} />} title="Sub-admin roles" action="Manage" />
          {["Admin Sale", "Admin duyệt tin", "Admin hỗ trợ khách hàng"].map((role, index) => <div className="mini-row" key={role}><Avatar name={role} index={index} /><div><strong>{role}</strong><span>{index + 3} permissions enabled</span></div></div>)}
        </section>
      </div>
    </>
  );
}

export function AdminRolesPage() {
  const [selectedRole, setSelectedRole] = useState(adminRoles[0]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  return (
    <>
      <PageHeader
        eyebrow="Super Admin"
        title="Dynamic roles, permissions and admin governance"
        description="Super Admin tạo nhiều role như Admin SEO, Admin Sales, Admin kiểm duyệt; quyền được bật/tắt theo nhóm và lưu audit trail."
        actions={<button className="primary-button" onClick={() => setIsCreateOpen(true)}><Plus size={15} /> Create role</button>}
      />
      <div className="admin-role-layout">
        <section className="panel">
          <PanelHeader icon={<UserCheck size={17} />} title="Admin roles" action="Clone role" />
          {adminRoles.map((role, index) => (
            <button className={selectedRole.name === role.name ? "role-row selected" : "role-row"} key={role.name} onClick={() => setSelectedRole(role)}>
              <Avatar name={role.name} index={index} />
              <div><strong>{role.name}</strong><span>{role.scope}</span></div>
              <b>{role.enabled}</b>
            </button>
          ))}
        </section>
        <section className="panel">
          <PanelHeader icon={<LockKeyhole size={17} />} title={`${selectedRole.name} permission matrix`} action="Save policy" />
          <div className="permission-matrix">
            {permissionGroups.map(([group, permissions], groupIndex) => (
              <div className="permission-group" key={group as string}>
                <h3>{group}</h3>
                {(permissions as string[]).map((permission, index) => {
                  const enabled = selectedRole.name === "Super Admin" || (index + groupIndex + selectedRole.enabled) % 2 === 0;
                  return (
                    <label className="permission-toggle" key={permission}>
                      <span>{permission}</span>
                      <input type="checkbox" checked={enabled} readOnly />
                    </label>
                  );
                })}
              </div>
            ))}
          </div>
        </section>
        <aside className="panel">
          <PanelHeader icon={<ShieldCheck size={17} />} title="Governance rules" action="Edit" />
          {["Super Admin approval required for role.create", "Every permission change writes audit log", "Finance refund requires 2-person approval", "Moderation appeals cannot be self-approved"].map((item) => (
            <div className="check-row" key={item}><CheckCircle2 size={15} /><span>{item}</span></div>
          ))}
        </aside>
      </div>
      {isCreateOpen && (
        <Modal title="Create dynamic admin role" onClose={() => setIsCreateOpen(false)}>
          <div className="form-grid"><Field label="Role name" value="Admin SEO Regional" /><Field label="Owner" value="Marketing Lead" /><Field label="Scope" value="SEO pages, blog publish, sitemap" /><Field label="Approval" value="Super Admin required" /></div>
          <AuthNotice>Role mới mặc định không có quyền nhạy cảm. Super Admin phải bật từng permission và lý do được lưu trong audit log.</AuthNotice>
          <div className="modal-actions"><button className="secondary-button">Save draft</button><button className="primary-button">Create role</button></div>
        </Modal>
      )}
    </>
  );
}

export function AdminSeoPage() {
  const seoRows = ["Home /candidate", "React jobs landing", "Company directory", "Salary guide", "Blog: IT hiring trends", "Sitemap.xml"];
  return (
    <>
      <PageHeader
        eyebrow="Admin SEO"
        title="SEO console, landing pages and indexing health"
        description="Quản lý metadata, landing pages theo skill/location, sitemap, canonical, index status và content queue cho tuyển dụng IT."
        actions={<button className="primary-button"><Globe2 size={15} /> Publish SEO changes</button>}
      />
      <div className="admin-dashboard-row">
        <section className="panel admin-chart-card">
          <PanelHeader icon={<Globe2 size={17} />} title="Organic clicks and impressions" action="Search Console" />
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={seoTraffic}>
              <CartesianGrid vertical={false} stroke="#ececf2" />
              <XAxis dataKey="page" axisLine={false} tickLine={false} tick={{ fill: "#858897", fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#858897", fontSize: 11 }} width={44} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="clicks" fill="#10a778" radius={[8, 8, 2, 2]} maxBarSize={34} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </section>
        <section className="panel admin-chart-card">
          <PanelHeader icon={<FileSearch size={17} />} title="SEO issue map" action="Fix queue" />
          <div className="reason-bars">
            {["Duplicate meta", "Missing canonical", "Slow mobile LCP", "Noindex warning", "Thin content"].map((item, index) => (
              <div key={item}><span>{item}</span><b style={{ width: `${74 - index * 10}%` }} /></div>
            ))}
          </div>
        </section>
      </div>
      <div className="seo-grid">
        <section className="panel table-panel">
          <PanelHeader icon={<FileSearch size={17} />} title="SEO page inventory" action="Run audit" />
          {seoRows.map((row, index) => (
            <div className="post-row" key={row}>
              <div><strong>{row}</strong><span>{index % 2 ? "Needs meta refresh" : "Indexed and healthy"}</span></div>
              <span className={index % 2 ? "status-pill yellow" : "status-pill green"}>{index % 2 ? "Warning" : "Healthy"}</span>
              <button className="secondary-button small">Open</button>
            </div>
          ))}
        </section>
        <section className="panel">
          <PanelHeader icon={<Gauge size={17} />} title="Indexing health" action="Details" />
          <div className="resource-grid"><Metric title="Indexed" value="1,284" detail="Pages in Google" /><Metric title="Warnings" value="26" detail="Duplicate meta" /><Metric title="CTR" value="4.8%" detail="30 days" /><Metric title="SEO leads" value="318" detail="Candidate signups" /></div>
        </section>
      </div>
    </>
  );
}

export function AdminSalesPage() {
  const deals = ["Nexa Fintech - Growth renewal", "CloudBridge - Enterprise trial", "ShopGrid - Refund review", "Orbit Commerce - Seat expansion", "VectorMind - Annual invoice"];
  return (
    <>
      <PageHeader
        eyebrow="Admin Sales"
        title="Sales CRM, plans, invoices and employer lifecycle"
        description="Theo dõi lead nhà tuyển dụng, gói dịch vụ, pipeline sales, hóa đơn, hoàn tiền và handoff sang support."
        actions={<button className="primary-button"><WalletCards size={15} /> Create invoice</button>}
      />
      <div className="admin-dashboard-row">
        <section className="panel admin-chart-card">
          <PanelHeader icon={<BriefcaseBusiness size={17} />} title="Sales funnel" action="Forecast" />
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={salesFunnel} layout="vertical" margin={{ left: 8, right: 18 }}>
              <CartesianGrid horizontal={false} stroke="#ececf2" />
              <XAxis type="number" hide />
              <YAxis dataKey="stage" type="category" axisLine={false} tickLine={false} tick={{ fill: "#535867", fontSize: 11 }} width={70} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="count" fill="#574bf5" radius={[0, 8, 8, 0]} barSize={18} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </section>
        <section className="panel admin-chart-card">
          <PanelHeader icon={<Banknote size={17} />} title="Plan revenue" action="Ledger" />
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={revenueByPlan}>
              <CartesianGrid vertical={false} stroke="#ececf2" strokeDasharray="5 5" />
              <XAxis dataKey="plan" axisLine={false} tickLine={false} tick={{ fill: "#858897", fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#858897", fontSize: 11 }} width={42} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="#10a778" strokeWidth={2.4} fill="#e8f8ef" isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </section>
      </div>
      <div className="finance-grid">
        <section className="panel table-panel">
          <PanelHeader icon={<BriefcaseBusiness size={17} />} title="Deal pipeline" action="Add deal" />
          {deals.map((deal, index) => (
            <div className="post-row" key={deal}>
              <div><strong>{deal}</strong><span>{["Proposal", "Negotiation", "Refund", "Expansion", "Invoice sent"][index]}</span></div>
              <span className={index === 2 ? "status-pill yellow" : "status-pill green"}>${[149, 399, 49, 199, 149][index]}</span>
            </div>
          ))}
        </section>
        <section className="panel">
          <PanelHeader icon={<Banknote size={17} />} title="Revenue controls" action="Open ledger" />
          <div className="resource-grid"><Metric title="MRR" value="$42.8k" detail="+11% MoM" /><Metric title="Trial conversion" value="18%" detail="Growth plan highest" /><Metric title="Refund risk" value="4" detail="Need approval" /><Metric title="AR overdue" value="$2.1k" detail="3 invoices" /></div>
        </section>
      </div>
    </>
  );
}

export function AdminAuditPage() {
  const events = Array.from({ length: 24 }, (_, index) => ({
    actor: ["Super Admin", "Admin SEO", "Admin Sales", "Admin kiểm duyệt"][index % 4],
    action: ["role.permission.updated", "seo.page.published", "invoice.refund.requested", "post.hidden"][index % 4],
    time: `${index + 1}h ago`,
  }));
  return (
    <>
      <PageHeader
        eyebrow="Admin"
        title="Audit logs, security events and compliance trail"
        description="Ghi lại mọi thay đổi quyền, kiểm duyệt, billing, SEO publish và truy cập dữ liệu nhạy cảm."
        actions={<button className="primary-button"><ScrollText size={15} /> Export audit</button>}
      />
      <div className="admin-dashboard-row">
        <section className="panel admin-chart-card">
          <PanelHeader icon={<ScrollText size={17} />} title="Audit event volume" action="Risk filter" />
          <ResponsiveContainer width="100%" height={230}>
            <LineChart data={auditTrend}>
              <CartesianGrid vertical={false} stroke="#ececf2" strokeDasharray="5 5" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#858897", fontSize: 11 }} />
              <YAxis hide />
              <Tooltip content={<ChartTooltip />} />
              <Line type="monotone" dataKey="events" stroke="#3b82f6" strokeWidth={2.4} dot={false} isAnimationActive={false} />
              <Line type="monotone" dataKey="risk" stroke="#ef4444" strokeWidth={2.4} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </section>
        <section className="panel admin-chart-card">
          <PanelHeader icon={<LockKeyhole size={17} />} title="Sensitive actions" action="Policy" />
          <div className="reason-bars">
            {["role.permission.updated", "billing.refund.approved", "candidate.export", "post.restore", "ai.policy.changed"].map((item, index) => (
              <div key={item}><span>{item}</span><b style={{ width: `${88 - index * 13}%` }} /></div>
            ))}
          </div>
        </section>
      </div>
      <section className="panel">
        <PanelHeader icon={<ScrollText size={17} />} title="Audit event stream" action="Filter" />
        <div className="audit-list">
          {events.map((event, index) => (
            <div className="audit-row" key={`${event.action}-${index}`}>
              <Avatar name={event.actor} index={index} />
              <div><strong>{event.action}</strong><span>{event.actor} • IP 14.241.20.{index + 10} • {event.time}</span></div>
              <span className={index % 5 === 0 ? "status-pill yellow" : "status-pill green"}>{index % 5 === 0 ? "Review" : "Verified"}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

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

const moderationItems = ["Junior Tester - nghi thu phí", "Remote DevOps - từ khóa bị cấm", "React Lead - khiếu nại hợp lệ", "Data Intern - lách luật"];
const permissionGroups = [
  ["Người dùng", ["user.read", "user.lock", "user.export"]],
  ["Nhà tuyển dụng", ["employer.verify", "employer.lock", "billing.refund"]],
  ["Nội dung", ["post.moderate", "seo.edit", "blog.publish"]],
  ["Sales", ["lead.read", "deal.update", "invoice.view"]],
  ["Hệ thống", ["role.create", "audit.read", "ai.configure"]],
];
const adminRoles = [
  { name: "Super Admin", owner: "CEO / CTO", enabled: 15, scope: "Toàn nền tảng" },
  { name: "Admin SEO", owner: "Marketing Lead", enabled: 4, scope: "SEO, blog, landing page" },
  { name: "Admin Sales", owner: "Sales Ops", enabled: 6, scope: "Lead, deal, hóa đơn" },
  { name: "Admin kiểm duyệt", owner: "Trust & Safety", enabled: 5, scope: "Tin đăng, khiếu nại, từ khóa cấm" },
  { name: "Admin Support", owner: "CS Lead", enabled: 7, scope: "Ticket, tài khoản, xem hoàn tiền" },
];

const adminGrowth = [
  { day: "T2", candidates: 1840, employers: 320, posts: 92 },
  { day: "T3", candidates: 2110, employers: 380, posts: 108 },
  { day: "T4", candidates: 2380, employers: 410, posts: 126 },
  { day: "T5", candidates: 2660, employers: 460, posts: 144 },
  { day: "T6", candidates: 2920, employers: 520, posts: 161 },
  { day: "T7", candidates: 3180, employers: 570, posts: 148 },
  { day: "CN", candidates: 3420, employers: 610, posts: 176 },
];

const revenueByPlan = [
  { plan: "Dùng thử", revenue: 0, accounts: 420 },
  { plan: "Khởi đầu", revenue: 9800, accounts: 186 },
  { plan: "Tăng trưởng", revenue: 24800, accounts: 142 },
  { plan: "Doanh nghiệp", revenue: 8200, accounts: 18 },
];

const roleDistribution = [
  { name: "Ứng viên", value: 72, color: "#3b82f6" },
  { name: "Nhà tuyển dụng", value: 21, color: "#10a778" },
  { name: "Admin", value: 7, color: "#574bf5" },
];

const moderationTrend = [
  { day: "T2", flagged: 18, hidden: 7, restored: 3 },
  { day: "T3", flagged: 24, hidden: 9, restored: 4 },
  { day: "T4", flagged: 19, hidden: 6, restored: 5 },
  { day: "T5", flagged: 31, hidden: 14, restored: 6 },
  { day: "T6", flagged: 27, hidden: 12, restored: 3 },
  { day: "T7", flagged: 22, hidden: 8, restored: 2 },
  { day: "CN", flagged: 34, hidden: 16, restored: 5 },
];

const seoTraffic = [
  { page: "Trang chủ", clicks: 8200, impressions: 64200 },
  { page: "React", clicks: 4860, impressions: 39100 },
  { page: "Lương", clicks: 3420, impressions: 28400 },
  { page: "Công ty", clicks: 2910, impressions: 23600 },
  { page: "Blog", clicks: 2180, impressions: 19700 },
];

const salesFunnel = [
  { stage: "Lead", count: 420 },
  { stage: "Demo", count: 188 },
  { stage: "Dùng thử", count: 112 },
  { stage: "Đã trả phí", count: 54 },
  { stage: "Gia hạn", count: 31 },
];

const auditTrend = [
  { day: "T2", events: 132, risk: 6 },
  { day: "T3", events: 151, risk: 9 },
  { day: "T4", events: 146, risk: 5 },
  { day: "T5", events: 184, risk: 12 },
  { day: "T6", events: 173, risk: 8 },
  { day: "T7", events: 118, risk: 4 },
  { day: "CN", events: 127, risk: 7 },
];

export function AdminDashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Admin"
        title="Trung tâm vận hành nền tảng, doanh thu và sức khỏe AI"
        description="Bảng điều khiển vận hành toàn nền tảng: tăng trưởng ứng viên/nhà tuyển dụng, doanh thu gói, kiểm duyệt, phân quyền và sức khỏe AI."
        actions={<button className="primary-button"><Flag size={15} /> Xem cảnh báo</button>}
      />
      <div className="admin-kpi-grid">
        <InsightCard title="Người dùng mới" value="1,284" icon={UsersRound} color="#3b82f6" note="Ứng viên +18%, nhà tuyển dụng +7%" />
        <InsightCard title="Tin mới" value="386" icon={BriefcaseBusiness} color="#574bf5" note="27 tin chờ kiểm duyệt" />
        <InsightCard title="Doanh thu" value="$42.8k" icon={Banknote} color="#10a778" note="Doanh thu gói dịch vụ 30 ngày" />
        <InsightCard title="Độ trễ AI" value="1.4s" icon={Gauge} color="#f59e0b" note="Match scoring p95" />
      </div>
      <div className="admin-command-grid">
        <section className="panel admin-chart-card wide">
          <PanelHeader icon={<UsersRound size={17} />} title="Tăng trưởng người dùng, nhà tuyển dụng và tin đăng" action="Mở phân tích" />
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
            <Metric title="Tăng trưởng ứng viên" value="+18%" detail="Nguồn organic và referral" />
            <Metric title="Tăng trưởng NTD" value="+7%" detail="Paid acquisition ổn định" />
            <Metric title="Tin mới" value="176" detail="Đỉnh CN, 27 tin chờ duyệt" />
          </div>
        </section>

        <section className="panel admin-chart-card">
          <PanelHeader icon={<UserCheck size={17} />} title="Tỷ trọng nhóm người dùng" action="Vai trò" />
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
          <PanelHeader icon={<Banknote size={17} />} title="Doanh thu theo gói" action="Tài chính" />
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
          <PanelHeader icon={<ShieldAlert size={17} />} title="Khối lượng kiểm duyệt" action="Hàng đợi" />
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
          <PanelHeader icon={<AlertTriangle size={17} />} title="Cảnh báo hệ thống" action="Mở hàng đợi" />
          {["Tin tuyển dụng chứa từ ngữ lách luật", "Nhà tuyển dụng có điểm uy tín dưới 50", "Độ trễ AI matching vượt ngưỡng 1.8s", "Yêu cầu hoàn tiền cần 2 người phê duyệt"].map((alert) => <div className="alert-row" key={alert}><AlertTriangle size={15} /><span>{alert}</span></div>)}
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
        title="Kiểm duyệt tin tuyển dụng và từ khóa cấm"
        description="Quét tự động phát hiện nội dung vi phạm, ẩn/mở bài có lý do dropdown, hỗ trợ khiếu nại bằng chứng hợp lệ."
        actions={<button className="primary-button"><RefreshCw size={15} /> Quét lại toàn bộ tin</button>}
      />
      <div className="admin-kpi-grid compact">
        <InsightCard title="Gắn cờ hôm nay" value="34" icon={ShieldAlert} color="#f59e0b" note="16 tự ẩn, 5 khiếu nại" />
        <InsightCard title="Dương tính giả" value="8%" icon={CheckCircle2} color="#10a778" note="Mục tiêu dưới 10%" />
        <InsightCard title="Thời gian xem xét TB" value="18 phút" icon={Gauge} color="#3b82f6" note="P95 dưới 45 phút" />
        <InsightCard title="Tín hiệu cấm" value="142" icon={Flag} color="#ef4444" note="Phí, đặt cọc, lương ảo" />
      </div>
      <div className="admin-dashboard-row">
        <section className="panel admin-chart-card">
          <PanelHeader icon={<ShieldAlert size={17} />} title="Xu hướng kiểm duyệt" action="7 ngày gần nhất" />
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
          <PanelHeader icon={<Flag size={17} />} title="Phân bổ lý do" action="Quy tắc" />
          <div className="reason-bars">
            {["Lừa đảo đặt cọc", "Lương ảo", "Từ khóa cấm", "Tin trùng lặp", "Thiếu xác thực công ty"].map((item, index) => (
              <div key={item}><span>{item}</span><b style={{ width: `${82 - index * 12}%` }} /></div>
            ))}
          </div>
        </section>
      </div>
      <div className="moderation-grid">
        <section className="panel table-panel">
          <PanelHeader icon={<ShieldAlert size={17} />} title="Hàng đợi kiểm duyệt" action="Dropdown lý do" onAction={() => setSelectedCase(moderationItems[0])} />
          {moderationItems.map((item, index) => (
            <div className="post-row" key={item}>
              <div><strong>{item}</strong><span>{index % 2 ? "Tự động ẩn, đã báo nhà tuyển dụng" : "Cần admin quyết định"}</span></div>
              <span className={index % 2 ? "status-pill red" : "status-pill yellow"}>{index % 2 ? "Đã ẩn" : "Cần xem"}</span>
              <button className="secondary-button small" onClick={() => setSelectedCase(item)}>Mở</button>
            </div>
          ))}
        </section>
        <section className="panel">
          <PanelHeader icon={<Flag size={17} />} title="Thư viện từ khóa cấm" action="Thêm từ" />
          <div className="word-cloud">{["phí giữ chỗ", "cam kết lương ảo", "không hợp đồng", "thu hộ", "né thuế", "đặt cọc"].map((word) => <span key={word}>{word}</span>)}</div>
          <AuthNotice>Khi danh sách cập nhật, hệ thống quét lại toàn bộ bài đăng và gửi lý do xóa tới nhà tuyển dụng.</AuthNotice>
        </section>
      </div>
      {selectedCase && (
        <Modal title="Quyết định kiểm duyệt" onClose={() => setSelectedCase(null)}>
          <div className="reason-box"><strong>{selectedCase}</strong><p>Admin phải chọn lý do chuẩn để hệ thống lưu trữ và gửi thông báo cho nhà tuyển dụng.</p></div>
          <div className="form-grid"><Field label="Quyết định" value="Ẩn tin và thông báo nhà tuyển dụng" /><Field label="Dropdown lý do" value="Nội dung chứa từ ngữ không phù hợp hoặc vi phạm chính sách" /></div>
          <div className="modal-actions"><button className="secondary-button">Yêu cầu bằng chứng</button><button className="secondary-button">Khôi phục tin</button><button className="primary-button">Ẩn và gửi lý do</button></div>
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
        title="Nhà tuyển dụng, ứng viên, gói dịch vụ và vai trò admin"
        description="Giám sát nhà tuyển dụng, ứng viên, gói dịch vụ, hóa đơn, hoàn tiền và phân quyền admin phụ."
        actions={<button className="primary-button"><Plus size={15} /> Thêm admin phụ</button>}
      />
      <div className="admin-dashboard-row">
        <section className="panel admin-chart-card">
          <PanelHeader icon={<Banknote size={17} />} title="Doanh thu gói và tài khoản hoạt động" action="Xuất dữ liệu" />
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
          <PanelHeader icon={<UsersRound size={17} />} title="Tăng trưởng tài khoản" action="Phân khúc" />
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
          <PanelHeader icon={<BriefcaseBusiness size={17} />} title="Tài khoản nhà tuyển dụng" action="Khóa / mở khóa" />
          {["Nexa Fintech - 92 trust", "CloudBridge Labs - 86 trust", "NewSoft Co - 54 trust", "Risky Hiring - 28 trust"].map((item, index) => (
            <div className="post-row" key={item}>
              <div><strong>{item}</strong><span>{index < 2 ? "Đang dùng gói Pro" : index === 2 ? "Bị giới hạn tính năng" : "Tạm khóa"}</span></div>
              <span className={index === 3 ? "status-pill red" : index === 2 ? "status-pill yellow" : "status-pill green"}>{index === 3 ? "Đã khóa" : "Đang hoạt động"}</span>
            </div>
          ))}
        </section>
        <section className="panel billing-panel">
          <PanelHeader icon={<Banknote size={17} />} title="Gói dịch vụ & hóa đơn" action="Sửa giá" />
          <div className="resource-grid"><Metric title="Khởi đầu" value="$49" detail="30 tin/tháng" /><Metric title="Pro" value="$149" detail="AI + tín dụng đẩy tin" /><Metric title="Doanh nghiệp" value="$399" detail="SLA và hỗ trợ" /><Metric title="Hoàn tiền" value="4" detail="Đã duyệt theo chính sách" /></div>
        </section>
        <section className="panel">
          <PanelHeader icon={<UserCheck size={17} />} title="Vai trò admin phụ" action="Quản lý" />
          {["Admin Sales", "Admin duyệt tin", "Admin hỗ trợ khách hàng"].map((role, index) => <div className="mini-row" key={role}><Avatar name={role} index={index} /><div><strong>{role}</strong><span>{index + 3} quyền đang bật</span></div></div>)}
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
        title="Vai trò động, phân quyền và quản trị admin"
        description="Super Admin tạo nhiều role như Admin SEO, Admin Sales, Admin kiểm duyệt; quyền được bật/tắt theo nhóm và lưu dấu vết audit."
        actions={<button className="primary-button" onClick={() => setIsCreateOpen(true)}><Plus size={15} /> Tạo vai trò</button>}
      />
      <div className="admin-role-layout">
        <section className="panel">
          <PanelHeader icon={<UserCheck size={17} />} title="Vai trò admin" action="Nhân bản vai trò" />
          {adminRoles.map((role, index) => (
            <button className={selectedRole.name === role.name ? "role-row selected" : "role-row"} key={role.name} onClick={() => setSelectedRole(role)}>
              <Avatar name={role.name} index={index} />
              <div><strong>{role.name}</strong><span>{role.scope}</span></div>
              <b>{role.enabled}</b>
            </button>
          ))}
        </section>
        <section className="panel">
          <PanelHeader icon={<LockKeyhole size={17} />} title={`Ma trận quyền ${selectedRole.name}`} action="Lưu policy" />
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
          <PanelHeader icon={<ShieldCheck size={17} />} title="Quy tắc quản trị" action="Sửa" />
          {["role.create bắt buộc Super Admin phê duyệt", "Mọi thay đổi quyền đều ghi audit log", "Hoàn tiền tài chính cần 2 người phê duyệt", "Khiếu nại kiểm duyệt không được tự duyệt"].map((item) => (
            <div className="check-row" key={item}><CheckCircle2 size={15} /><span>{item}</span></div>
          ))}
        </aside>
      </div>
      {isCreateOpen && (
        <Modal title="Tạo vai trò admin động" onClose={() => setIsCreateOpen(false)}>
          <div className="form-grid"><Field label="Tên vai trò" value="Admin SEO Regional" /><Field label="Owner" value="Marketing Lead" /><Field label="Phạm vi" value="Trang SEO, xuất bản blog, sitemap" /><Field label="Phê duyệt" value="Bắt buộc Super Admin" /></div>
          <AuthNotice>Vai trò mới mặc định không có quyền nhạy cảm. Super Admin phải bật từng quyền và lý do được lưu trong audit log.</AuthNotice>
          <div className="modal-actions"><button className="secondary-button">Lưu nháp</button><button className="primary-button">Tạo vai trò</button></div>
        </Modal>
      )}
    </>
  );
}

export function AdminSeoPage() {
  const seoRows = ["Trang chủ /candidate", "Landing việc React", "Danh bạ công ty", "Cẩm nang lương", "Blog: xu hướng tuyển dụng IT", "Sitemap.xml"];
  return (
    <>
      <PageHeader
        eyebrow="Admin SEO"
        title="SEO console, landing page và sức khỏe index"
        description="Quản lý metadata, landing page theo kỹ năng/khu vực, sitemap, canonical, trạng thái index và hàng đợi nội dung cho tuyển dụng IT."
        actions={<button className="primary-button"><Globe2 size={15} /> Xuất bản thay đổi SEO</button>}
      />
      <div className="admin-dashboard-row">
        <section className="panel admin-chart-card">
          <PanelHeader icon={<Globe2 size={17} />} title="Click organic và impression" action="Search Console" />
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
          <PanelHeader icon={<FileSearch size={17} />} title="Bản đồ lỗi SEO" action="Hàng đợi sửa lỗi" />
          <div className="reason-bars">
            {["Meta trùng lặp", "Thiếu canonical", "Mobile LCP chậm", "Cảnh báo noindex", "Nội dung mỏng"].map((item, index) => (
              <div key={item}><span>{item}</span><b style={{ width: `${74 - index * 10}%` }} /></div>
            ))}
          </div>
        </section>
      </div>
      <div className="seo-grid">
        <section className="panel table-panel">
          <PanelHeader icon={<FileSearch size={17} />} title="Kho trang SEO" action="Chạy audit" />
          {seoRows.map((row, index) => (
            <div className="post-row" key={row}>
              <div><strong>{row}</strong><span>{index % 2 ? "Cần làm mới meta" : "Đã index và ổn định"}</span></div>
              <span className={index % 2 ? "status-pill yellow" : "status-pill green"}>{index % 2 ? "Cảnh báo" : "Ổn định"}</span>
              <button className="secondary-button small">Mở</button>
            </div>
          ))}
        </section>
        <section className="panel">
          <PanelHeader icon={<Gauge size={17} />} title="Sức khỏe index" action="Chi tiết" />
          <div className="resource-grid"><Metric title="Đã index" value="1,284" detail="Trang trên Google" /><Metric title="Cảnh báo" value="26" detail="Meta trùng lặp" /><Metric title="CTR" value="4.8%" detail="30 ngày" /><Metric title="Lead SEO" value="318" detail="Ứng viên đăng ký" /></div>
        </section>
      </div>
    </>
  );
}

export function AdminSalesPage() {
  const deals = ["Nexa Fintech - Gia hạn Growth", "CloudBridge - Dùng thử Enterprise", "ShopGrid - Review hoàn tiền", "Orbit Commerce - Mở rộng seat", "VectorMind - Hóa đơn năm"];
  return (
    <>
      <PageHeader
        eyebrow="Admin Sales"
        title="Sales CRM, gói dịch vụ, hóa đơn và vòng đời nhà tuyển dụng"
        description="Theo dõi lead nhà tuyển dụng, gói dịch vụ, pipeline sales, hóa đơn, hoàn tiền và bàn giao sang hỗ trợ."
        actions={<button className="primary-button"><WalletCards size={15} /> Tạo hóa đơn</button>}
      />
      <div className="admin-dashboard-row">
        <section className="panel admin-chart-card">
          <PanelHeader icon={<BriefcaseBusiness size={17} />} title="Funnel sales" action="Dự báo" />
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
          <PanelHeader icon={<Banknote size={17} />} title="Doanh thu gói" action="Sổ cái" />
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
          <PanelHeader icon={<BriefcaseBusiness size={17} />} title="Pipeline deal" action="Thêm deal" />
          {deals.map((deal, index) => (
            <div className="post-row" key={deal}>
              <div><strong>{deal}</strong><span>{["Đề xuất", "Đàm phán", "Hoàn tiền", "Mở rộng", "Đã gửi hóa đơn"][index]}</span></div>
              <span className={index === 2 ? "status-pill yellow" : "status-pill green"}>${[149, 399, 49, 199, 149][index]}</span>
            </div>
          ))}
        </section>
        <section className="panel">
          <PanelHeader icon={<Banknote size={17} />} title="Kiểm soát doanh thu" action="Mở sổ cái" />
          <div className="resource-grid"><Metric title="MRR" value="$42.8k" detail="+11% MoM" /><Metric title="Chuyển đổi trial" value="18%" detail="Gói Growth cao nhất" /><Metric title="Rủi ro hoàn tiền" value="4" detail="Cần phê duyệt" /><Metric title="AR quá hạn" value="$2.1k" detail="3 hóa đơn" /></div>
        </section>
      </div>
    </>
  );
}

export function AdminAuditPage() {
  const events = Array.from({ length: 24 }, (_, index) => ({
    actor: ["Super Admin", "Admin SEO", "Admin Sales", "Admin kiểm duyệt"][index % 4],
    action: ["role.permission.updated", "seo.page.published", "invoice.refund.requested", "post.hidden"][index % 4],
    time: `${index + 1} giờ trước`,
  }));
  return (
    <>
      <PageHeader
        eyebrow="Admin"
        title="Audit log, sự kiện bảo mật và dấu vết compliance"
        description="Ghi lại mọi thay đổi quyền, kiểm duyệt, thanh toán, xuất bản SEO và truy cập dữ liệu nhạy cảm."
        actions={<button className="primary-button"><ScrollText size={15} /> Xuất audit</button>}
      />
      <div className="admin-dashboard-row">
        <section className="panel admin-chart-card">
          <PanelHeader icon={<ScrollText size={17} />} title="Khối lượng sự kiện audit" action="Lọc rủi ro" />
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
          <PanelHeader icon={<LockKeyhole size={17} />} title="Hành động nhạy cảm" action="Policy" />
          <div className="reason-bars">
            {["role.permission.updated", "billing.refund.approved", "candidate.export", "post.restore", "ai.policy.changed"].map((item, index) => (
              <div key={item}><span>{item}</span><b style={{ width: `${88 - index * 13}%` }} /></div>
            ))}
          </div>
        </section>
      </div>
      <section className="panel">
        <PanelHeader icon={<ScrollText size={17} />} title="Luồng sự kiện audit" action="Lọc" />
        <div className="audit-list">
          {events.map((event, index) => (
            <div className="audit-row" key={`${event.action}-${index}`}>
              <Avatar name={event.actor} index={index} />
              <div><strong>{event.action}</strong><span>{event.actor} • IP 14.241.20.{index + 10} • {event.time}</span></div>
              <span className={index % 5 === 0 ? "status-pill yellow" : "status-pill green"}>{index % 5 === 0 ? "Cần xem" : "Đã xác thực"}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

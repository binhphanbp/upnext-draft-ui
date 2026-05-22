import { useState } from "react";
import { AlertTriangle, Banknote, BriefcaseBusiness, Flag, Gauge, Plus, RefreshCw, ShieldAlert, UserCheck, UsersRound } from "lucide-react";
import { AuthNotice, Avatar, Field, InsightCard, Metric, Modal, PageHeader, PanelHeader } from "../../components/ui";

const moderationItems = ["Junior Tester - suspicious fee", "Remote DevOps - banned keyword", "React Lead - clean appeal", "Data Intern - lách luật"];

export function AdminDashboardPage() {
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
        <section className="panel"><PanelHeader icon={<AlertTriangle size={17} />} title="System alerts" action="Open queue" />{["Tin tuyển dụng chứa từ ngữ lách luật", "Nhà tuyển dụng có trust score dưới 50", "AI matching latency vượt ngưỡng 1.8s"].map((alert) => <div className="alert-row" key={alert}><AlertTriangle size={15} /><span>{alert}</span></div>)}</section>
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

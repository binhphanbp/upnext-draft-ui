import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { BadgeCheck, BriefcaseBusiness, CalendarClock, CalendarDays, Clock3, FileText, Filter, Heart, Mail, PenLine, ShieldCheck, Sparkles, Star, UsersRound, WandSparkles } from "lucide-react";
import { applicantTrend, candidates, chartBars, pipelineSeed, posts } from "../../data";
import type { Candidate, PipelineColumn } from "../../types";
import { AuthNotice, Avatar, ChartTooltip, Field, InsightCard, Metric, Modal, PageHeader, PanelHeader, ScoreRing } from "../../components/ui";

export function EmployerDashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Employer"
        title="Recruitment report"
        description="Command center cho nhà tuyển dụng: nguồn ứng viên, ranking, interview, offer, trust score và hiệu quả AI."
        actions={<><button className="date-button">1 Jan, 2026</button><button className="secondary-button">Export</button></>}
      />
      <section className="panel hero-chart">
        <PanelHeader icon={<UsersRound size={17} />} title="Candidate flow" action="Details" />
        <div className="hero-kpi"><strong>82</strong><span className="trend">↗ 12% <em>vs previous period</em></span></div>
        <div className="bar-chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartBars}>
              <CartesianGrid vertical={false} stroke="#ececf2" />
              <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#808497", fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#808497", fontSize: 11 }} />
              <Tooltip content={<ChartTooltip />} cursor={false} />
              <Bar dataKey="female" fill="#f6a311" radius={[8, 8, 0, 0]} maxBarSize={14} />
              <Bar dataKey="male" fill="#3196ec" radius={[8, 8, 0, 0]} maxBarSize={14} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="hero-summary">
          <Metric title="Active jobs" value="36" detail="7 boosted posts" />
          <Metric title="CV received" value="1,284" detail="128 new this week" />
          <Metric title="High match CVs" value="248" detail="Score 85+" />
          <Metric title="Interviews" value="18" detail="6 waiting reply" />
          <Metric title="Offers" value="7" detail="3 negotiating" />
          <Metric title="Trust score" value="86" detail="Trusted employer" />
        </div>
      </section>
      <div className="dashboard-grid">
        <ApplicationsPanel />
        <TrustPanel />
        <AiOperationsPanel />
      </div>
    </>
  );
}

export function EmployerJobsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Employer"
        title="Create, boost and renew job posts"
        description="Đăng tin với editor, AI draft, quản lý trạng thái hoạt động/hết hạn/bị khóa và tài nguyên đẩy tin."
        actions={<><button className="secondary-button"><WandSparkles size={15} /> AI draft</button><button className="primary-button"><PenLine size={15} /> Create post</button></>}
      />
      <div className="jobs-grid">
        <section className="panel editor-panel">
          <PanelHeader icon={<PenLine size={17} />} title="Job editor" action="Preview" />
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
          {posts.map((post) => (
            <div className="post-row" key={post.title}>
              <div><strong>{post.title}</strong><span>{post.views} views • {post.cvs} CVs</span></div>
              <span className={post.status === "Locked" ? "status-pill red" : post.status === "Boosting" ? "status-pill purple" : "status-pill green"}>{post.status}</span>
              <span>{post.expiry}</span>
              <button className="secondary-button small">{post.status === "Expired" ? "Renew" : "Boost"}</button>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

export function EmployerCandidatesPage() {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate>(candidates[0]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  return (
    <>
      <PageHeader
        eyebrow="Employer"
        title="Ranking table and candidate bank"
        description="AI tự động chấm điểm theo JD/CV, giải thích lý do phù hợp và hỗ trợ đổi trạng thái hàng loạt."
        actions={<><button className="secondary-button"><Filter size={15} /> Skills / years / job</button><button className="primary-button"><Sparkles size={15} /> Re-score CVs</button></>}
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
            <div><h2>{selectedCandidate.name}</h2><span>{selectedCandidate.role} • {selectedCandidate.salary} • Ho Chi Minh</span></div>
            <ScoreRing label="Match" value={selectedCandidate.match} />
          </div>
          <div className="preview-actions">
            <button className="primary-button small"><CalendarClock size={14} /> Schedule</button>
            <button className="secondary-button small"><Heart size={14} /> Talent pool</button>
            <button className="secondary-button small"><Mail size={14} /> Message</button>
          </div>
          <div className="reason-box"><strong>AI reason</strong><p>{selectedCandidate.reason}</p></div>
          <div className="match-reasons compact">
            <div><strong>Skill</strong><p>50% weight: {selectedCandidate.skills.join(", ")}</p></div>
            <div><strong>Experience</strong><p>30% weight: {selectedCandidate.exp}, product delivery evidence.</p></div>
            <div><strong>Other</strong><p>20% weight: salary, location, language and availability.</p></div>
          </div>
          <div className="resume-paper">
            <h3>Experience</h3><p>B2B SaaS dashboards, charting, permission-based workflows, interview-ready communication.</p>
            <h3>Skills</h3><p>{selectedCandidate.skills.join(", ")}, system design, testing.</p>
          </div>
        </section>
      </div>
      {isDetailOpen && (
        <Modal title="Candidate profile review" onClose={() => setIsDetailOpen(false)}>
          <div className="field-table">
            {[`Applied job: ${selectedCandidate.job}`, `Current stage: ${selectedCandidate.stage}`, `Top skills: ${selectedCandidate.skills.join(", ")}`, `AI reason: ${selectedCandidate.reason}`].map((item) => <p key={item}>{item}</p>)}
          </div>
          <div className="modal-actions"><button className="secondary-button">Reject with reason</button><button className="secondary-button">Move to shortlist</button><button className="primary-button">Schedule interview</button></div>
        </Modal>
      )}
    </>
  );
}

export function EmployerPipelinePage() {
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
        if (column.id === dragged.columnId) return { ...column, items: column.items.filter((item) => item.id !== dragged.itemId) };
        if (column.id === targetColumnId) return { ...column, items: [{ ...movingItem, sla: targetColumnId === "interview" ? "Needs schedule" : movingItem.sla }, ...column.items] };
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
        description="Kéo thả candidate giữa các cột; khi chuyển hẹn phỏng vấn, hệ thống bắt buộc nhập lịch và kiểm soát tối đa 2 vòng lặp."
        actions={<button className="primary-button" onClick={() => setScheduleOpen(true)}><CalendarClock size={15} /> Schedule interview</button>}
      />
      <div className="pipeline-board">
        {columns.map((column) => (
          <section className={dragged ? "pipeline-column is-droppable" : "pipeline-column"} key={column.id} onDragOver={(event) => event.preventDefault()} onDrop={() => moveCard(column.id)}>
            <div className="pipeline-head" style={{ "--column-color": column.color, "--column-bg": column.bg } as React.CSSProperties}><span>{column.title}</span><b>{column.items.length}</b></div>
            {column.items.map((card) => (
              <article className="pipeline-card" key={card.id} draggable onDragStart={() => setDragged({ columnId: column.id, itemId: card.id })} onDragEnd={() => setDragged(null)}>
                <div className="pipeline-card-top"><strong>{card.title}</strong><b>{card.match}</b></div>
                <span><Clock3 size={12} /> {card.sla}</span>
                <p>{card.person}</p>
                <div className="skill-list"><i>{card.tag}</i></div>
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
      {scheduleOpen && <ScheduleModal onClose={() => setScheduleOpen(false)} />}
    </>
  );
}

export function EmployerCompanyPage() {
  return (
    <>
      <PageHeader eyebrow="Employer" title="Company profile, trust score and subscription" description="Bổ sung xác thực để tăng điểm uy tín, theo dõi gói dịch vụ, tài nguyên và hóa đơn." actions={<button className="primary-button"><BadgeCheck size={15} /> Verify company</button>} />
      <div className="company-grid"><TrustPanel wide /><section className="panel"><PanelHeader icon={<ShieldCheck size={17} />} title="Company profile" action="Edit" /><div className="field-table">{["Business license: Verified", "Tax code: 0318 884 209", "Address: 12 Nguyen Hue, District 1", "Response SLA: 88% within 24h"].map((item) => <p key={item}>{item}</p>)}</div></section></div>
    </>
  );
}

function RankingPanel({ selectedName, onSelect }: { selectedName: string; onSelect: (candidate: Candidate) => void }) {
  return (
    <section className="panel ranking-panel">
      <PanelHeader icon={<Star size={17} />} title="Match Score Ranking" action="Bulk status" />
      <div className="ranking-table">
        <div className="ranking-head"><span>Candidate</span><span>Applied Job</span><span>Skills</span><span>Score</span><span>Stage</span></div>
        {candidates.map((candidate, index) => (
          <button className={selectedName === candidate.name ? "ranking-row selected" : "ranking-row"} key={candidate.name} onClick={() => onSelect(candidate)}>
            <div className="person-cell"><Avatar name={candidate.name} index={index} /><div><strong>{candidate.name}</strong><span>{candidate.role} • {candidate.exp}</span></div></div>
            <span>{candidate.job}</span>
            <div className="skill-list">{candidate.skills.slice(0, 2).map((skill) => <i key={skill}>{skill}</i>)}</div>
            <div className="score-bar"><b>{candidate.match}</b><span><i style={{ width: `${candidate.match}%` }} /></span></div>
            <span className="status-pill">{candidate.stage}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function ApplicationsPanel() {
  return (
    <section className="panel chart-panel">
      <PanelHeader icon={<TrendingUpIcon />} title="Applications & Shortlist" action="Details" />
      <ResponsiveContainer width="100%" height={210}>
        <LineChart data={applicantTrend} margin={{ left: -16, right: 10, top: 10 }}>
          <CartesianGrid vertical={false} stroke="#ececf2" strokeDasharray="5 5" />
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#858897", fontSize: 11 }} />
          <YAxis hide domain={[0, 90]} />
          <Tooltip content={<ChartTooltip />} />
          <Line type="monotone" dataKey="applied" stroke="#3196ec" strokeWidth={2.5} dot={false} />
          <Line type="monotone" dataKey="shortlist" stroke="#2faf72" strokeWidth={2.5} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}

function TrustPanel({ wide = false }: { wide?: boolean }) {
  return (
    <section className={wide ? "panel trust-panel wide" : "panel trust-panel"}>
      <PanelHeader icon={<ShieldCheck size={17} />} title="Employer Trust Score" action="Improve" />
      <div className="trust-score"><strong>86</strong><span>Doanh nghiệp tin cậy</span></div>
      <div className="trust-meter"><span style={{ width: "86%" }} /></div>
      <div className="trust-list"><p>Business license verified (+12)</p><p>Positive candidate reviews (+8)</p><p>Response SLA needs attention (-4)</p></div>
    </section>
  );
}

function AiOperationsPanel() {
  return (
    <section className="panel ai-panel">
      <PanelHeader icon={<WandSparkles size={17} />} title="AI Operations" action="Configure" />
      {["AI viết tin tuyển dụng", "Match Score Ranking", "Chatbot hỗ trợ"].map((title) => <div className="ai-action" key={title}><Sparkles size={16} /><div><strong>{title}</strong><span>Configured for IT recruitment workflow.</span></div></div>)}
    </section>
  );
}

function ScheduleModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal title="Schedule interview" onClose={onClose}>
      <div className="form-grid"><Field label="Candidate" value="Nguyen Minh Khoa" /><Field label="Round" value="Technical Interview - Loop 1/2" /><Field label="Date" value="24 May 2026" /><Field label="Time" value="09:00 - 10:00" /></div>
      <AuthNotice>Nếu ứng viên từ chối và đề xuất lịch khác, hệ thống chỉ cho phép tối đa 2 vòng gửi lại để tránh spam.</AuthNotice>
      <div className="modal-actions"><button className="secondary-button">Save draft</button><button className="primary-button">Send invite + email</button></div>
    </Modal>
  );
}

function TrendingUpIcon() {
  return <Sparkles size={17} />;
}

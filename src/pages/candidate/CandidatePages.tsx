import {
  Bell,
  Bot,
  Building2,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  FileText,
  Heart,
  Lock,
  Mail,
  MapPin,
  Mic,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Target,
  TrendingUp,
  WandSparkles,
  WalletCards,
} from "lucide-react";
import { companies, jobs } from "../../data";
import { Field, Metric, PageHeader, PanelHeader, Avatar, InsightCard } from "../../components/ui";

const applicationSteps = ["Submitted", "Viewed", "Shortlisted", "Interview", "Offer"];
const savedJobs = Array.from({ length: 28 }, (_, index) => {
  const job = jobs[index % jobs.length];
  return {
    ...job,
    savedAt: `${index + 1}d ago`,
    alert: index % 4 === 0 ? "Salary updated" : index % 3 === 0 ? "Company viewed CV" : "Saved",
  };
});

const salaryRows = [
  ["Frontend Senior", "$2,400", "$3,200", "$4,600", "+18%"],
  ["Backend Node.js", "$2,100", "$3,000", "$4,200", "+14%"],
  ["DevOps/SRE", "$2,300", "$3,400", "$5,000", "+21%"],
  ["QA Automation", "$1,500", "$2,300", "$3,400", "+11%"],
  ["AI Product Engineer", "$2,800", "$4,100", "$6,200", "+29%"],
];

const messageThreads = [
  ["Nexa Fintech", "Confirm technical interview Friday 09:00", "Unread", "9m"],
  ["CloudBridge Labs", "We reviewed your CV and want a system design call", "Open", "1h"],
  ["UpNext AI Coach", "Your React Lead CV can improve match by 7%", "Action", "Today"],
  ["Orbit Commerce", "Thanks for applying. DevOps role moved to shortlist", "Open", "Yesterday"],
];

export function CandidateProfilePage() {
  return (
    <>
      <PageHeader
        eyebrow="Candidate"
        title="Profile, CV storage and default resume"
        description="Quản lý hồ sơ cá nhân, nhiều CV PDF/DOCX, CV tạo trong hệ thống, hồ sơ mặc định và trạng thái đang tìm việc/ngừng tìm việc."
        actions={<><button className="secondary-button"><RefreshCw size={15} /> Stop looking</button><button className="primary-button">Create CV</button></>}
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
            {["Bằng cấp: Bachelor of Software Engineering", "Kỹ năng: React, TypeScript, Next.js, Design System", "Kinh nghiệm: Fintech dashboard, B2B SaaS, realtime products", "Giới tính: Nam • Ảnh đại diện: Đã cập nhật"].map((item) => <p key={item}>{item}</p>)}
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

export function CandidateApplicationsPage() {
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
          {jobs.slice(0, 4).map((job, jobIndex) => (
            <article className="application-card" key={job.title}>
              <div>
                <h3>{job.title}</h3>
                <span>{job.company} • Last update {jobIndex + 2} days ago</span>
              </div>
              <div className="timeline">
                {applicationSteps.map((step, index) => (
                  <span className={index <= 2 + (jobIndex % 2) ? "done" : ""} key={step}>
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
              <div className="date-chip"><span>Fri</span><b>24</b></div>
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
        </aside>
      </div>
    </>
  );
}

export function CandidateSavedJobsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Candidate"
        title="Saved jobs, alerts and quick-apply queue"
        description="Quản lý job đã lưu, cảnh báo lương/công ty xem CV, nhắc hạn apply và nhóm theo career track."
        actions={<><button className="secondary-button"><Bell size={15} /> Alert rules</button><button className="primary-button"><Search size={15} /> Find similar jobs</button></>}
      />
      <div className="job-market-strip">
        <InsightCard title="Saved jobs" value="28" icon={Heart} color="#ef4444" note="18 still open, 6 closing this week" />
        <InsightCard title="Salary alerts" value="7" icon={TrendingUp} color="#10a778" note="Jobs raised max salary above target" />
        <InsightCard title="Company views" value="11" icon={Building2} color="#3b82f6" note="Employers viewed your default CV" />
        <InsightCard title="Quick apply ready" value="22" icon={CheckCircle2} color="#574bf5" note="CV and cover letter prepared" />
      </div>
      <div className="two-column-layout">
        <section className="panel">
          <PanelHeader icon={<Heart size={17} />} title="Saved job queue" action="Bulk apply" />
          <div className="search-strip">
            <Field label="Track" value="Frontend, Backend, DevOps" />
            <Field label="Status" value="Open, salary updated, viewed CV" />
            <Field label="Deadline" value="Closing in 7 days" />
            <Field label="Location" value="Remote / Hybrid" />
          </div>
          <div className="dense-list scroll-list">
            {savedJobs.map((job, index) => (
              <article className="job-compact-row" key={`${job.title}-${index}`}>
                <div className="company-dot">{job.company.charAt(0)}</div>
                <div>
                  <strong>{job.title}</strong>
                  <span>{job.company} • {job.model} • {job.place} • saved {job.savedAt}</span>
                  <div className="skill-list">{job.tags.map((tag) => <i key={tag}>{tag}</i>)}</div>
                </div>
                <div className="row-actions">
                  <span className={job.alert === "Salary updated" ? "status-pill green" : "status-pill"}>{job.alert}</span>
                  <button className="primary-button small">Apply</button>
                </div>
              </article>
            ))}
          </div>
        </section>
        <aside className="panel">
          <PanelHeader icon={<SlidersHorizontal size={17} />} title="Saved filters" action="Edit" />
          {["React remote $3k+", "Fintech frontend lead", "DevOps/SRE hybrid", "AI product engineer"].map((filter, index) => (
            <div className="mini-row" key={filter}>
              <Avatar name={filter} index={index} />
              <div><strong>{filter}</strong><span>{12 + index * 4} new jobs this week</span></div>
              <button className="status-pill green">On</button>
            </div>
          ))}
        </aside>
      </div>
    </>
  );
}

export function CandidateCompaniesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Candidate"
        title="Trusted IT companies and employer transparency"
        description="Theo dõi công ty, trust score, tốc độ phản hồi, review ứng viên, job đang mở và cảnh báo công ty rủi ro."
        actions={<button className="primary-button"><Building2 size={15} /> Follow companies</button>}
      />
      <div className="company-directory-grid">
        {companies.concat(companies).map((company, index) => (
          <article className="company-card" key={`${company.name}-${index}`}>
            <div className="company-card-head">
              <div className="company-dot">{company.name.charAt(0)}</div>
              <div><strong>{company.name}</strong><span>{company.field} • {company.followers + index * 73} followers</span></div>
              <span className={company.trust > 85 ? "status-pill green" : "status-pill yellow"}>Trust {company.trust}</span>
            </div>
            <div className="resource-grid compact">
              <Metric title="Open jobs" value={`${company.jobs + index}`} detail="IT hiring" />
              <Metric title="Response" value={`${88 - index}%`} detail="within 24h" />
            </div>
            <div className="button-row"><button className="secondary-button small"><Heart size={14} /> Follow</button><button className="primary-button small">View jobs</button></div>
          </article>
        ))}
      </div>
    </>
  );
}

export function CandidateSalaryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Candidate"
        title="IT salary guide, skill demand and negotiation helper"
        description="Benchmark lương theo role, seniority, location, remote/hybrid và kỹ năng để ứng viên đặt expectation thực tế."
        actions={<><button className="secondary-button"><WalletCards size={15} /> Export benchmark</button><button className="primary-button"><WandSparkles size={15} /> Negotiate with AI</button></>}
      />
      <div className="job-market-strip">
        <InsightCard title="Median senior FE" value="$3.2k" icon={TrendingUp} color="#10a778" note="HCMC hybrid, 5-7 years" />
        <InsightCard title="Fastest growth" value="AI Product" icon={WandSparkles} color="#574bf5" note="+29% salary demand YoY" />
        <InsightCard title="Remote premium" value="+12%" icon={MapPin} color="#3b82f6" note="Global remote-ready CVs" />
        <InsightCard title="Negotiation gap" value="$420" icon={WalletCards} color="#f59e0b" note="Average accepted uplift" />
      </div>
      <section className="panel">
        <PanelHeader icon={<TrendingUp size={17} />} title="Salary benchmark by IT track" action="Adjust filters" />
        <div className="benchmark-table">
          <div className="benchmark-head"><span>Role</span><span>P25</span><span>Median</span><span>P90</span><span>Trend</span></div>
          {salaryRows.map((row) => (
            <div className="benchmark-row" key={row[0]}>
              {row.map((cell, index) => <span className={index === 4 ? "trend" : ""} key={cell}>{cell}</span>)}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export function CandidateMessagesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Candidate"
        title="Employer messages, interview invites and AI reminders"
        description="Tập trung hội thoại với nhà tuyển dụng, trạng thái đã đọc, lịch phỏng vấn và nhắc phản hồi trong SLA."
        actions={<button className="primary-button"><Mail size={15} /> Compose reply</button>}
      />
      <div className="message-layout">
        <section className="panel">
          <PanelHeader icon={<Mail size={17} />} title="Inbox" action="Mark all read" />
          {messageThreads.map(([sender, message, status, time], index) => (
            <button className={index === 0 ? "message-row selected" : "message-row"} key={sender}>
              <Avatar name={sender} index={index} />
              <div><strong>{sender}</strong><span>{message}</span></div>
              <em>{time}</em>
              <b className={status === "Unread" ? "status-pill purple" : "status-pill"}>{status}</b>
            </button>
          ))}
        </section>
        <section className="panel message-thread">
          <PanelHeader icon={<CalendarClock size={17} />} title="Nexa Fintech thread" action="Attach CV" />
          <div className="chat-window">
            <p className="bot">We would like to schedule a technical interview this Friday at 09:00.</p>
            <p className="user">Friday 09:00 works. Please send calendar invite and interview scope.</p>
            <p className="bot">Invite sent. Scope: React architecture, performance and fintech dashboard cases.</p>
          </div>
          <div className="reply-box"><Field label="Reply draft" value="Thanks, I confirm the interview and will prepare the portfolio links." /><button className="primary-button">Send reply</button></div>
        </section>
      </div>
    </>
  );
}

export function CandidateSettingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Candidate settings"
        title="Privacy, job preferences, notifications and security"
        description="Kiểm soát dữ liệu hồ sơ, visibility với nhà tuyển dụng, kênh thông báo và quyền kết nối OAuth."
        actions={<button className="primary-button"><Settings size={15} /> Save changes</button>}
      />
      <div className="settings-grid">
        <section className="panel">
          <PanelHeader icon={<Target size={17} />} title="Job preferences" action="Reset" />
          {["Remote preferred", "Salary from $2,500", "Hide current company", "Only verified employers"].map((item, index) => (
            <div className="setting-row" key={item}><div><strong>{item}</strong><span>{index % 2 ? "Custom preference" : "Recommended for your CV"}</span></div><button className="status-pill green">On</button></div>
          ))}
        </section>
        <section className="panel">
          <PanelHeader icon={<ShieldCheck size={17} />} title="Privacy & security" action="Open log" />
          {["Email OTP login", "Google connected", "GitHub connected", "Export profile data"].map((item, index) => (
            <div className="setting-row" key={item}><div><strong>{item}</strong><span>{index < 3 ? "Active" : "Available on request"}</span></div><Lock size={16} /></div>
          ))}
        </section>
      </div>
    </>
  );
}

export function CandidateAiPage() {
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
          <PanelHeader icon={<Target size={17} />} title="Key points to improve" action="Apply to CV" />
          {["Quantify dashboard performance impact", "Add experience with PCI/finance data", "Prepare one system design story"].map((item) => (
            <div className="check-row" key={item}><Target size={15} /><span>{item}</span></div>
          ))}
        </section>
      </div>
    </>
  );
}

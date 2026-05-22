import { Bot, CalendarClock, CalendarDays, ClipboardCheck, FileCheck2, FileText, Mic, RefreshCw, Target, WandSparkles } from "lucide-react";
import { jobs } from "../../data";
import { Field, Metric, PageHeader, PanelHeader, Avatar } from "../../components/ui";

const applicationSteps = ["Submitted", "Viewed", "Shortlisted", "Interview", "Offer"];

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

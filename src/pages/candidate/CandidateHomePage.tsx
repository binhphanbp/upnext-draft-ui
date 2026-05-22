import { useState } from "react";
import { Bell, BriefcaseBusiness, Building2, CalendarClock, CheckCircle2, Heart, MapPin, Search, Sparkles, Target, TrendingUp, WandSparkles, Zap } from "lucide-react";
import { companies, jobs } from "../../data";
import { Avatar, Field, InsightCard, Metric, Modal, PageHeader, PanelHeader, ScoreRing } from "../../components/ui";
import type { Job } from "../../types";

export function CandidateHomePage({ navigate }: { navigate: (path: string) => void }) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  return (
    <>
      <PageHeader
        eyebrow="Candidate job portal"
        title="Find IT jobs that fit your CV, goals and timing"
        description="Homepage cho ứng viên: tìm kiếm công việc, gợi ý theo CV, công ty uy tín, xu hướng lương, ngành đang tăng trưởng và quick apply bằng hồ sơ mặc định."
        actions={
          <>
            <button className="secondary-button" onClick={() => navigate("/candidate/applications")}><CalendarClock size={15} /> Hồ sơ đã nộp</button>
            <button className="primary-button"><Sparkles size={15} /> Tìm kiếm AI</button>
          </>
        }
      />

      <section className="job-portal-hero">
        <div className="portal-copy">
          <span className="eyebrow">Default CV: Frontend Lead CV</span>
          <h2>96% match với Senior Frontend Engineer tại Nexa Fintech</h2>
          <p>UpNext ưu tiên job theo 50% kỹ năng, 30% kinh nghiệm và 20% salary/location/language. Ứng viên có thể apply nhanh bằng CV mặc định.</p>
          <div className="portal-search">
            <label><Search size={17} /><input value="React, Node.js, DevOps" readOnly /></label>
            <label><MapPin size={17} /><input value="Ho Chi Minh / Remote" readOnly /></label>
            <button className="primary-button">Search jobs</button>
          </div>
          <div className="quick-tags">
            {["Remote", "Senior", "$2k+", "Fintech", "AI product", "React"].map((tag) => <button key={tag}>{tag}</button>)}
          </div>
        </div>
        <div className="portal-match-card">
          <ScoreRing label="Match" value={96} />
          <Metric title="Ứng tuyển đang theo dõi" value="12" detail="3 lịch phỏng vấn cần phản hồi" />
          <button className="secondary-button">Review default CV</button>
        </div>
      </section>

      <div className="job-market-strip">
        <InsightCard title="Jobs matched" value="326" icon={BriefcaseBusiness} color="#3196ec" note="42 jobs above 85% match" />
        <InsightCard title="Trusted companies" value="84" icon={Building2} color="#2faf72" note="Verified employer score 70+" />
        <InsightCard title="Market trend" value="Frontend +18%" icon={TrendingUp} color="#7a2cf3" note="React, cloud and AI product rising" />
        <InsightCard title="Interview invites" value="3" icon={Bell} color="#f6a311" note="1 invite requires confirmation" />
      </div>

      <section className="portal-section">
        <PanelHeader icon={<Target size={17} />} title="Best matches for your CV" action="View all" />
        <div className="featured-job-grid">
          {jobs.slice(0, 3).map((job) => (
            <article className="featured-job-card" key={job.title}>
              <div className="featured-job-top">
                <div className="company-dot">{job.company.charAt(0)}</div>
                <div>
                  <h3>{job.title}</h3>
                  <span>{job.company} • {job.model} • {job.place}</span>
                </div>
                <ScoreRing label="Match" value={job.match} />
              </div>
              <div className="skill-list">{job.tags.map((tag) => <i key={tag}>{tag}</i>)}</div>
              <div className="featured-job-meta">
                <strong>{job.salary}</strong>
                <span>{job.posted} • {job.applicants} applicants</span>
              </div>
              <div className="button-row">
                <button className="primary-button small" onClick={() => setSelectedJob(job)}><Zap size={14} /> Quick apply</button>
                <button className="secondary-button small"><Heart size={14} /> Save</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="candidate-portal-layout">
        <section className="portal-section jobs-feed-section">
          <PanelHeader icon={<Search size={17} />} title="Latest IT jobs" action="Advanced filters" />
          <div className="search-strip">
            <Field label="Keyword" value="Frontend, Backend, DevOps" />
            <Field label="Location" value="HCMC, Hanoi, Remote" />
            <Field label="Salary" value="$1,500 - $4,500" />
            <Field label="Experience" value="3+ years" />
          </div>
          <div className="portal-job-list">
            {jobs.map((job) => (
              <article className="portal-job-row" key={job.title}>
                <div className="company-dot">{job.company.charAt(0)}</div>
                <div>
                  <h3>{job.title}</h3>
                  <span>{job.company} • {job.place} • {job.model}</span>
                  <div className="skill-list">{job.tags.map((tag) => <i key={tag}>{tag}</i>)}</div>
                </div>
                <div className="portal-row-side">
                  <ScoreRing label="Match" value={job.match} />
                  <strong>{job.salary}</strong>
                  <button className="secondary-button small" onClick={() => setSelectedJob(job)}>Details</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="portal-aside">
          <section className="panel">
            <PanelHeader icon={<Building2 size={17} />} title="Top trusted companies" action="Follow" />
            {companies.map((company, index) => (
              <div className="mini-row" key={company.name}>
                <Avatar name={company.name} index={index} />
                <div>
                  <strong>{company.name}</strong>
                  <span>{company.field} • Trust {company.trust} • {company.jobs} jobs</span>
                </div>
                <button className="icon-button"><Heart size={15} /></button>
              </div>
            ))}
          </section>
          <section className="panel">
            <PanelHeader icon={<WandSparkles size={17} />} title="AI career assistant" action="Open" />
            <div className="ai-action">
              <Sparkles size={16} />
              <div>
                <strong>Improve match by 7%</strong>
                <span>Add banking compliance and dashboard performance metrics to your default CV.</span>
              </div>
            </div>
          </section>
        </aside>
      </div>

      <div className="candidate-section-grid">
        <section className="panel">
          <PanelHeader icon={<Target size={17} />} title="Explore by career track" action="Customize" />
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
          <PanelHeader icon={<CheckCircle2 size={17} />} title="Application health" action="Open tracker" />
          <div className="health-grid">
            <Metric title="Đã nộp" value="12" detail="5 đã xem, 3 shortlist" />
            <Metric title="Phỏng vấn" value="3" detail="1 lịch cần xác nhận" />
            <Metric title="Từ chối SLA" value="2" detail="Quá 7 ngày không xử lý" />
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
                <span>{selectedJob.place} • {selectedJob.salary} • Trust score {selectedJob.trust}</span>
              </div>
              <ScoreRing label="Match" value={selectedJob.match} />
            </div>
            <div className="match-reasons">
              <div><strong>Đáp ứng</strong><p>{selectedJob.tags.join(", ")} và kinh nghiệm sản phẩm phù hợp JD.</p></div>
              <div><strong>Còn thiếu</strong><p>Cần bổ sung metric tác động và domain compliance nếu có.</p></div>
              <div><strong>Điểm cộng</strong><p>Salary/location phù hợp, công ty có trust score cao.</p></div>
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

import { useState } from "react";
import type { CSSProperties } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  BookOpen,
  ChevronRight,
  FileText,
  Heart,
  MapPin,
  Navigation,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  WandSparkles,
  Zap,
} from "lucide-react";
import { companies, jobs } from "../../data";
import { ChartTooltip, Modal, ScoreRing } from "../../components/ui";
import type { Job } from "../../types";

const categories = [
  ["Frontend / UI Platform", "128 việc", "React, Vue, design system"],
  ["Backend / Platform", "112 việc", "Node.js, Go, Java"],
  ["DevOps / SRE / Cloud", "84 việc", "Kubernetes, AWS, Terraform"],
  ["Data / AI Engineer", "76 việc", "Python, MLOps, LLM"],
  ["QA Automation", "52 việc", "Playwright, API test"],
  ["Product / BA / PM", "48 việc", "Roadmap, analytics"],
];

const marketTrend = [
  { day: "16/05", jobs: 52300, newJobs: 2510 },
  { day: "17/05", jobs: 53140, newJobs: 2790 },
  { day: "18/05", jobs: 53820, newJobs: 2920 },
  { day: "19/05", jobs: 54480, newJobs: 3010 },
  { day: "20/05", jobs: 54830, newJobs: 3098 },
  { day: "21/05", jobs: 55220, newJobs: 3180 },
  { day: "22/05", jobs: 55840, newJobs: 3340 },
];

const demandBars = [
  { role: "FE", value: 14800 },
  { role: "BE", value: 13200 },
  { role: "Cloud", value: 9800 },
  { role: "AI", value: 8600 },
  { role: "QA", value: 7200 },
];

export function CandidateHomePage({ navigate }: { navigate: (path: string) => void }) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const bestJobs = jobs.slice(0, 8);
  const nearbyJobs = jobs.filter((job) => job.place === "Ho Chi Minh" || job.place === "Remote").slice(0, 6);

  return (
    <div className="candidate-homepage">
      <section className="candidate-hero-site">
        <div className="candidate-hero-inner">
          <h1>UpNext - Tạo CV, tìm việc IT, tuyển dụng hiệu quả</h1>
          <div className="candidate-searchbar">
            <label>
              <Search size={19} />
              <input value="React, Node.js, DevOps, AI Engineer" readOnly />
            </label>
            <label>
              <MapPin size={18} />
              <input value="Ho Chi Minh, Ha Noi, Remote" readOnly />
            </label>
            <button onClick={() => navigate("/candidate/saved")}><Search size={18} /> Tìm kiếm</button>
          </div>

          <div className="candidate-hero-grid">
            <aside className="category-card">
              {categories.map(([title, count, detail]) => (
                <button key={title}>
                  <div>
                    <strong>{title}</strong>
                    <span>{count} • {detail}</span>
                  </div>
                  <ChevronRight size={18} />
                </button>
              ))}
              <div className="category-pager"><span>1/4</span><button><ChevronRight size={16} /></button></div>
            </aside>

            <div className="candidate-hero-main">
              <article className="candidate-promo-card">
                <div>
                  <span>IT career advantage</span>
                  <h2>Tiếp lợi thế, nối thành công</h2>
                  <p>AI match CV với JD, gợi ý mức lương, cảnh báo công ty uy tín và theo dõi lịch phỏng vấn.</p>
                  <button onClick={() => navigate("/candidate/profile")}><FileText size={15} /> Tạo CV chuẩn IT</button>
                </div>
                <div className="candidate-hero-visual" aria-hidden="true">
                  <div className="visual-window">
                    <div className="visual-toolbar"><span /><span /><span /></div>
                    <div className="visual-kpis"><i /><i /><i /></div>
                    <div className="visual-bars">
                      {[54, 72, 44, 86, 61, 93, 70].map((height) => <span style={{ height: `${height}%` }} key={height} />)}
                    </div>
                    <div className="visual-list"><b /><b /><b /></div>
                  </div>
                </div>
              </article>

              <article className="market-ticker">
                <div>
                  <strong>Thị trường việc làm hôm nay</strong>
                  <span>22/05/2026</span>
                </div>
                <div className="ticker-stats">
                  <b>54.830</b><span>việc làm đang tuyển</span>
                  <b>3.098</b><span>việc mới 24h</span>
                  <b>18.648</b><span>công ty đang tuyển</span>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="candidate-content-band">
        <div className="candidate-section-head">
          <div>
            <h2>Việc làm tốt nhất</h2>
            <p>Đề xuất bởi UpNext AI theo CV, kỹ năng, lương mong muốn và lịch sử ứng tuyển.</p>
          </div>
          <button onClick={() => navigate("/candidate/saved")}>Xem tất cả <ChevronRight size={16} /></button>
        </div>
        <div className="candidate-filter-row">
          {["Ngẫu nhiên", "Hồ Chí Minh", "Remote", "Senior", "$2.000+", "Fintech", "AI Product"].map((filter, index) => (
            <button className={index === 0 ? "active" : ""} key={filter}>{filter}</button>
          ))}
        </div>
        <div className="candidate-tip"><Sparkles size={16} /> Gợi ý: Di chuột vào job để xem lương, trust score và lý do match trước khi ứng tuyển.</div>
        <div className="candidate-jobs-with-side">
          <div className="candidate-job-grid">
            {bestJobs.map((job) => <CandidateJobCard job={job} key={job.title} onOpen={() => setSelectedJob(job)} />)}
          </div>
          <aside className="candidate-safe-card">
            <ShieldCheck size={24} />
            <strong>Tìm việc an toàn cùng UpNext</strong>
            <p>Chỉ ưu tiên công ty đã xác thực, cảnh báo bài đăng rủi ro và ẩn công ty bạn không muốn lộ CV.</p>
            <button onClick={() => navigate("/candidate/settings")}>Cài đặt bảo mật</button>
          </aside>
        </div>
      </section>

      <section className="candidate-market-section">
        <div className="candidate-market-dashboard">
          <div className="market-left">
            <h2>Thị trường IT hôm nay <span>22/05/2026</span></h2>
            <div className="market-bot-visual" aria-hidden="true">
              <Sparkles size={26} />
              <strong>AI</strong>
              <span>54.830 jobs</span>
            </div>
            <div className="fresh-jobs">
              {jobs.slice(0, 3).map((job) => (
                <button key={job.title} onClick={() => setSelectedJob(job)}>
                  <span>{job.company.charAt(0)}</span>
                  <div><strong>{job.title}</strong><small>{job.company} • {job.place}</small></div>
                </button>
              ))}
            </div>
          </div>
          <div className="market-chart-panel">
            <div className="market-metrics">
              <div><b>3.098</b><span>Việc mới 24h</span></div>
              <div><b>54.830</b><span>Việc đang tuyển</span></div>
              <div><b>18.648</b><span>Công ty IT</span></div>
            </div>
            <div className="market-charts">
              <section>
                <h3>Tăng trưởng cơ hội việc làm</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <AreaChart data={marketTrend}>
                    <defs>
                      <linearGradient id="candidateJobsGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-teal-500)" stopOpacity={0.55} />
                        <stop offset="95%" stopColor="var(--color-teal-500)" stopOpacity={0.04} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke="rgba(255,255,255,.14)" />
                    <XAxis dataKey="day" tick={{ fill: "var(--color-teal-100)", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "var(--color-teal-100)", fontSize: 10 }} axisLine={false} tickLine={false} width={48} />
                    <Tooltip content={<ChartTooltip />} />
                    <Area dataKey="jobs" stroke="var(--color-teal-400)" strokeWidth={3} fill="url(#candidateJobsGradient)" isAnimationActive={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </section>
              <section>
                <h3>Nhu cầu tuyển dụng theo role</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={demandBars}>
                    <CartesianGrid vertical={false} stroke="rgba(255,255,255,.14)" />
                    <XAxis dataKey="role" tick={{ fill: "var(--color-teal-100)", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "var(--color-teal-100)", fontSize: 10 }} axisLine={false} tickLine={false} width={42} />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar dataKey="value" fill="var(--color-teal-400)" radius={[8, 8, 2, 2]} maxBarSize={38} isAnimationActive={false} />
                  </BarChart>
                </ResponsiveContainer>
              </section>
            </div>
          </div>
        </div>
      </section>

      <section className="candidate-content-band">
        <div className="candidate-section-head">
          <div>
            <h2>Việc gần bạn và việc remote phù hợp</h2>
            <p>Ưu tiên vị trí đúng kỳ vọng lương, thời gian phản hồi nhanh và trust score tốt.</p>
          </div>
          <button><Navigation size={15} /> Cập nhật vị trí</button>
        </div>
        <div className="nearby-job-grid">
          {nearbyJobs.map((job) => <CandidateJobCard compact job={job} key={`${job.title}-near`} onOpen={() => setSelectedJob(job)} />)}
        </div>
      </section>

      <section className="candidate-employer-section">
        <div className="candidate-section-head">
          <div>
            <h2>Nhà tuyển dụng nổi bật</h2>
            <p>Công ty IT đã xác thực, phản hồi nhanh và đang mở nhiều vị trí phù hợp.</p>
          </div>
          <button onClick={() => navigate("/candidate/companies")}>Xem công ty <ChevronRight size={16} /></button>
        </div>
        <div className="top-company-grid">
          {companies.slice(0, 5).map((company) => (
            <article className="top-company-card" key={company.name}>
              <span>TOP</span>
              <div>{company.name.slice(0, 2).toUpperCase()}</div>
              <strong>{company.name}</strong>
              <p>{company.field} • {company.jobs} việc • Trust {company.trust}</p>
            </article>
          ))}
        </div>
        <div className="company-bubble-cloud">
          {companies.slice(5, 16).map((company, index) => (
            <button style={{ "--bubble-x": `${(index * 11) % 86}%`, "--bubble-y": `${18 + ((index * 23) % 58)}%`, "--bubble-size": `${62 + (index % 4) * 18}px` } as CSSProperties} key={company.name}>
              {company.name.split(" ").map((word) => word[0]).join("").slice(0, 3)}
            </button>
          ))}
        </div>
      </section>

      <section className="candidate-tools-section">
        {[
          [FileText, "CV chuẩn IT", "Tạo CV có match score, nhiều phiên bản và trạng thái mặc định để quick apply."],
          [WandSparkles, "AI career assistant", "Gợi ý sửa CV, cover letter, câu hỏi phỏng vấn và khoảng lương nên đàm phán."],
          [BookOpen, "Cẩm nang nghề nghiệp", "Theo dõi xu hướng React, Backend, Cloud, AI và lộ trình nâng cấp kỹ năng."],
        ].map(([Icon, title, detail]) => (
          <article className="candidate-tool-card" key={title as string}>
            <Icon size={22} />
            <strong>{title as string}</strong>
            <p>{detail as string}</p>
          </article>
        ))}
      </section>

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
              <div><strong>Vì sao phù hợp</strong><p>{selectedJob.tags.join(", ")} khớp với CV mặc định và kinh nghiệm sản phẩm IT.</p></div>
              <div><strong>Cần kiểm tra</strong><p>So sánh range lương, hình thức làm việc và tốc độ phản hồi của nhà tuyển dụng.</p></div>
              <div><strong>Luồng ứng tuyển</strong><p>Ứng tuyển bằng CV mặc định, theo dõi trạng thái và nhận lịch phỏng vấn trong Messages.</p></div>
            </div>
            <div className="modal-actions">
              <button className="secondary-button"><Heart size={15} /> Lưu việc</button>
              <button className="primary-button"><Zap size={15} /> Ứng tuyển nhanh</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function CandidateJobCard({ job, compact = false, onOpen }: { job: Job; compact?: boolean; onOpen: () => void }) {
  return (
    <article className={compact ? "candidate-job-card compact" : "candidate-job-card"} onClick={onOpen}>
      <div className="job-logo-box">{job.company.slice(0, 2).toUpperCase()}</div>
      <div className="candidate-job-copy">
        <div>
          <h3>{job.title}</h3>
          <button aria-label={`Save ${job.title}`} onClick={(event) => event.stopPropagation()}><Heart size={16} /></button>
        </div>
        <p>{job.company}</p>
        <div className="candidate-job-tags">
          <span>{job.salary}</span>
          <span>{job.place}</span>
          <span>{job.model}</span>
        </div>
        <div className="candidate-job-foot">
          <span><Star size={13} /> Trust {job.trust}</span>
          <span><TrendingUp size={13} /> {job.applicants} ứng viên</span>
          <b>{job.match}% match</b>
        </div>
      </div>
    </article>
  );
}

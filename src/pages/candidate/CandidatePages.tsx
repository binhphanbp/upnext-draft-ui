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

const applicationSteps = ["Đã nộp", "Đã xem", "Shortlist", "Phỏng vấn", "Offer"];
const savedJobs = Array.from({ length: 28 }, (_, index) => {
  const job = jobs[index % jobs.length];
  return {
    ...job,
    savedAt: `${index + 1} ngày trước`,
    alert: index % 4 === 0 ? "Lương đã cập nhật" : index % 3 === 0 ? "Công ty đã xem CV" : "Đã lưu",
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
  ["Nexa Fintech", "Xác nhận technical interview thứ Sáu 09:00", "Chưa đọc", "9 phút"],
  ["CloudBridge Labs", "Chúng tôi đã xem CV và muốn trao đổi system design", "Đang mở", "1 giờ"],
  ["UpNext AI Coach", "CV React Lead của bạn có thể tăng match thêm 7%", "Cần xử lý", "Hôm nay"],
  ["Orbit Commerce", "Cảm ơn bạn đã ứng tuyển. Role DevOps đã vào shortlist", "Đang mở", "Hôm qua"],
];

export function CandidateProfilePage() {
  return (
    <>
      <PageHeader
        eyebrow="Ứng viên"
        title="Hồ sơ, kho CV và CV mặc định"
        description="Quản lý hồ sơ cá nhân, nhiều CV PDF/DOCX, CV tạo trong hệ thống, hồ sơ mặc định và trạng thái đang tìm việc/ngừng tìm việc."
        actions={<><button className="secondary-button"><RefreshCw size={15} /> Tạm ngừng tìm việc</button><button className="primary-button">Tạo CV</button></>}
      />
      <div className="profile-grid">
        <section className="panel profile-card">
          <div className="profile-top">
            <Avatar name="Nguyen Minh Khoa" index={1} large />
            <div>
              <h2>Nguyen Minh Khoa</h2>
              <span>Senior Frontend Engineer • 6 năm • TP. Hồ Chí Minh</span>
            </div>
            <span className="status-pill green">Đang tìm việc</span>
          </div>
          <div className="profile-stats">
            <Metric title="Điểm CV mặc định" value="92" detail="Sẵn sàng ứng tuyển nhanh" />
            <Metric title="Độ hoàn thiện hồ sơ" value="88%" detail="Thêm bằng cấp để đạt 95%" />
            <Metric title="Phỏng vấn AI" value="4/5" detail="Điểm luyện tập gần nhất" />
          </div>
          <div className="field-table">
            {["Bằng cấp: Bachelor of Software Engineering", "Kỹ năng: React, TypeScript, Next.js, Design System", "Kinh nghiệm: Fintech dashboard, B2B SaaS, realtime products", "Giới tính: Nam • Ảnh đại diện: Đã cập nhật"].map((item) => <p key={item}>{item}</p>)}
          </div>
        </section>
        <section className="panel cv-panel">
          <PanelHeader icon={<FileText size={17} />} title="Thư viện CV" action="Tải PDF/DOCX" />
          {["Frontend Lead - mặc định", "Fullstack Product", "CV tiếng Anh", "Fintech CV"].map((cv, index) => (
            <div className="cv-row" key={cv}>
              <FileCheck2 size={18} />
              <div>
                <strong>{cv}</strong>
                <span>{index === 0 ? "Mặc định cho ứng tuyển nhanh và match score" : "Phiên bản đã lưu"}</span>
              </div>
              <button className={index === 0 ? "status-pill green" : "status-pill"}>{index === 0 ? "Mặc định" : "Đặt mặc định"}</button>
            </div>
          ))}
        </section>
        <section className="panel ai-letter">
          <PanelHeader icon={<WandSparkles size={17} />} title="Cover letter bằng AI" action="Tạo nội dung" />
          <div className="letter-box">
            <p>Kính gửi đội tuyển dụng Nexa Fintech,</p>
            <p>Tôi ứng tuyển vị trí Senior Frontend Engineer với 6 năm xây dựng hệ thống React, design tokens và dashboard tối ưu hiệu năng...</p>
          </div>
          <div className="match-breakdown">
            <Metric title="Kỹ năng" value="50%" detail="React/TS mạnh" />
            <Metric title="Kinh nghiệm" value="30%" detail="Phù hợp domain" />
            <Metric title="Khác" value="20%" detail="Lương/khu vực phù hợp" />
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
        eyebrow="Ứng viên"
        title="Theo dõi CV đã nộp và lịch phỏng vấn"
        description="Ứng viên xem timeline trạng thái, xác nhận/từ chối/hẹn lại lịch. Quá 7 ngày không xử lý sẽ chuyển sang từ chối."
        actions={<button className="primary-button"><CalendarDays size={15} /> Đồng bộ lịch</button>}
      />
      <div className="applications-grid">
        <section className="panel application-list">
          <PanelHeader icon={<ClipboardCheck size={17} />} title="Hồ sơ đã ứng tuyển" action="Lọc" />
          {jobs.slice(0, 4).map((job, jobIndex) => (
            <article className="application-card" key={job.title}>
              <div>
                <h3>{job.title}</h3>
                <span>{job.company} • Cập nhật lần cuối {jobIndex + 2} ngày trước</span>
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
            <PanelHeader icon={<CalendarClock size={17} />} title="Lời mời phỏng vấn" action="Hẹn lại" />
            <div className="interview-card primary">
              <div className="date-chip"><span>T6</span><b>24</b></div>
              <div>
                <strong>Phỏng vấn kỹ thuật</strong>
                <span>Nexa Fintech • 09:00 - 10:00</span>
                <p>Vòng 1/2. Ứng viên được đề xuất một khung giờ mới.</p>
              </div>
            </div>
            <div className="button-row">
              <button className="secondary-button small">Từ chối</button>
              <button className="primary-button small">Xác nhận</button>
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
        eyebrow="Ứng viên"
        title="Việc đã lưu, cảnh báo và hàng chờ ứng tuyển nhanh"
        description="Quản lý việc đã lưu, cảnh báo lương/công ty xem CV, nhắc hạn ứng tuyển và nhóm theo lộ trình nghề nghiệp."
        actions={<><button className="secondary-button"><Bell size={15} /> Quy tắc cảnh báo</button><button className="primary-button"><Search size={15} /> Tìm việc tương tự</button></>}
      />
      <div className="job-market-strip">
        <InsightCard title="Việc đã lưu" value="28" icon={Heart} color="#ef4444" note="18 việc còn mở, 6 việc sắp đóng tuần này" />
        <InsightCard title="Cảnh báo lương" value="7" icon={TrendingUp} color="#10a778" note="Có việc tăng lương tối đa vượt kỳ vọng" />
        <InsightCard title="Công ty xem CV" value="11" icon={Building2} color="#3b82f6" note="Nhà tuyển dụng đã xem CV mặc định" />
        <InsightCard title="Sẵn sàng ứng tuyển" value="22" icon={CheckCircle2} color="#574bf5" note="CV và cover letter đã chuẩn bị" />
      </div>
      <div className="two-column-layout">
        <section className="panel">
          <PanelHeader icon={<Heart size={17} />} title="Hàng chờ việc đã lưu" action="Ứng tuyển hàng loạt" />
          <div className="search-strip">
            <Field label="Track" value="Frontend, Backend, DevOps" />
            <Field label="Trạng thái" value="Đang mở, đã cập nhật lương, đã xem CV" />
            <Field label="Hạn ứng tuyển" value="Đóng trong 7 ngày" />
            <Field label="Khu vực" value="Remote / Hybrid" />
          </div>
          <div className="dense-list scroll-list">
            {savedJobs.map((job, index) => (
              <article className="job-compact-row" key={`${job.title}-${index}`}>
                <div className="company-dot">{job.company.charAt(0)}</div>
                <div>
                  <strong>{job.title}</strong>
                  <span>{job.company} • {job.model} • {job.place} • lưu {job.savedAt}</span>
                  <div className="skill-list">{job.tags.map((tag) => <i key={tag}>{tag}</i>)}</div>
                </div>
                <div className="row-actions">
                  <span className={job.alert === "Lương đã cập nhật" ? "status-pill green" : "status-pill"}>{job.alert}</span>
                  <button className="primary-button small">Ứng tuyển</button>
                </div>
              </article>
            ))}
          </div>
        </section>
        <aside className="panel">
          <PanelHeader icon={<SlidersHorizontal size={17} />} title="Bộ lọc đã lưu" action="Sửa" />
          {["React remote $3k+", "Fintech frontend lead", "DevOps/SRE hybrid", "AI product engineer"].map((filter, index) => (
            <div className="mini-row" key={filter}>
              <Avatar name={filter} index={index} />
              <div><strong>{filter}</strong><span>{12 + index * 4} việc mới trong tuần</span></div>
              <button className="status-pill green">Bật</button>
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
        eyebrow="Ứng viên"
        title="Công ty IT uy tín và minh bạch tuyển dụng"
        description="Theo dõi công ty, điểm uy tín, tốc độ phản hồi, đánh giá ứng viên, việc đang mở và cảnh báo công ty rủi ro."
        actions={<button className="primary-button"><Building2 size={15} /> Theo dõi công ty</button>}
      />
      <div className="company-directory-grid">
        {companies.concat(companies).map((company, index) => (
          <article className="company-card" key={`${company.name}-${index}`}>
            <div className="company-card-head">
              <div className="company-dot">{company.name.charAt(0)}</div>
              <div><strong>{company.name}</strong><span>{company.field} • {company.followers + index * 73} người theo dõi</span></div>
              <span className={company.trust > 85 ? "status-pill green" : "status-pill yellow"}>Uy tín {company.trust}</span>
            </div>
            <div className="resource-grid compact">
              <Metric title="Việc đang mở" value={`${company.jobs + index}`} detail="Tuyển dụng IT" />
              <Metric title="Phản hồi" value={`${88 - index}%`} detail="trong 24h" />
            </div>
            <div className="button-row"><button className="secondary-button small"><Heart size={14} /> Theo dõi</button><button className="primary-button small">Xem việc</button></div>
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
        eyebrow="Ứng viên"
        title="Cẩm nang lương IT, nhu cầu kỹ năng và trợ lý đàm phán"
        description="Benchmark lương theo role, seniority, khu vực, remote/hybrid và kỹ năng để ứng viên đặt kỳ vọng thực tế."
        actions={<><button className="secondary-button"><WalletCards size={15} /> Xuất benchmark</button><button className="primary-button"><WandSparkles size={15} /> Đàm phán với AI</button></>}
      />
      <div className="job-market-strip">
        <InsightCard title="Median Senior FE" value="$3.2k" icon={TrendingUp} color="#10a778" note="TP.HCM Hybrid, 5-7 năm" />
        <InsightCard title="Tăng nhanh nhất" value="AI Product" icon={WandSparkles} color="#574bf5" note="+29% nhu cầu lương YoY" />
        <InsightCard title="Premium Remote" value="+12%" icon={MapPin} color="#3b82f6" note="CV sẵn sàng làm remote toàn cầu" />
        <InsightCard title="Khoảng đàm phán" value="$420" icon={WalletCards} color="#f59e0b" note="Mức tăng trung bình được chấp nhận" />
      </div>
      <section className="panel">
        <PanelHeader icon={<TrendingUp size={17} />} title="Benchmark lương theo track IT" action="Chỉnh bộ lọc" />
        <div className="benchmark-table">
          <div className="benchmark-head"><span>Vai trò</span><span>P25</span><span>Trung vị</span><span>P90</span><span>Xu hướng</span></div>
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
        eyebrow="Ứng viên"
        title="Tin nhắn nhà tuyển dụng, lời mời phỏng vấn và nhắc việc AI"
        description="Tập trung hội thoại với nhà tuyển dụng, trạng thái đã đọc, lịch phỏng vấn và nhắc phản hồi trong SLA."
        actions={<button className="primary-button"><Mail size={15} /> Soạn phản hồi</button>}
      />
      <div className="message-layout">
        <section className="panel">
          <PanelHeader icon={<Mail size={17} />} title="Hộp thư" action="Đánh dấu đã đọc" />
          {messageThreads.map(([sender, message, status, time], index) => (
            <button className={index === 0 ? "message-row selected" : "message-row"} key={sender}>
              <Avatar name={sender} index={index} />
              <div><strong>{sender}</strong><span>{message}</span></div>
              <em>{time}</em>
              <b className={status === "Chưa đọc" ? "status-pill purple" : "status-pill"}>{status}</b>
            </button>
          ))}
        </section>
        <section className="panel message-thread">
          <PanelHeader icon={<CalendarClock size={17} />} title="Hội thoại Nexa Fintech" action="Đính kèm CV" />
          <div className="chat-window">
            <p className="bot">Chúng tôi muốn đặt lịch technical interview vào thứ Sáu lúc 09:00.</p>
            <p className="user">Thứ Sáu 09:00 phù hợp. Vui lòng gửi lịch và phạm vi phỏng vấn.</p>
            <p className="bot">Đã gửi lịch. Phạm vi: kiến trúc React, performance và case dashboard fintech.</p>
          </div>
          <div className="reply-box"><Field label="Bản nháp phản hồi" value="Cảm ơn, tôi xác nhận lịch phỏng vấn và sẽ chuẩn bị link portfolio." /><button className="primary-button">Gửi phản hồi</button></div>
        </section>
      </div>
    </>
  );
}

export function CandidateSettingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Cài đặt ứng viên"
        title="Quyền riêng tư, ưu tiên việc làm, thông báo và bảo mật"
        description="Kiểm soát dữ liệu hồ sơ, visibility với nhà tuyển dụng, kênh thông báo và quyền kết nối OAuth."
        actions={<button className="primary-button"><Settings size={15} /> Lưu thay đổi</button>}
      />
      <div className="settings-grid">
        <section className="panel">
          <PanelHeader icon={<Target size={17} />} title="Ưu tiên việc làm" action="Đặt lại" />
          {["Ưu tiên Remote", "Lương từ $2,500", "Ẩn công ty hiện tại", "Chỉ nhận công ty đã xác thực"].map((item, index) => (
            <div className="setting-row" key={item}><div><strong>{item}</strong><span>{index % 2 ? "Tùy chỉnh riêng" : "Đề xuất theo CV của bạn"}</span></div><button className="status-pill green">Bật</button></div>
          ))}
        </section>
        <section className="panel">
          <PanelHeader icon={<ShieldCheck size={17} />} title="Quyền riêng tư & bảo mật" action="Mở log" />
          {["Đăng nhập Email OTP", "Đã kết nối Google", "Đã kết nối GitHub", "Xuất dữ liệu hồ sơ"].map((item, index) => (
            <div className="setting-row" key={item}><div><strong>{item}</strong><span>{index < 3 ? "Đang hoạt động" : "Có thể yêu cầu"}</span></div><Lock size={16} /></div>
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
        eyebrow="Ứng viên AI"
        title="Mô phỏng phỏng vấn, chatbot và cover letter"
        description="AI phỏng vấn bằng giọng nói, theo dõi tiến độ 3/5, chấm điểm theo tốc độ, chuyên môn và xử lý tình huống."
        actions={<button className="primary-button"><Mic size={15} /> Bắt đầu phiên voice</button>}
      />
      <div className="ai-grid">
        <section className="panel interview-sim">
          <PanelHeader icon={<Bot size={17} />} title="Mô phỏng phỏng vấn AI" action="React Lead" />
          <div className="question-card">
            <span>Câu hỏi 3/5</span>
            <h2>Bạn sẽ migration một React dashboard legacy sang typed design system như thế nào mà không chặn tiến độ feature?</h2>
            <div className="progress-line"><span style={{ width: "60%" }} /></div>
          </div>
          <div className="score-grid">
            <Metric title="Tốc độ" value="82" detail="Nhịp trả lời rõ" />
            <Metric title="Chuyên môn" value="91" detail="Ví dụ thuyết phục" />
            <Metric title="Tình huống" value="78" detail="Cần thêm trade-off" />
          </div>
        </section>
        <section className="panel coach-panel">
          <PanelHeader icon={<Target size={17} />} title="Điểm cần cải thiện" action="Áp dụng vào CV" />
          {["Định lượng tác động performance của dashboard", "Bổ sung kinh nghiệm PCI/dữ liệu tài chính", "Chuẩn bị một câu chuyện system design"].map((item) => (
            <div className="check-row" key={item}><Target size={15} /><span>{item}</span></div>
          ))}
        </section>
      </div>
    </>
  );
}

import {
  Bell,
  Bookmark,
  BriefcaseBusiness,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Gift,
  Mail,
  MapPin,
  MessageSquare,
  MoreVertical,
  Paperclip,
  Plus,
  Search,
  UsersRound,
} from "lucide-react";
import { upnextLogo } from "../../brand";

type CandidatePageProps = {
  path: string;
  navigate: (path: string) => void;
};

const navItems = [
  ["Tổng quan", "/candidate"],
  ["Tìm việc", "/candidate/jobs"],
  ["Tài năng", "/candidate/talent"],
  ["Lịch sử", "/candidate/history"],
  ["AI Interview", "/candidate/ai"],
];

const brandJobs = [
  { logo: "FPT", company: "FPT Software", title: "Fresher Java Developer", place: "Khu Công Nghệ Cao, TP.HCM", salary: "10 - 15 Tr/tháng", days: "2 ngày trước", applicants: "40", tags: ["PHP", "Laravel", "CSS", "React"] },
  { logo: "mo", company: "MoMo", title: "Thực tập sinh Mobile/React Native", place: "Washington, USA", salary: "3 - 5 Tr/tháng", days: "3 days ago", applicants: "64", tags: ["React Native", "Redux", "Git"] },
  { logo: "S", company: "Slack Technologies LLC", title: "Passionate Programmer", place: "California, USA", salary: "$15k-20k/month", days: "3 days ago", applicants: "54", tags: ["PHP", "Laravel", "CSS", "React"] },
  { logo: "Bē", company: "Behance", title: "Product Designer", place: "New York, USA", salary: "$15k-20k/month", days: "3 days ago", applicants: "54", tags: ["PHP", "Laravel", "CSS", "React"] },
  { logo: "in", company: "InVision", title: "UX Researcher", place: "New York, USA", salary: "$15k-20k/month", days: "3 days ago", applicants: "54", tags: ["PHP", "Laravel", "CSS", "React"] },
];

const similarJobs = [
  ["Zalo", "UI Designer Intern", "TP. Hồ Chí Minh", "10 - 15Tr", "Còn 2 ngày"],
  ["TP", "Junior Java Developer", "Cầu Giấy, Hà Nội", "15 - 20Tr", "Còn 3 ngày"],
  ["Viettel", "Mobile Dev (Flutter)", "Q.10, TP. Hồ Chí Minh", "15 - 20 Tr", "Còn 4 ngày"],
  ["TIKI", "AI Research Resident", "Hà Nội", "$19 / Hr", "Còn 4 ngày"],
  ["Tw", "Brand Strategist", "Hoàn Kiếm, Hà Nội", "$19 / Hr", "Còn 6 ngày"],
  ["Apple", "iOS Developer Mobile", "San Fransisco, US", "$19 / Hr", "1 Weeks Left"],
  ["Air", "HR Manager", "San Fransisco, US", "$19 / Hr", "1 Weeks Left"],
  ["Mail", "Marketing Strategist", "San Fransisco, US", "$19 / Hr", "2 Weeks Left"],
  ["N", "UI Designer", "San Fransisco, US", "$19 / Hr", "2 Weeks Left"],
];

const companies = [
  ["Apple", "Apple LLC", "4.8k"],
  ["Autodesk", "Autodesk Inc", "4.8k"],
  ["Behance", "Behance", "4.8k"],
  ["Invision", "Invision", "4.8k"],
  ["Spotify", "Spotify", "4.8k"],
  ["Microsoft", "Microsoft", "4.8k"],
  ["Github", "Github", "4.8k"],
  ["Mailchimp", "mailchimp", "4.8k"],
];

const stats = [
  ["989", "Lượt xem việc làm", "+15%", "mint", BriefcaseBusiness],
  ["604", "Lượt ứng tuyển", "+10%", "pink", UsersRound],
  ["1.057", "Việc làm đã đăng", "+10%", "yellow", Gift],
  ["1.395", "Lượt AI Interview", "+4%", "lavender", Mail],
];

export function CandidateHomePage({ path, navigate }: CandidatePageProps) {
  const route = normalizeCandidatePath(path);

  return (
    <main className="cportal">
      <CandidateTopNav path={route} navigate={navigate} />
      {route === "/candidate/jobs" && <JobSearchPage navigate={navigate} />}
      {route === "/candidate/jobs/fresher-java" && <JobDetailPage navigate={navigate} />}
      {route === "/candidate/apply" && <ApplicationPage navigate={navigate} />}
      {route === "/candidate/companies/uihut" && <CompanyDetailPage navigate={navigate} />}
      {route === "/candidate" && <DashboardPage navigate={navigate} />}
    </main>
  );
}

function normalizeCandidatePath(path: string) {
  if (path === "/" || path === "/candidate/profile" || path === "/candidate/saved") return "/candidate";
  if (path === "/candidate/companies") return "/candidate/companies/uihut";
  if (path === "/candidate/applications") return "/candidate/apply";
  if (path === "/candidate/jobs" || path === "/candidate/jobs/fresher-java" || path === "/candidate/apply" || path === "/candidate/companies/uihut") return path;
  return "/candidate";
}

function CandidateTopNav({ path, navigate }: CandidatePageProps) {
  return (
    <header className="cportal-topbar">
      <button className="cportal-logo" onClick={() => navigate("/candidate")}>
        <img src={upnextLogo.wordmark} alt="UpNext" />
      </button>
      <nav>
        {navItems.map(([label, href]) => (
          <button className={activeNav(path, href) ? "active" : ""} key={href} onClick={() => navigate(href)}>
            {label}
          </button>
        ))}
      </nav>
      <div className="cportal-actions">
        <button className="post-job"><Plus size={17} /> Đăng việc</button>
        <button className="icon-button"><Bell size={19} /></button>
        <button className="icon-button"><Mail size={19} /></button>
        <button className="candidate-avatar"><img alt="" src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=80&q=80" /><ChevronDown size={16} /></button>
      </div>
    </header>
  );
}

function activeNav(path: string, href: string) {
  if (href === "/candidate") return path === "/candidate";
  if (href === "/candidate/jobs") return path.startsWith("/candidate/jobs") || path === "/candidate/apply";
  return path === href;
}

function DashboardPage({ navigate }: Pick<CandidatePageProps, "navigate">) {
  return (
    <section className="cportal-shell dashboard-page">
      <h1>Chào mừng Bình Phan!</h1>
      <p className="page-date">Thứ Năm - 25/11/2025</p>
      <div className="dashboard-grid">
        <div className="stat-grid">
          {stats.map(([value, label, growth, tone, Icon]) => (
            <article className={`metric-card ${tone}`} key={label as string}>
              <span><Icon size={20} /></span>
              <strong>{value as string}</strong>
              <p>{label as string}</p>
              <em>{growth as string}</em>
            </article>
          ))}
        </div>
        <article className="performance-card">
          <div><h2>Hiệu quả</h2><button>Sắp xếp: <b>Tuần này</b> <ChevronDown size={16} /></button></div>
          <div className="legend"><span /> Lượt xem <i /> Lượt ứng tuyển</div>
          <div className="mini-chart">
            {[62, 78, 66, 62, 82, 62, 52].map((view, index) => (
              <div className="chart-day" key={index}><b style={{ height: `${view}%` }} /><i style={{ height: `${Math.min(96, view + 24 - (index % 2) * 16)}%` }} /><span>{11 + index}<small>{["T2", "T3", "T4", "T5", "T6", "T7", "CN"][index]}</small></span></div>
            ))}
          </div>
        </article>
      </div>
      <div className="dashboard-content">
        <section>
          <SectionTitle title="Việc làm mới nhất" />
          <div className="dashboard-job-grid">
            {brandJobs.slice(0, 4).map((job) => <DashboardJobCard job={job} key={job.title} navigate={navigate} />)}
          </div>
          <SectionTitle title="Công ty nổi bật" />
          <div className="featured-company-row">
            {companies.slice(0, 3).map(([name, sub, rating]) => <CompanyMiniCard name={name} sub={sub} rating={rating} key={name} />)}
          </div>
        </section>
        <aside>
          <SectionTitle title="Đề xuất cho bạn" action="Xem tất cả" />
          <div className="recommend-stack">
            {similarJobs.slice(0, 4).map((job) => <SimilarJobCard job={job} key={job[1]} navigate={navigate} />)}
          </div>
        </aside>
      </div>
    </section>
  );
}

function JobSearchPage({ navigate }: Pick<CandidatePageProps, "navigate">) {
  return (
    <section className="cportal-shell job-search-page">
      <div className="search-hero">
        <label><Search size={23} /><input value="Tìm công việc, vị trí, công ty..." readOnly /></label>
        <label><MapPin size={22} /><input value="Chọn địa điểm" readOnly /><ChevronDown size={18} /></label>
        <label><BriefcaseBusiness size={22} /><input value="Loại công việc" readOnly /></label>
        <button>Tìm việc ngay</button>
      </div>
      <div className="job-search-layout">
        <FilterSidebar />
        <main>
          <div className="listing-head"><h2>Hiển thị: <b>125 việc làm</b></h2><button>Sắp xếp theo: <b>Phù hợp nhất</b> <ChevronDown size={16} /></button></div>
          <div className="job-list-stack">
            {brandJobs.map((job) => <JobListCard job={job} key={job.title} navigate={navigate} />)}
          </div>
        </main>
      </div>
    </section>
  );
}

function JobDetailPage({ navigate }: Pick<CandidatePageProps, "navigate">) {
  return (
    <section className="cportal-shell detail-layout">
      <button className="back-button" onClick={() => navigate("/candidate/jobs")}><ChevronLeft size={16} /> Trở về</button>
      <div className="detail-grid">
        <article className="job-detail-card">
          <Cover />
          <div className="detail-company-logo">FPT</div>
          <div className="detail-title-row">
            <div>
              <h1>Fresher Java Developer</h1>
              <p>FPT Software · Khu Công Nghệ Cao, TP.HCM · 2 ngày trước</p>
            </div>
            <button className="apply-now" onClick={() => navigate("/candidate/apply")}>Ứng tuyển ngay</button>
            <button className="message-btn">Nhắn tin</button>
            <button className="ghost-more"><MoreVertical size={20} /></button>
          </div>
          <div className="job-facts">
            {["Kinh nghiệm|Dưới 1 năm", "Cấp bậc|Fresher", "Loại hình|Full Time", "Mức lương|10 - 15 Triệu/tháng"].map((item) => {
              const [k, v] = item.split("|");
              return <div key={k}><span>{k}</span><strong>{v}</strong></div>;
            })}
          </div>
          <JobDescription />
        </article>
        <aside className="similar-panel">
          <h2>Việc làm tương tự</h2>
          {similarJobs.map((job) => <SimilarJobCard job={job} key={job[1]} navigate={navigate} />)}
        </aside>
      </div>
    </section>
  );
}

function ApplicationPage({ navigate }: Pick<CandidatePageProps, "navigate">) {
  return (
    <section className="application-page">
      <button className="back-button" onClick={() => navigate("/candidate/jobs/fresher-java")}><ChevronLeft size={16} /> Back</button>
      <article className="application-card">
        <Cover />
        <div className="detail-company-logo">u.</div>
        <h1>Passionate Programmer</h1>
        <p>UIHUT Technologies LLC · Sylhet, BD · 3 days ago</p>
        <hr />
        <h2>Submit Your Application</h2>
        <hr />
        <div className="application-upload-row">
          <div><label>Linkedin Profile</label><button className="linkedin-btn">in <span>Apply With Linkedin</span></button></div>
          <div><label>Resume/CV*</label><button className="attach-btn"><Paperclip size={22} /> Attach Resume/CV</button></div>
        </div>
        <hr />
        <form className="application-form">
          <label className="field active"><span>First Name</span><input value="Jubed" readOnly /></label>
          <label className="field"><input placeholder="Last Name" /></label>
          <div className="phone-row"><button type="button">+62 <ChevronDown size={15} /></button><label className="field"><input placeholder="Phone Number" /></label></div>
          <label className="field select"><input placeholder="Your Country" /><ChevronDown size={17} /></label>
          <label className="field mail"><input placeholder="Mail Address" /><span>@gmail.com</span></label>
          <label className="bio-field"><span>Short Bio</span><textarea placeholder="Hello my name..." /></label>
          <label className="terms"><input type="checkbox" /> I agree with terms & conditions</label>
          <button className="submit-application" type="button">Submit Application</button>
        </form>
      </article>
    </section>
  );
}

function CompanyDetailPage({ navigate }: Pick<CandidatePageProps, "navigate">) {
  return (
    <section className="cportal-shell company-detail-page">
      <button className="back-button" onClick={() => navigate("/candidate")}><ChevronLeft size={16} /> Back</button>
      <div className="company-detail-layout">
        <main>
          <article className="company-profile-card">
            <Cover />
            <div className="company-profile-main">
              <div className="detail-company-logo">u.</div>
              <h1>UIHUT</h1>
              <p>UIHUT Technologies LLC · Sylhet, BD</p>
              <span>Design Resources platform · 203,765 Followers</span>
              <div className="follower-row"><i /><i /><i /><b>+34</b><button><Plus size={16} /> Follow</button></div>
            </div>
          </article>
          <div className="company-tabs">{["About", "Jobs", "Products", "Employees", "Locations", "Reviews"].map((tab) => <button className={tab === "Jobs" ? "active" : ""} key={tab}>{tab}</button>)}</div>
          <article className="company-jobs-card">
            <div className="company-job-search"><label><Search size={22} /><input value="Search Job title or Keyword" readOnly /></label><button>Search</button><button className="alert-btn"><Bell size={17} /> Creat Job alert</button></div>
            <h2>Recently Posted Job</h2>
            <div className="company-job-grid">
              {[1, 2, 3, 4].map((item) => <SmallCompanyJob key={item} />)}
            </div>
            <button className="see-all-jobs">See All Jobs</button>
          </article>
        </main>
        <aside>
          <h2>Smiller Companies</h2>
          {companies.map(([name, sub, rating]) => <CompanyFollowRow name={name} sub={sub} rating={rating} key={name} />)}
        </aside>
      </div>
    </section>
  );
}

function Cover() {
  return <div className="abstract-cover" />;
}

function SectionTitle({ title, action }: { title: string; action?: string }) {
  return <div className="section-title"><h2>{title}</h2>{action && <button>{action} <ChevronDown size={15} /></button>}</div>;
}

function DashboardJobCard({ job, navigate }: { job: typeof brandJobs[number]; navigate: (path: string) => void }) {
  return (
    <article className="dashboard-job-card">
      <div className="job-card-head"><LogoBadge text={job.logo} /><div><h3>{job.title}</h3><Tags tags={job.tags.slice(0, 3)} /></div><MoreVertical size={18} /></div>
      <p>Tại {job.company}, chúng tôi mang đến cơ hội tham gia các dự án tốt và phát triển trong môi trường quốc tế chuyên nghiệp.</p>
      <div className="job-card-meta"><span>Full Time</span><span>{job.applicants} lượt</span><span>Còn 3 ngày</span></div>
      <footer><strong>{job.salary}</strong><button onClick={() => navigate("/candidate/apply")}>Ứng tuyển ngay</button></footer>
    </article>
  );
}

function JobListCard({ job, navigate }: { job: typeof brandJobs[number]; navigate: (path: string) => void }) {
  return (
    <article className="job-list-card">
      <LogoBadge text={job.logo} />
      <div className="job-list-body">
        <div><h3 onClick={() => navigate("/candidate/jobs/fresher-java")}>{job.title}</h3><button>Lưu <Bookmark size={15} fill="currentColor" /></button></div>
        <p>{job.company} · {job.place} · {job.days}</p>
        <span>Chúng tôi đang tìm kiếm những lập trình viên trẻ, đam mê công nghệ, sẵn sàng học hỏi từ chương trình đào tạo chuyên sâu và mong muốn phát triển sự nghiệp.</span>
        <Tags tags={job.tags} />
        <footer><strong>{job.salary}</strong><em>{job.applicants} Người ứng tuyển</em><button className="message-btn">Nhắn tin</button><button className="apply-now" onClick={() => navigate("/candidate/apply")}>Ứng tuyển ngay</button></footer>
      </div>
    </article>
  );
}

function SimilarJobCard({ job, navigate }: { job: string[]; navigate: (path: string) => void }) {
  return (
    <article className="similar-job-card">
      <LogoBadge text={job[0]} small />
      <div><h3>{job[1]}</h3><p>{job[2]}</p><span>{job[4]}</span></div>
      <strong>{job[3]}</strong>
      <footer><button><Bookmark size={15} fill="currentColor" /></button><button onClick={() => navigate("/candidate/jobs/fresher-java")}>Xem</button></footer>
    </article>
  );
}

function LogoBadge({ text, small = false }: { text: string; small?: boolean }) {
  return <div className={small ? "logo-badge small" : "logo-badge"}>{text}</div>;
}

function Tags({ tags }: { tags: string[] }) {
  return <div className="tag-list">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>;
}

function FilterSidebar() {
  const groups = [
    ["Loại hình", ["Full Time", "Part Time", "Internship", "Freelance", "Remote", "Co-founder", "Contract"]],
    ["Kinh nghiệm", ["Senior Level", "Entry Level", "Mid Level", "Student Level", "Directors", "VP or Above", "Contract"]],
    ["Salary Range", ["$0 - $100", "$101 - $200", "$201 - $500", "$501 - $750", "$751 - $1000", "$1000 Above"]],
  ];
  return (
    <aside className="filter-sidebar">
      <article><h3>Đăng ký nhận việc</h3><p>Nhận thông báo ngay khi có việc làm mới phù hợp với bạn.</p><input value="Nhập email của bạn" readOnly /><button>Tạo thông báo</button></article>
      {groups.map(([title, items]) => (
        <section key={title as string}><h3>{title as string}<ChevronDown size={16} /></h3>{(items as string[]).map((item, index) => <label key={item}><span className={index === 0 ? "checked" : ""} /> {item}<b>{index === 0 ? "103" : "142"}</b></label>)}</section>
      ))}
      {["Location", "Language", "Facility"].map((item) => <section className="collapsed-filter" key={item}><h3>{item}<ChevronDown size={16} /></h3></section>)}
    </aside>
  );
}

function JobDescription() {
  const duties = [
    "Tham gia phát triển, bảo trì và tối ưu hóa các ứng dụng Web/Mobile sử dụng ngôn ngữ Java.",
    "Viết code sạch, dễ bảo trì và tuân thủ các quy chuẩn coding của dự án.",
    "Phối hợp chặt chẽ với BA, Tester, PM theo mô hình Agile/Scrum.",
    "Tham gia review code, viết Unit Test để đảm bảo chất lượng sản phẩm đầu ra.",
    "Báo cáo tiến độ công việc và các vấn đề phát sinh cho Technical Leader.",
  ];
  const skills = [
    "Sinh viên năm cuối hoặc mới tốt nghiệp Đại học/Cao đẳng chuyên ngành CNTT, Phần mềm.",
    "Có kiến thức nền tảng về OOP, Cấu trúc dữ liệu & Giải thuật.",
    "Nắm vững Java Core. Biết về Spring Boot, Hibernate là lợi thế lớn.",
    "Có kiến thức cơ bản về Cơ sở dữ liệu SQL, MySQL, Oracle.",
    "Tư duy logic tốt, chủ động, ham học hỏi và chịu được áp lực công việc.",
  ];
  return (
    <div className="job-description">
      <h2>Mô tả chi tiết</h2>
      <p>Gia nhập FPT Software với vai trò Fresher Java, bạn sẽ được tham gia trực tiếp vào các dự án phần mềm quy mô lớn với khách hàng từ Mỹ, Nhật Bản, Châu Âu. Đây là cơ hội tuyệt vời để đào tạo bài bản theo quy trình chuẩn quốc tế.</p>
      <h3>Trách nhiệm công việc</h3>
      <ul>{duties.map((duty) => <li key={duty}>{duty}</li>)}</ul>
      <h3>Yêu cầu kỹ năng (Qualifications and Skill Sets)</h3>
      <ul>{skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
      <h3>About The Company</h3>
      <div className="about-company-row"><LogoBadge text="u." /><div><strong>UIHUT</strong><p>203,765 Followers</p></div><button><Plus size={16} /> Follow</button></div>
      <p>UIHUT is a design and coding resources platform for designers, developers and entrepreneurs. We’re building a digital marketplace to simplify the creation of websites, apps and software on any device.</p>
    </div>
  );
}

function CompanyMiniCard({ name, sub, rating }: { name: string; sub: string; rating: string }) {
  return <article className="company-mini-card"><LogoBadge text={name} small /><h3>{name} Inc.</h3><p>⭐ {rating}</p><span>New york, USA</span><span>05 Job Vacancy</span><button>See All</button></article>;
}

function CompanyFollowRow({ name, sub, rating }: { name: string; sub: string; rating: string }) {
  return <article className="company-follow-row"><LogoBadge text={name} small /><div><h3>{name}</h3><p>{sub}</p></div><span>⭐ {rating}</span><button><Plus size={16} /> Follow</button></article>;
}

function SmallCompanyJob() {
  return <article className="small-company-job"><div><LogoBadge text="u." /><div><h3>Junior UI Designer</h3><Tags tags={["PHP", "Laravel", "CSS"]} /></div><MoreVertical size={18} /></div><p>Here at UIHUT, we are a passionate, fun-loving, growing team. We are looking for passionate programmers who want to solve.</p><footer><strong>$15k-20k/month</strong><button>Apply Now</button></footer></article>;
}

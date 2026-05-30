import {
  Bell,
  Bookmark,
  BookOpenCheck,
  Building2,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  Clock3,
  Code2,
  FileText,
  GraduationCap,
  Heart,
  LineChart,
  Mail,
  MapPin,
  MoreVertical,
  Navigation,
  Plus,
  Quote,
  Radar,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Target,
  Trophy,
  UploadCloud,
  UsersRound,
  Video,
  WandSparkles,
} from 'lucide-react';
import { useMemo } from 'react';
import { upnextLogo } from '../../brand';

type CandidatePageProps = {
  path: string;
  navigate: (path: string) => void;
};

type Job = {
  id: string;
  logo: string;
  company: string;
  title: string;
  place: string;
  salary: string;
  days: string;
  applicants: string;
  tags: string[];
  trust: number;
  mode: string;
  experience: string;
  level: string;
  deadline: string;
  reason: string;
};

const navItems = [
  ['Trang chủ', '/candidate'],
  ['Tìm việc', '/candidate/jobs'],
  ['Hồ sơ & CV', '/candidate/profile'],
  ['Ứng tuyển', '/candidate/applications'],
  ['AI Interview', '/candidate/ai'],
];

const profile = {
  name: 'Bình Phan',
  role: 'Frontend Developer',
  location: 'TP. Hồ Chí Minh',
  status: 'Đang tìm việc',
  cv: 'CV_Frontend_BinhPhan_2026.pdf',
  completeness: 86,
};

const jobs: Job[] = [
  {
    id: 'react-fintech',
    logo: 'M',
    company: 'MoMo',
    title: 'Frontend Developer - React',
    place: 'Quận 7, TP.HCM',
    salary: '25 - 40 triệu/tháng',
    days: '2 ngày trước',
    applicants: '42',
    tags: ['React', 'TypeScript', 'Design System', 'Fintech'],
    trust: 96,
    mode: 'Hybrid',
    experience: '2 - 4 năm',
    level: 'Middle',
    deadline: 'Còn 5 ngày',
    reason:
      'Dựa trên bộ lọc React, TypeScript và kinh nghiệm dashboard fintech bạn đang quan tâm.',
  },
  {
    id: 'java-fresher',
    logo: 'FPT',
    company: 'FPT Software',
    title: 'Fresher Java Developer',
    place: 'Khu Công Nghệ Cao, TP.HCM',
    salary: '10 - 15 triệu/tháng',
    days: '1 ngày trước',
    applicants: '40',
    tags: ['Java', 'Spring Boot', 'SQL', 'OOP'],
    trust: 92,
    mode: 'Full Time',
    experience: 'Dưới 1 năm',
    level: 'Fresher',
    deadline: 'Còn 7 ngày',
    reason:
      'Phù hợp với nền tảng Java, OOP và mong muốn vào chương trình đào tạo Fresher.',
  },
  {
    id: 'ai-engineer',
    logo: 'V',
    company: 'Viettel High Tech',
    title: 'AI Engineer - NLP',
    place: 'Cầu Giấy, Hà Nội',
    salary: '30 - 55 triệu/tháng',
    days: '3 ngày trước',
    applicants: '28',
    tags: ['Python', 'LLM', 'NLP', 'MLOps'],
    trust: 90,
    mode: 'On-site',
    experience: '2+ năm',
    level: 'Middle',
    deadline: 'Còn 4 ngày',
    reason:
      'Có nền tảng Python tốt, cần bổ sung thêm dự án production về LLM/MLOps.',
  },
  {
    id: 'qa-automation',
    logo: 'TIKI',
    company: 'Tiki',
    title: 'QA Automation Engineer',
    place: 'Tân Bình, TP.HCM',
    salary: '20 - 32 triệu/tháng',
    days: '4 ngày trước',
    applicants: '35',
    tags: ['Playwright', 'API Test', 'CI/CD', 'Agile'],
    trust: 88,
    mode: 'Remote',
    experience: '1 - 3 năm',
    level: 'Junior/Middle',
    deadline: 'Còn 6 ngày',
    reason:
      'Khớp với test automation và CI/CD, thiếu một chút kinh nghiệm API contract testing.',
  },
  {
    id: 'devops-cloud',
    logo: 'VN',
    company: 'VNPay',
    title: 'DevOps Engineer - Cloud',
    place: 'Nam Từ Liêm, Hà Nội',
    salary: '35 - 60 triệu/tháng',
    days: '5 ngày trước',
    applicants: '31',
    tags: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
    trust: 94,
    mode: 'Hybrid',
    experience: '3+ năm',
    level: 'Senior',
    deadline: 'Còn 3 ngày',
    reason:
      'Phù hợp nếu bạn muốn chuyển hướng cloud, cần CV nhấn mạnh Kubernetes và Terraform hơn.',
  },
];

const companies = [
  ['FPT Software', 'Doanh nghiệp ưu tú', '92', '56 vị trí IT'],
  ['MoMo', 'Doanh nghiệp ưu tú', '96', '24 vị trí IT'],
  ['Viettel High Tech', 'Tin cậy', '90', '18 vị trí IT'],
  ['VNPay', 'Tin cậy', '94', '22 vị trí IT'],
  ['Tiki', 'Tin cậy', '88', '13 vị trí IT'],
  ['Techcombank', 'Doanh nghiệp ưu tú', '91', '19 vị trí IT'],
];

const applicationSteps = [
  'Đã nộp',
  'Đã xem',
  'Sàng lọc',
  'Hẹn phỏng vấn',
  'Trúng tuyển',
];

const stats = [
  ['23', 'Việc gợi ý', 'Theo CV mặc định', 'mint', Target],
  ['4', 'Hồ sơ đang xử lý', '2 hồ sơ đã xem', 'pink', UsersRound],
  ['2', 'Lịch phỏng vấn', 'Tuần này', 'yellow', CalendarCheck],
  ['86%', 'Hồ sơ hoàn thiện', 'CV mặc định sẵn sàng', 'lavender', FileText],
];

const homeCategories = [
  ['Frontend', '1.284 việc', Code2],
  ['Backend', '932 việc', Building2],
  ['Data & AI', '418 việc', Sparkles],
  ['DevOps', '356 việc', Radar],
  ['QA Automation', '291 việc', CheckCircle2],
  ['Product Design', '188 việc', Target],
];

const marketSignals = [
  ['Việc IT đang tuyển', '18.640', '+12.4% so với tuần trước'],
  ['Tin mới 24h', '1.208', 'Tăng mạnh ở Java, React, AI'],
  ['Công ty phản hồi nhanh', '742', 'Trung bình 2.3 ngày'],
];

const careerSteps = [
  ['Khởi động', 'Làm rõ mục tiêu, CV và portfolio', '0 - 6 tháng'],
  ['Tăng tốc', 'Ứng tuyển có chọn lọc, luyện phỏng vấn', '6 - 18 tháng'],
  ['Chuyên sâu', 'Chọn stack, tăng ownership dự án', '18 - 36 tháng'],
  ['Dẫn dắt', 'Mentor, system design, stakeholder', '3+ năm'],
];

const learningEvents = [
  [
    'Workshop AI Interview',
    'Thứ 5 · 20:00',
    'Luyện trả lời tình huống React/Java với bộ câu hỏi thực tế.',
  ],
  [
    'CV Clinic cho Fresher',
    'Thứ 7 · 09:30',
    'Mentor review CV, dự án cá nhân và headline LinkedIn.',
  ],
  [
    'Frontend Career Map',
    'Livestream',
    'Từ Junior lên Middle: scope công việc, cách chứng minh impact.',
  ],
];

export function CandidateHomePage({ path, navigate }: CandidatePageProps) {
  const route = normalizeCandidatePath(path);

  return (
    <main className="cportal">
      <CandidateTopNav path={route} navigate={navigate} />
      {route === '/candidate/jobs' && <JobSearchPage navigate={navigate} />}
      {route === '/candidate/jobs/fresher-java' && (
        <JobDetailPage navigate={navigate} />
      )}
      {route === '/candidate/apply' && <ApplicationPage navigate={navigate} />}
      {route === '/candidate/companies/uihut' && (
        <CompanyDetailPage navigate={navigate} />
      )}
      {route === '/candidate/profile' && <ProfileCvPage navigate={navigate} />}
      {route === '/candidate/applications' && (
        <ApplicationsPage navigate={navigate} />
      )}
      {route === '/candidate/ai' && <AiInterviewPage navigate={navigate} />}
      {route === '/candidate' && <DashboardPage navigate={navigate} />}
    </main>
  );
}

function normalizeCandidatePath(path: string) {
  if (path === '/' || path === '/candidate/saved') return '/candidate';
  if (path === '/candidate/companies') return '/candidate/companies/uihut';
  if (
    path === '/candidate' ||
    path === '/candidate/jobs' ||
    path === '/candidate/jobs/fresher-java' ||
    path === '/candidate/apply' ||
    path === '/candidate/companies/uihut' ||
    path === '/candidate/profile' ||
    path === '/candidate/applications' ||
    path === '/candidate/history' ||
    path === '/candidate/ai'
  ) {
    return path === '/candidate/history' ? '/candidate/applications' : path;
  }
  return '/candidate';
}

function CandidateTopNav({ path, navigate }: CandidatePageProps) {
  return (
    <header className="cportal-topbar">
      <button className="cportal-logo" onClick={() => navigate('/candidate')}>
        <img src={upnextLogo.wordmark} alt="UpNext" />
      </button>
      <nav>
        {navItems.map(([label, href]) => (
          <button
            className={activeNav(path, href) ? 'active' : ''}
            key={href}
            onClick={() => navigate(href)}
          >
            {label}
          </button>
        ))}
      </nav>
      <div className="cportal-actions">
        <button
          className="post-job"
          onClick={() => navigate('/candidate/profile')}
        >
          <Plus size={17} /> Tạo CV
        </button>
        <button className="icon-button">
          <Bell size={19} />
        </button>
        <button className="icon-button">
          <Mail size={19} />
        </button>
        <button className="candidate-avatar">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=80&q=80"
          />
          <ChevronDown size={16} />
        </button>
      </div>
    </header>
  );
}

function activeNav(path: string, href: string) {
  if (href === '/candidate') return path === '/candidate';
  if (href === '/candidate/jobs')
    return path.startsWith('/candidate/jobs') || path === '/candidate/apply';
  if (href === '/candidate/applications')
    return path === '/candidate/applications';
  return path === href;
}

function DashboardPage({ navigate }: Pick<CandidatePageProps, 'navigate'>) {
  return (
    <section className="upnext-home">
      <section className="home-hero">
        <div className="home-hero-copy">
          <span className="home-eyebrow">
            <Sparkles size={14} /> Nền tảng nghề nghiệp IT cho Việt Nam
          </span>
          <h1>
            Sự nghiệp IT <span>bứt phá</span> mỗi ngày.
          </h1>
          <p>
            AI gợi việc thông minh, lộ trình rõ ràng và cộng đồng dev cùng tiến
            xa hơn. UpNext giúp bạn tìm việc có chiến lược, không rải CV theo
            may rủi.
          </p>
          <div className="home-search-panel">
            <label>
              <Search size={20} />
              <input
                value="React, Java, AI Engineer, QA Automation..."
                readOnly
              />
            </label>
            <label>
              <MapPin size={20} />
              <input value="TP.HCM, Hà Nội, Remote" readOnly />
            </label>
            <button onClick={() => navigate('/candidate/jobs')}>
              Tìm việc ngay
            </button>
          </div>
          <div className="home-quick-filters">
            {[
              'Frontend',
              'Fresher',
              'Remote',
              'Fintech',
              'AI/ML',
              'Lương 30M+',
            ].map((item) => (
              <button key={item}>{item}</button>
            ))}
          </div>
        </div>
        <div
          className="home-hero-visual"
          aria-label="Bảng gợi ý việc làm UpNext"
        >
          <div className="hero-photo-card">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80"
              alt="Ứng viên IT đang làm việc trên laptop"
            />
          </div>
          <div className="hero-float-card score">
            <span>Hồ sơ của bạn</span>
            <strong>86%</strong>
            <p>Đủ thông tin để ứng tuyển nhanh</p>
            <i>
              <b style={{ width: '86%' }} />
            </i>
          </div>
          <div className="hero-float-card salary">
            <span>Insight lương</span>
            <strong>25 - 40 triệu</strong>
            <p>Frontend Middle tại TP.HCM</p>
          </div>
          <div className="hero-interview-card">
            <Clock3 size={18} />
            <div>
              <b>Phỏng vấn sắp tới</b>
              <span>MoMo · Thứ Sáu 09:30</span>
            </div>
          </div>
        </div>
      </section>

      <section className="home-brand-strip" aria-label="Công ty đang tuyển">
        {companies.map(([name, , rating, vacancy]) => (
          <button
            key={name}
            onClick={() => navigate('/candidate/companies/uihut')}
          >
            <LogoBadge text={name} small />
            <span>{name}</span>
            <b>{vacancy}</b>
            <em>Uy tín {rating}</em>
          </button>
        ))}
      </section>

      <section className="home-personal-grid">
        <article className="home-profile-brief">
          <span className="home-eyebrow">Dành riêng cho {profile.name}</span>
          <h2>
            Hồ sơ đang nhắm tới {profile.role} tại {profile.location}.
          </h2>
          <p>
            Không tính điểm cho mọi job post. UpNext chỉ phân tích CV/JD khi bạn
            mở chi tiết hoặc chuẩn bị ứng tuyển.
          </p>
          <button onClick={() => navigate('/candidate/profile')}>
            Hoàn thiện hồ sơ
          </button>
        </article>
        <article className="home-mini-tile green">
          <Target size={24} />
          <strong>23</strong>
          <span>Việc nên xem hôm nay</span>
        </article>
        <article className="home-mini-tile purple">
          <Navigation size={24} />
          <strong>7 km</strong>
          <span>Việc gần bạn nhất</span>
        </article>
        <article className="home-mini-tile amber">
          <CalendarCheck size={24} />
          <strong>2</strong>
          <span>Lịch phỏng vấn tuần này</span>
        </article>
        <article className="home-company-radar">
          <h3>Công ty đang tuyển mạnh</h3>
          {companies.slice(0, 4).map(([name, , rating, vacancy]) => (
            <p key={name}>
              <span>{name}</span>
              <b>{vacancy}</b>
              <em>{rating}/100</em>
            </p>
          ))}
        </article>
      </section>

      <HomeSectionHeader
        eyebrow="Thị trường hôm nay"
        title="Đọc tín hiệu trước khi rải CV"
        action="Xem báo cáo"
        onClick={() => navigate('/candidate/jobs')}
      />
      <section className="home-market-board">
        <div className="market-left">
          {marketSignals.map(([label, value, note]) => (
            <article key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <p>{note}</p>
            </article>
          ))}
        </div>
        <div className="market-chart">
          <div>
            <h3>Tăng trưởng nhu cầu theo stack</h3>
            <button>
              <SlidersHorizontal size={16} /> Ngành IT
            </button>
          </div>
          {[
            ['React / Next.js', 82],
            ['Java / Spring', 74],
            ['Python / AI', 68],
            ['DevOps / Cloud', 61],
            ['QA Automation', 54],
          ].map(([label, value]) => (
            <p key={label as string}>
              <span>{label as string}</span>
              <i>
                <b style={{ width: `${value}%` }} />
              </i>
              <em>{value}%</em>
            </p>
          ))}
        </div>
        <aside className="market-salary-card">
          <LineChart size={24} />
          <span>Mức lương phổ biến</span>
          <strong>22 - 35 triệu</strong>
          <p>
            Middle Frontend, 2-4 năm, sản phẩm SaaS/Fintech tại Hà Nội và
            TP.HCM.
          </p>
        </aside>
      </section>

      <HomeSectionHeader
        eyebrow="Việc làm nổi bật"
        title="Chọn ít hơn, đọc kỹ hơn, ứng tuyển chắc hơn"
        action="Xem tất cả việc làm"
        onClick={() => navigate('/candidate/jobs')}
      />
      <section className="home-featured-jobs">
        <article
          className="home-lead-job"
          onClick={() => navigate('/candidate/jobs/fresher-java')}
        >
          <LogoBadge text={jobs[0].logo} />
          <span>
            {jobs[0].company} · {jobs[0].mode}
          </span>
          <h3>{jobs[0].title}</h3>
          <p>{jobs[0].reason}</p>
          <Tags tags={jobs[0].tags.slice(0, 4)} />
          <footer>
            <strong>{jobs[0].salary}</strong>
            <button
              onClick={(event) => {
                event.stopPropagation();
                navigate('/candidate/apply');
              }}
            >
              Ứng tuyển
            </button>
          </footer>
        </article>
        <div className="home-job-stack">
          {jobs.slice(1, 5).map((job) => (
            <HomepageJobRow job={job} key={job.id} navigate={navigate} />
          ))}
        </div>
      </section>

      <section className="home-nearby-section">
        <div>
          <span className="home-eyebrow">
            <MapPin size={14} /> Việc gần bạn
          </span>
          <h2>Bản đồ cơ hội quanh TP.HCM, Hà Nội và remote.</h2>
          <p>
            Gợi ý khoảng cách chỉ dùng để lọc trải nghiệm tìm kiếm; bạn vẫn kiểm
            soát địa điểm, hình thức làm việc và mức lương mong muốn.
          </p>
          <button onClick={() => navigate('/candidate/jobs')}>
            Mở bộ lọc địa điểm
          </button>
        </div>
        <div className="home-map-card">
          <span className="map-pin one">FPT</span>
          <span className="map-pin two">MoMo</span>
          <span className="map-pin three">VNPay</span>
          <span className="map-pin four">Tiki</span>
          <strong>Hà Nội · TP.HCM · Remote</strong>
        </div>
      </section>

      <HomeSectionHeader
        eyebrow="Lộ trình nghề nghiệp"
        title="Không chỉ tìm việc, UpNext giúp bạn biết bước tiếp theo"
      />
      <section className="home-career-path">
        {careerSteps.map(([title, desc, time], index) => (
          <article key={title}>
            <span>{index + 1}</span>
            <h3>{title}</h3>
            <p>{desc}</p>
            <em>{time}</em>
          </article>
        ))}
      </section>

      <section className="home-toolkit-section">
        <article>
          <span className="home-eyebrow">
            <FileText size={14} /> Hồ sơ & CV
          </span>
          <h2>Ứng tuyển nhanh nhưng không gửi hồ sơ cẩu thả.</h2>
          <p>
            Quản lý nhiều CV theo mục tiêu, tạo thư ứng tuyển AI, lưu lịch sử
            ứng tuyển và chuẩn bị câu trả lời trước khi vào vòng phỏng vấn.
          </p>
          <div className="toolkit-actions">
            <button onClick={() => navigate('/candidate/profile')}>
              Tạo CV
            </button>
            <button onClick={() => navigate('/candidate/ai')}>
              Luyện AI Interview
            </button>
          </div>
        </article>
        <div className="toolkit-card-grid">
          <article>
            <UploadCloud size={22} />
            <b>CV mặc định</b>
            <span>{profile.cv}</span>
          </article>
          <article>
            <WandSparkles size={22} />
            <b>Thư ứng tuyển AI</b>
            <span>Nhấn mạnh impact dự án, không viết chung chung.</span>
          </article>
          <article>
            <Video size={22} />
            <b>AI Interview</b>
            <span>Bộ câu hỏi theo JD, CV và level mục tiêu.</span>
          </article>
          <article>
            <ShieldCheck size={22} />
            <b>Công ty uy tín</b>
            <span>
              Lọc tin xác thực, phản hồi nhanh và lịch sử tuyển dụng rõ.
            </span>
          </article>
        </div>
      </section>

      <HomeSectionHeader
        eyebrow="Học tập · Sự kiện · Cộng đồng"
        title="Đừng tìm việc một mình"
        action="Xem lịch"
        onClick={() => navigate('/candidate/ai')}
      />
      <section className="home-community-grid">
        {learningEvents.map(([title, time, desc], index) => (
          <article key={title} className={index === 0 ? 'highlight' : ''}>
            <span>{time}</span>
            <h3>{title}</h3>
            <p>{desc}</p>
            <button>{index === 0 ? 'Đăng ký ngay' : 'Xem chi tiết'}</button>
          </article>
        ))}
        <aside>
          <BookOpenCheck size={28} />
          <h3>Cẩm nang IT Career</h3>
          <p>
            Checklist CV, câu hỏi phỏng vấn, mức lương theo stack và mẫu email
            phản hồi nhà tuyển dụng.
          </p>
        </aside>
      </section>

      <section className="home-proof-section">
        <article className="home-quote-card">
          <Quote size={32} />
          <p>
            UpNext giúp mình bớt rải CV đại trà. Mình dùng 2 CV khác nhau cho
            Frontend và Fullstack, theo dõi được từng vòng và chuẩn bị phỏng vấn
            kỹ hơn.
          </p>
          <div>
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
              alt="Ứng viên UpNext"
            />
            <span>Minh Châu · Frontend Developer</span>
          </div>
        </article>
        <div className="home-proof-stats">
          {[
            ['2.1 ngày', 'Phản hồi trung bình từ công ty xác thực'],
            ['18.640', 'Việc IT đang tuyển'],
            ['742', 'Công ty phản hồi nhanh'],
            ['96/100', 'Điểm uy tín cao nhất tuần'],
          ].map(([value, label]) => (
            <article key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="home-final-cta">
        <div>
          <span className="home-eyebrow">
            <Trophy size={14} /> Bắt đầu miễn phí
          </span>
          <h2>Sẵn sàng tìm việc IT có chiến lược hơn?</h2>
          <p>
            Tạo hồ sơ, lưu CV mặc định, chọn mục tiêu nghề nghiệp và bắt đầu với
            danh sách việc làm phù hợp bộ lọc của bạn.
          </p>
        </div>
        <button onClick={() => navigate('/candidate/profile')}>
          Tạo hồ sơ miễn phí
        </button>
      </section>

      <footer className="home-footer">
        <img src={upnextLogo.wordmark} alt="UpNext" />
        <nav>
          <button onClick={() => navigate('/candidate/jobs')}>Tìm việc</button>
          <button onClick={() => navigate('/candidate/profile')}>Tạo CV</button>
          <button onClick={() => navigate('/candidate/applications')}>
            Ứng tuyển
          </button>
          <button onClick={() => navigate('/auth')}>Đăng nhập</button>
        </nav>
        <p>
          © 2026 UpNext. Nền tảng tuyển dụng IT cho ứng viên và nhà tuyển dụng
          tại Việt Nam.
        </p>
      </footer>
    </section>
  );
}

function HomeSectionHeader({
  eyebrow,
  title,
  action,
  onClick,
}: {
  eyebrow: string;
  title: string;
  action?: string;
  onClick?: () => void;
}) {
  return (
    <div className="home-section-header">
      <div>
        <span>{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {action && <button onClick={onClick}>{action}</button>}
    </div>
  );
}

function HomepageJobRow({
  job,
  navigate,
}: {
  job: Job;
  navigate: (path: string) => void;
}) {
  return (
    <article
      className="home-job-row"
      onClick={() => navigate('/candidate/jobs/fresher-java')}
    >
      <LogoBadge text={job.logo} small />
      <div>
        <h3>{job.title}</h3>
        <p>
          {job.company} · {job.place} · {job.days}
        </p>
        <Tags tags={job.tags.slice(0, 3)} />
      </div>
      <strong>{job.salary}</strong>
      <button
        onClick={(event) => {
          event.stopPropagation();
          navigate('/candidate/apply');
        }}
      >
        Ứng tuyển
      </button>
    </article>
  );
}

type JobQuery = {
  keyword: string;
  position: string;
  location: string;
  type: string;
};

function filterJobs(source: Job[], query: JobQuery) {
  const keyword = query.keyword.toLowerCase();
  const position = query.position.toLowerCase();
  const location = query.location.toLowerCase();
  const type = query.type.toLowerCase();

  return source.filter((job) => {
    if (keyword) {
      const haystack = [job.title, job.company, ...job.tags]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(keyword)) return false;
    }
    if (position) {
      const haystack = [job.title, job.level, ...job.tags]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(position)) return false;
    }
    if (location && location !== 'remote') {
      // Match on the city part, ignoring the generic "remote" filter.
      const city = location.split(',')[0]?.trim() ?? location;
      if (!job.place.toLowerCase().includes(city)) return false;
    }
    if (location === 'remote' && !job.mode.toLowerCase().includes('remote')) {
      return false;
    }
    if (type) {
      const normalizedType = type
        .replace('toàn thời gian', 'full')
        .replace('bán thời gian', 'part')
        .replace('thực tập', 'intern');
      if (!job.mode.toLowerCase().includes(normalizedType.split(' ')[0])) {
        return false;
      }
    }
    return true;
  });
}

function JobSearchPage({ navigate }: Pick<CandidatePageProps, 'navigate'>) {
  const query = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      keyword: params.get('keyword')?.trim() ?? '',
      position: params.get('position')?.trim() ?? '',
      location: params.get('location')?.trim() ?? '',
      type: params.get('type')?.trim() ?? '',
    };
  }, []);

  const results = useMemo(() => filterJobs(jobs, query), [query]);
  const hasQuery = Boolean(
    query.keyword || query.position || query.location || query.type,
  );

  const keywordValue =
    [query.keyword, query.position].filter(Boolean).join(', ') ||
    'React, TypeScript, Frontend...';
  const locationValue = query.location || 'Tất cả địa điểm';
  const typeValue = query.type || 'Tất cả hình thức';

  return (
    <section className="cportal-shell job-search-page">
      <div className="search-hero">
        <label>
          <Search size={23} />
          <input value={keywordValue} readOnly />
        </label>
        <label>
          <MapPin size={22} />
          <input value={locationValue} readOnly />
          <ChevronDown size={18} />
        </label>
        <label>
          <Target size={22} />
          <input value={typeValue} readOnly />
        </label>
        <button onClick={() => navigate('/candidate/jobs')}>
          Tìm việc ngay
        </button>
      </div>
      {hasQuery && (
        <div className="search-active-filters">
          <span>Bộ lọc đang áp dụng:</span>
          {query.keyword && <b>Từ khóa: {query.keyword}</b>}
          {query.position && <b>Vị trí: {query.position}</b>}
          {query.location && <b>Địa điểm: {query.location}</b>}
          {query.type && <b>Hình thức: {query.type}</b>}
          <button onClick={() => navigate('/candidate/jobs')}>
            Xóa bộ lọc
          </button>
        </div>
      )}
      <div className="job-search-layout">
        <FilterSidebar />
        <main>
          <div className="listing-head">
            <h2>
              Hiển thị: <b>{results.length} việc làm phù hợp bộ lọc</b>
            </h2>
            <button>
              Sắp xếp theo: <b>Mới nhất</b> <ChevronDown size={16} />
            </button>
          </div>
          <div className="job-list-stack">
            {results.length > 0 ? (
              results.map((job) => (
                <JobListCard job={job} key={job.id} navigate={navigate} />
              ))
            ) : (
              <div className="job-empty-state">
                <Search size={32} />
                <h3>Chưa có việc làm khớp bộ lọc hiện tại</h3>
                <p>
                  Thử nới rộng từ khóa, địa điểm hoặc hình thức làm việc để xem
                  thêm cơ hội.
                </p>
                <button onClick={() => navigate('/candidate/jobs')}>
                  Xem tất cả việc làm
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </section>
  );
}

function JobDetailPage({ navigate }: Pick<CandidatePageProps, 'navigate'>) {
  const job = jobs[1];
  return (
    <section className="cportal-shell detail-layout">
      <button
        className="back-button"
        onClick={() => navigate('/candidate/jobs')}
      >
        <ChevronLeft size={16} /> Trở về danh sách
      </button>
      <div className="detail-grid">
        <article className="job-detail-card">
          <Cover />
          <div className="detail-company-logo">{job.logo}</div>
          <div className="detail-title-row">
            <div>
              <h1>{job.title}</h1>
              <p>
                {job.company} · {job.place} · {job.days}
              </p>
            </div>
            <button
              className="apply-now"
              onClick={() => navigate('/candidate/apply')}
            >
              Ứng tuyển nhanh
            </button>
            <button className="message-btn">Nhắn tin</button>
            <button className="ghost-more">
              <MoreVertical size={20} />
            </button>
          </div>
          <div className="job-facts">
            {[
              ['Phân tích CV', 'Theo yêu cầu'],
              ['Kinh nghiệm', job.experience],
              ['Loại hình', job.mode],
              ['Mức lương', job.salary],
            ].map(([k, v]) => (
              <div key={k}>
                <span>{k}</span>
                <strong>{v}</strong>
              </div>
            ))}
          </div>
          <CvJdInsight />
          <JobDescription />
        </article>
        <aside className="similar-panel">
          <h2>Việc làm tương tự</h2>
          {jobs
            .filter((item) => item.id !== job.id)
            .map((item) => (
              <SimilarJobCard job={item} key={item.id} navigate={navigate} />
            ))}
        </aside>
      </div>
    </section>
  );
}

function ApplicationPage({ navigate }: Pick<CandidatePageProps, 'navigate'>) {
  const job = jobs[1];
  return (
    <section className="application-page">
      <button
        className="back-button"
        onClick={() => navigate('/candidate/jobs/fresher-java')}
      >
        <ChevronLeft size={16} /> Quay lại chi tiết việc làm
      </button>
      <article className="application-card">
        <Cover />
        <div className="detail-company-logo">{job.logo}</div>
        <h1>Ứng tuyển {job.title}</h1>
        <p>
          {job.company} · {job.place} · Dùng CV mặc định: {profile.cv}
        </p>
        <hr />
        <h2>Hồ sơ gửi cho nhà tuyển dụng</h2>
        <div className="application-upload-row">
          <div>
            <label>CV mặc định</label>
            <button className="linkedin-btn">
              <FileText size={21} /> <span>{profile.cv}</span>
            </button>
          </div>
          <div>
            <label>Tải CV khác</label>
            <button className="attach-btn">
              <UploadCloud size={22} /> PDF/DOCX tối đa 10MB
            </button>
          </div>
        </div>
        <hr />
        <div className="application-helper">
          <Sparkles size={18} />
          <div>
            <strong>Thư ứng tuyển AI</strong>
            <p>
              UpNext đã tạo nháp thư ứng tuyển nhấn mạnh Java Core, SQL và tinh
              thần học nhanh. Bạn có thể chỉnh trước khi gửi.
            </p>
          </div>
          <button>Chỉnh sửa</button>
        </div>
        <form className="application-form">
          <label className="field active">
            <span>Họ và tên</span>
            <input value={profile.name} readOnly />
          </label>
          <label className="field">
            <input value={profile.role} readOnly />
          </label>
          <div className="phone-row">
            <button type="button">
              +84 <ChevronDown size={15} />
            </button>
            <label className="field">
              <input placeholder="Số điện thoại" />
            </label>
          </div>
          <label className="field select">
            <input value={profile.location} readOnly />
            <ChevronDown size={17} />
          </label>
          <label className="field mail">
            <input value="binh.phan" readOnly />
            <span>@gmail.com</span>
          </label>
          <label className="bio-field">
            <span>Câu hỏi sàng lọc</span>
            <textarea defaultValue="Tôi có nền tảng Java Core, OOP, SQL và đã hoàn thành 2 dự án backend nhỏ dùng Spring Boot. Tôi có thể bắt đầu làm việc sau 2 tuần." />
          </label>
          <label className="terms">
            <input type="checkbox" defaultChecked /> Tôi đồng ý gửi CV, thông
            tin liên hệ và thư ứng tuyển cho nhà tuyển dụng này.
          </label>
          <button className="submit-application" type="button">
            Gửi hồ sơ ứng tuyển
          </button>
        </form>
      </article>
    </section>
  );
}

function CompanyDetailPage({ navigate }: Pick<CandidatePageProps, 'navigate'>) {
  return (
    <section className="cportal-shell company-detail-page">
      <button className="back-button" onClick={() => navigate('/candidate')}>
        <ChevronLeft size={16} /> Quay lại
      </button>
      <div className="company-detail-layout">
        <main>
          <article className="company-profile-card">
            <Cover />
            <div className="company-profile-main">
              <div className="detail-company-logo">FPT</div>
              <h1>FPT Software</h1>
              <p>Doanh nghiệp ưu tú · Khu Công Nghệ Cao, TP.HCM</p>
              <span>
                Điểm uy tín 92/100 · 56 vị trí IT đang tuyển · phản hồi ứng viên
                trung bình 2.1 ngày
              </span>
              <div className="follower-row">
                <i />
                <i />
                <i />
                <b>+34</b>
                <button>
                  <Plus size={16} /> Theo dõi
                </button>
              </div>
            </div>
          </article>
          <div className="company-tabs">
            {[
              'Tổng quan',
              'Việc làm',
              'Đánh giá',
              'Văn hóa',
              'Phúc lợi',
              'Báo cáo',
            ].map((tab) => (
              <button className={tab === 'Việc làm' ? 'active' : ''} key={tab}>
                {tab}
              </button>
            ))}
          </div>
          <article className="company-jobs-card">
            <div className="company-job-search">
              <label>
                <Search size={22} />
                <input value="Tìm vị trí Java, React, QA..." readOnly />
              </label>
              <button>Tìm</button>
              <button className="alert-btn">
                <Bell size={17} /> Tạo cảnh báo
              </button>
            </div>
            <h2>Việc IT đang tuyển</h2>
            <div className="company-job-grid">
              {jobs.slice(0, 4).map((job) => (
                <SmallCompanyJob job={job} key={job.id} navigate={navigate} />
              ))}
            </div>
            <button className="see-all-jobs">Xem tất cả việc làm</button>
          </article>
        </main>
        <aside>
          <h2>Công ty tương tự</h2>
          {companies.map(([name, sub, rating, vacancy]) => (
            <CompanyFollowRow
              name={name}
              sub={sub}
              rating={rating}
              vacancy={vacancy}
              key={name}
            />
          ))}
        </aside>
      </div>
    </section>
  );
}

function ProfileCvPage({ navigate }: Pick<CandidatePageProps, 'navigate'>) {
  return (
    <section className="cportal-shell profile-cv-page">
      <div className="candidate-welcome">
        <div>
          <span>Hồ sơ & CV</span>
          <h1>
            Quản lý nhiều CV, trạng thái tìm việc và dữ liệu dùng cho phân tích
            CV/JD khi cần.
          </h1>
          <p className="page-date">
            CV mặc định sẽ được dùng cho ứng tuyển nhanh và AI Interview.
          </p>
        </div>
        <button>
          <UploadCloud size={17} /> Tải CV mới
        </button>
      </div>
      <div className="candidate-logic-grid">
        <article className="logic-panel primary">
          <h2>{profile.completeness}% hoàn thiện hồ sơ</h2>
          <p>
            Thiếu portfolio dự án và mức lương kỳ vọng. Hoàn thiện hồ sơ giúp
            tăng ưu tiên hiển thị với nhà tuyển dụng.
          </p>
          <div className="profile-progress">
            <span style={{ width: `${profile.completeness}%` }} />
          </div>
        </article>
        <article className="logic-panel">
          <h2>Trạng thái tìm việc</h2>
          <p>
            Đang tìm việc. Hồ sơ được phép xuất hiện trong ngân hàng CV và
            Talent Pool.
          </p>
          <button>Chuyển sang ngừng tìm</button>
        </article>
      </div>
      <div className="cportal-job-grid">
        <CvCard
          title="CV Frontend mặc định"
          desc="React, TypeScript, UI System, Dashboard"
          active
        />
        <CvCard
          title="CV Fresher Java"
          desc="Java Core, Spring Boot, SQL, OOP"
        />
      </div>
      <SectionTitle
        title="Việc nên ứng tuyển bằng CV mặc định"
        action="Xem thêm"
      />
      <div className="job-list-stack">
        {jobs.slice(0, 2).map((job) => (
          <JobListCard job={job} key={job.id} navigate={navigate} />
        ))}
      </div>
    </section>
  );
}

function ApplicationsPage({ navigate }: Pick<CandidatePageProps, 'navigate'>) {
  return (
    <section className="cportal-shell applications-page-v2">
      <SectionTitle
        title="Theo dõi hồ sơ đã nộp"
        action="Lọc theo trạng thái"
      />
      <div className="application-tracker-grid">
        {jobs.slice(0, 4).map((job, index) => (
          <article className="application-tracker-card" key={job.id}>
            <div>
              <LogoBadge text={job.logo} small />
              <div>
                <h3>{job.title}</h3>
                <p>
                  {job.company} · {job.days}
                </p>
              </div>
              <strong>{applicationSteps[Math.min(index + 1, 4)]}</strong>
            </div>
            <div className="application-steps">
              {applicationSteps.map((step, stepIndex) => (
                <span
                  className={stepIndex <= index + 1 ? 'done' : ''}
                  key={step}
                >
                  {step}
                </span>
              ))}
            </div>
            <p>
              {index === 2
                ? 'Nhà tuyển dụng đã gửi lịch phỏng vấn. Bạn có thể xác nhận, từ chối hoặc đề xuất lịch khác. Tối đa 2 vòng lặp lịch.'
                : 'Hệ thống sẽ tự chuyển sang từ chối nếu quá 7 ngày không có thay đổi trạng thái.'}
            </p>
            <button
              onClick={() =>
                navigate(
                  index === 2
                    ? '/candidate/ai'
                    : '/candidate/jobs/fresher-java',
                )
              }
            >
              {index === 2 ? 'Luyện phỏng vấn' : 'Xem chi tiết'}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function AiInterviewPage({ navigate }: Pick<CandidatePageProps, 'navigate'>) {
  return (
    <section className="cportal-shell ai-interview-page">
      <div className="candidate-welcome">
        <div>
          <span>AI Interview</span>
          <h1>Luyện phỏng vấn theo CV và JD trước khi gặp nhà tuyển dụng.</h1>
          <p className="page-date">
            Bộ câu hỏi được tạo từ CV mặc định, kỹ năng React/Java và vị trí bạn
            đang ứng tuyển.
          </p>
        </div>
        <button>
          <Video size={17} /> Bắt đầu mô phỏng
        </button>
      </div>
      <div className="candidate-logic-grid">
        <article className="logic-panel primary">
          <h2>Phiên gần nhất: 82/100</h2>
          <p>
            Điểm mạnh: kiến thức React và giải thích dự án. Cần cải thiện: trả
            lời tình huống conflict và tối ưu performance.
          </p>
          <div className="ai-score-bars">
            <span style={{ width: '88%' }}>Chuyên môn</span>
            <span style={{ width: '76%' }}>Tốc độ</span>
            <span style={{ width: '82%' }}>Tình huống</span>
          </div>
        </article>
        <article className="logic-panel">
          <h2>Lịch phỏng vấn thật</h2>
          <p>
            MoMo · Frontend Developer · Thứ Sáu 09:30. Bạn còn 1 lượt hẹn lại
            trong giới hạn 2 vòng lặp.
          </p>
          <button onClick={() => navigate('/candidate/applications')}>
            Xem lịch
          </button>
        </article>
      </div>
      <div className="cportal-job-grid">
        <InterviewPack
          title="React + TypeScript"
          desc="12 câu hỏi chuyên môn, state management, performance."
        />
        <InterviewPack
          title="System Design Frontend"
          desc="Thiết kế dashboard realtime, phân quyền, caching."
        />
      </div>
    </section>
  );
}

function Cover() {
  return <div className="abstract-cover" />;
}

function SectionTitle({ title, action }: { title: string; action?: string }) {
  return (
    <div className="cportal-section-title">
      <h2>{title}</h2>
      {action && (
        <button>
          {action} <ChevronDown size={15} />
        </button>
      )}
    </div>
  );
}

function DashboardJobCard({
  job,
  navigate,
}: {
  job: Job;
  navigate: (path: string) => void;
}) {
  return (
    <article className="cportal-job-card">
      <div className="cportal-job-card-head">
        <LogoBadge text={job.logo} />
        <div>
          <h3>{job.title}</h3>
          <Tags tags={job.tags.slice(0, 3)} />
        </div>
        <MoreVertical size={18} />
      </div>
      <p>{job.reason}</p>
      <div className="cportal-job-card-meta">
        <span>{job.mode}</span>
        <span>{job.experience}</span>
        <span>{job.deadline}</span>
      </div>
      <footer>
        <strong>{job.salary}</strong>
        <button onClick={() => navigate('/candidate/apply')}>
          Ứng tuyển nhanh
        </button>
      </footer>
    </article>
  );
}

function JobListCard({
  job,
  navigate,
}: {
  job: Job;
  navigate: (path: string) => void;
}) {
  return (
    <article className="job-list-card">
      <LogoBadge text={job.logo} />
      <div className="job-list-body">
        <div>
          <h3 onClick={() => navigate('/candidate/jobs/fresher-java')}>
            {job.title}
          </h3>
          <button>
            Lưu <Bookmark size={15} fill="currentColor" />
          </button>
        </div>
        <p>
          {job.company} · {job.place} · {job.days} · Uy tín {job.trust}/100
        </p>
        <span>{job.reason}</span>
        <Tags tags={job.tags} />
        <footer>
          <strong>{job.salary}</strong>
          <em>
            {job.applicants} ứng viên · Uy tín {job.trust}/100
          </em>
          <button className="message-btn">Nhắn tin</button>
          <button
            className="apply-now"
            onClick={() => navigate('/candidate/apply')}
          >
            Ứng tuyển ngay
          </button>
        </footer>
      </div>
    </article>
  );
}

function SimilarJobCard({
  job,
  navigate,
}: {
  job: Job;
  navigate: (path: string) => void;
}) {
  return (
    <article className="similar-job-card">
      <LogoBadge text={job.logo} small />
      <div>
        <h3>{job.title}</h3>
        <p>
          {job.company} · {job.place}
        </p>
        <span>{job.deadline}</span>
      </div>
      <strong>{job.salary}</strong>
      <footer>
        <button>
          <Bookmark size={15} fill="currentColor" />
        </button>
        <button onClick={() => navigate('/candidate/jobs/fresher-java')}>
          Xem
        </button>
      </footer>
    </article>
  );
}

function LogoBadge({ text, small = false }: { text: string; small?: boolean }) {
  return (
    <div className={small ? 'logo-badge small' : 'logo-badge'}>{text}</div>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="tag-list">
      {tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  );
}

function FilterSidebar() {
  const groups = [
    [
      'Loại hình',
      ['Full Time', 'Hybrid', 'Remote', 'Part Time', 'Internship', 'Contract'],
    ],
    [
      'Kinh nghiệm',
      ['Fresher', 'Junior', 'Middle', 'Senior', 'Lead', 'Manager'],
    ],
    [
      'Mức lương',
      [
        'Dưới 15 triệu',
        '15 - 25 triệu',
        '25 - 40 triệu',
        '40 - 60 triệu',
        'Trên 60 triệu',
      ],
    ],
    [
      'Công ty uy tín',
      ['Trên 90 điểm', '80 - 90 điểm', 'Có xác thực', 'Phản hồi nhanh'],
    ],
  ];
  return (
    <aside className="filter-sidebar">
      <article>
        <h3>Cảnh báo việc phù hợp</h3>
        <p>Nhận email khi có JD khớp CV mặc định và khu vực mong muốn.</p>
        <input value="binh.phan@gmail.com" readOnly />
        <button>Tạo cảnh báo</button>
      </article>
      {groups.map(([title, items]) => (
        <section key={title as string}>
          <h3>
            {title as string}
            <ChevronDown size={16} />
          </h3>
          {(items as string[]).map((item, index) => (
            <label key={item}>
              <span className={index === 0 ? 'checked' : ''} /> {item}
              <b>{index === 0 ? '23' : '12'}</b>
            </label>
          ))}
        </section>
      ))}
      {['Địa điểm', 'Kỹ năng', 'Công ty uy tín'].map((item) => (
        <section className="collapsed-filter" key={item}>
          <h3>
            {item}
            <ChevronDown size={16} />
          </h3>
        </section>
      ))}
    </aside>
  );
}

function CvJdInsight() {
  return (
    <section className="cvjd-insight">
      <div>
        <Target size={20} />
        <h2>Phân tích CV/JD</h2>
        <strong>88/100</strong>
      </div>
      <div className="cvjd-breakdown">
        <span style={{ width: '50%' }}>Kỹ năng 50%</span>
        <span style={{ width: '30%' }}>Kinh nghiệm 30%</span>
        <span style={{ width: '20%' }}>Khác 20%</span>
      </div>
      <p>
        <b>Điểm đáp ứng:</b> Java Core, OOP, SQL và tư duy backend căn bản khớp
        JD.
      </p>
      <p>
        <b>Điểm còn thiếu:</b> Chưa thể hiện rõ kinh nghiệm Spring Boot
        production trong CV.
      </p>
      <p>
        <b>Điểm cộng:</b> Có dự án cá nhân, học nhanh và sẵn sàng tham gia
        chương trình Fresher.
      </p>
    </section>
  );
}

function JobDescription() {
  const duties = [
    'Tham gia phát triển, bảo trì và tối ưu hóa ứng dụng Web/Mobile sử dụng Java.',
    'Viết code sạch, dễ bảo trì và tuân thủ quy chuẩn coding của dự án.',
    'Phối hợp với BA, Tester, PM theo mô hình Agile/Scrum.',
    'Tham gia review code, viết Unit Test để đảm bảo chất lượng sản phẩm.',
    'Báo cáo tiến độ và vấn đề phát sinh cho Technical Leader.',
  ];
  const skills = [
    'Sinh viên năm cuối hoặc mới tốt nghiệp chuyên ngành CNTT, Phần mềm.',
    'Có kiến thức nền tảng về OOP, Cấu trúc dữ liệu & Giải thuật.',
    'Nắm Java Core. Biết Spring Boot, Hibernate là lợi thế.',
    'Có kiến thức cơ bản về SQL, MySQL hoặc Oracle.',
    'Tư duy logic tốt, chủ động, ham học hỏi và chịu được áp lực công việc.',
  ];
  return (
    <div className="job-description">
      <h2>Mô tả chi tiết</h2>
      <p>
        Gia nhập FPT Software với vai trò Fresher Java, bạn sẽ tham gia các dự
        án phần mềm quy mô lớn với khách hàng từ Mỹ, Nhật Bản và Châu Âu. Đây là
        cơ hội để đào tạo bài bản theo quy trình chuẩn quốc tế.
      </p>
      <h3>Trách nhiệm công việc</h3>
      <ul>
        {duties.map((duty) => (
          <li key={duty}>{duty}</li>
        ))}
      </ul>
      <h3>Yêu cầu kỹ năng</h3>
      <ul>
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
      <h3>Về công ty</h3>
      <div className="about-company-row">
        <LogoBadge text="FPT" />
        <div>
          <strong>FPT Software</strong>
          <p>Điểm uy tín 92/100 · 56 vị trí IT</p>
        </div>
        <button>
          <Plus size={16} /> Theo dõi
        </button>
      </div>
      <p>
        FPT Software là công ty công nghệ toàn cầu, thường xuyên tuyển dụng kỹ
        sư phần mềm cho các dự án chuyển đổi số, cloud, AI và hệ thống doanh
        nghiệp.
      </p>
    </div>
  );
}

function CompanyMiniCard({
  name,
  sub,
  rating,
  vacancy,
  navigate,
}: {
  name: string;
  sub: string;
  rating: string;
  vacancy: string;
  navigate: (path: string) => void;
}) {
  return (
    <article className="company-mini-card">
      <LogoBadge text={name} small />
      <h3>{name}</h3>
      <p>
        <ShieldCheck size={14} /> {sub}
      </p>
      <span>Uy tín {rating}/100</span>
      <span>{vacancy}</span>
      <button onClick={() => navigate('/candidate/companies/uihut')}>
        Xem công ty
      </button>
    </article>
  );
}

function CompanyFollowRow({
  name,
  sub,
  rating,
  vacancy,
}: {
  name: string;
  sub: string;
  rating: string;
  vacancy: string;
}) {
  return (
    <article className="company-follow-row">
      <LogoBadge text={name} small />
      <div>
        <h3>{name}</h3>
        <p>
          {sub} · {vacancy}
        </p>
      </div>
      <span>
        <Star size={14} fill="currentColor" /> {rating}
      </span>
      <button>
        <Plus size={16} /> Theo dõi
      </button>
    </article>
  );
}

function SmallCompanyJob({
  job,
  navigate,
}: {
  job: Job;
  navigate: (path: string) => void;
}) {
  return (
    <article className="small-company-job">
      <div>
        <LogoBadge text={job.logo} />
        <div>
          <h3>{job.title}</h3>
          <Tags tags={job.tags.slice(0, 3)} />
        </div>
        <MoreVertical size={18} />
      </div>
      <p>{job.reason}</p>
      <footer>
        <strong>{job.salary}</strong>
        <button onClick={() => navigate('/candidate/apply')}>Ứng tuyển</button>
      </footer>
    </article>
  );
}

function ActionCard({
  icon: Icon,
  title,
  desc,
  action,
  onClick,
}: {
  icon: typeof FileText;
  title: string;
  desc: string;
  action: string;
  onClick: () => void;
}) {
  return (
    <article className="similar-job-card action-card">
      <Icon size={24} />
      <div>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
      <footer>
        <button onClick={onClick}>{action}</button>
      </footer>
    </article>
  );
}

function CvCard({
  title,
  desc,
  active = false,
}: {
  title: string;
  desc: string;
  active?: boolean;
}) {
  return (
    <article className="cportal-job-card cv-card">
      <div className="cportal-job-card-head">
        <LogoBadge text="CV" />
        <div>
          <h3>{title}</h3>
          <Tags tags={desc.split(', ')} />
        </div>
        {active && <CheckCircle2 color="#0faf82" />}
      </div>
      <p>
        {active
          ? 'Đang là CV mặc định cho ứng tuyển nhanh, phân tích CV/JD và AI Interview.'
          : 'Có thể đặt làm CV mặc định cho nhóm việc làm Java/Fresher.'}
      </p>
      <footer>
        <strong>{active ? 'Mặc định' : 'Sẵn sàng'}</strong>
        <button>{active ? 'Chỉnh sửa' : 'Đặt mặc định'}</button>
      </footer>
    </article>
  );
}

function InterviewPack({ title, desc }: { title: string; desc: string }) {
  return (
    <article className="cportal-job-card">
      <div className="cportal-job-card-head">
        <LogoBadge text="AI" />
        <div>
          <h3>{title}</h3>
          <Tags tags={['Giọng nói', 'Chấm điểm', 'Gợi ý cải thiện']} />
        </div>
        <Video size={20} />
      </div>
      <p>{desc}</p>
      <footer>
        <strong>3/5 câu mẫu</strong>
        <button>Bắt đầu</button>
      </footer>
    </article>
  );
}

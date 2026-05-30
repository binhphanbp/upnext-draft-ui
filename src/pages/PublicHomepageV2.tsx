import { useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import {
  ArrowUpRight,
  Bookmark,
  Bot,
  Brain,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronDown,
  ChevronRight,
  Code2,
  Compass,
  FileText,
  Globe,
  GraduationCap,
  Landmark,
  Layers,
  MapPin,
  MessagesSquare,
  Moon,
  Newspaper,
  Route,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Sun,
  TrendingUp,
  UsersRound,
  WalletCards,
} from 'lucide-react';
import { upnextLogo } from '../brand';
import { TechOrbit } from './TechOrbit';
import { FeaturedJobs } from './FeaturedJobs';

type MenuItem = {
  label: string;
  desc: string;
  icon: ReactNode;
  path: string;
  badge?: string;
  iconClass: string;
};

type NavMenu = {
  key: string;
  label: string;
  eyebrow: string;
  tagline: string;
  /** Two columns look best for 4-6 items; one column for short lists. */
  columns: 1 | 2;
  items: MenuItem[];
};

const navMenus: NavMenu[] = [
  {
    key: 'jobs',
    label: 'Việc làm IT',
    eyebrow: 'Khám phá việc làm',
    tagline: 'Tìm đúng vị trí theo chuyên môn và định hướng của bạn.',
    columns: 2,
    items: [
      {
        label: 'Frontend',
        desc: 'React, Vue, Angular, UI Engineer.',
        icon: <Code2 size={20} />,
        path: '/candidate/jobs?position=Frontend Developer',
        iconClass: 'feat-icon-cv',
      },
      {
        label: 'Backend',
        desc: 'Java, Node.js, Go, .NET, PHP.',
        icon: <Layers size={20} />,
        path: '/candidate/jobs?position=Backend Developer',
        iconClass: 'feat-icon-ai',
      },
      {
        label: 'Mobile',
        desc: 'iOS, Android, Flutter, React Native.',
        icon: <Smartphone size={20} />,
        path: '/candidate/jobs?position=Mobile Developer',
        iconClass: 'feat-icon-community',
      },
      {
        label: 'Data & AI',
        desc: 'Data Engineer, ML, AI Engineer.',
        icon: <Brain size={20} />,
        path: '/candidate/jobs?position=AI%2FML Engineer',
        iconClass: 'feat-icon-path',
      },
      {
        label: 'DevOps & Cloud',
        desc: 'AWS, Kubernetes, CI/CD, SRE.',
        icon: <ShieldCheck size={20} />,
        path: '/candidate/jobs?position=DevOps Engineer',
        iconClass: 'feat-icon-salary',
      },
      {
        label: 'Tất cả việc làm',
        desc: 'Duyệt toàn bộ tin tuyển dụng IT.',
        icon: <BriefcaseBusiness size={20} />,
        path: '/candidate/jobs',
        iconClass: 'feat-icon-learn',
      },
    ],
  },
  {
    key: 'companies',
    label: 'Công ty IT',
    eyebrow: 'Nhà tuyển dụng',
    tagline: 'Tìm hiểu công ty uy tín trước khi ứng tuyển.',
    columns: 1,
    items: [
      {
        label: 'Top công ty công nghệ',
        desc: 'Bảng xếp hạng theo điểm uy tín và đánh giá.',
        icon: <Building2 size={20} />,
        path: '/candidate/companies',
        iconClass: 'feat-icon-cv',
      },
      {
        label: 'Công ty đánh giá cao',
        desc: 'Môi trường, phúc lợi và văn hóa nổi bật.',
        icon: <Star size={20} />,
        path: '/candidate/companies',
        iconClass: 'feat-icon-salary',
      },
      {
        label: 'Big Tech & Tập đoàn',
        desc: 'FPT, Viettel, VNG, MoMo, ngân hàng số.',
        icon: <Landmark size={20} />,
        path: '/candidate/companies',
        iconClass: 'feat-icon-ai',
      },
    ],
  },
  {
    key: 'blog',
    label: 'Bài viết',
    eyebrow: 'Kiến thức & insight',
    tagline: 'Cập nhật xu hướng và kinh nghiệm nghề nghiệp IT.',
    columns: 1,
    items: [
      {
        label: 'Tin tức công nghệ',
        desc: 'Xu hướng, công nghệ mới và thị trường tuyển dụng.',
        icon: <Newspaper size={20} />,
        path: '/candidate/salary',
        iconClass: 'feat-icon-community',
      },
      {
        label: 'Cẩm nang nghề nghiệp',
        desc: 'Hướng dẫn CV, phỏng vấn và phát triển sự nghiệp.',
        icon: <Compass size={20} />,
        path: '/candidate/salary',
        iconClass: 'feat-icon-path',
      },
      {
        label: 'Báo cáo lương IT',
        desc: 'Số liệu lương theo vị trí, level và khu vực.',
        icon: <TrendingUp size={20} />,
        path: '/candidate/salary',
        iconClass: 'feat-icon-salary',
      },
    ],
  },
  {
    key: 'features',
    label: 'Tính năng',
    eyebrow: 'Công cụ cho ứng viên IT',
    tagline: 'Mọi thứ bạn cần để tìm việc có chiến lược, không rải CV.',
    columns: 2,
    items: [
      {
        label: 'Tạo CV chuẩn IT',
        desc: 'Mẫu CV tối ưu ATS, chấm điểm và gợi ý cải thiện theo JD.',
        icon: <FileText size={20} />,
        path: '/candidate/profile',
        iconClass: 'feat-icon-cv',
      },
      {
        label: 'Phỏng vấn AI',
        desc: 'Luyện phỏng vấn với bộ câu hỏi theo CV, JD và level mục tiêu.',
        icon: <Bot size={20} />,
        path: '/candidate/ai',
        badge: 'Mới',
        iconClass: 'feat-icon-ai',
      },
      {
        label: 'Lộ trình IT',
        desc: 'Bản đồ nghề nghiệp từ Fresher đến Lead theo từng stack.',
        icon: <Route size={20} />,
        path: '/candidate/ai',
        iconClass: 'feat-icon-path',
      },
      {
        label: 'Cẩm nang lương',
        desc: 'Dữ liệu lương theo vị trí, kinh nghiệm và khu vực.',
        icon: <WalletCards size={20} />,
        path: '/candidate/salary',
        iconClass: 'feat-icon-salary',
      },
      {
        label: 'Cộng đồng & Mentor',
        desc: 'Hỏi đáp, review CV và kết nối mentor trong ngành.',
        icon: <MessagesSquare size={20} />,
        path: '/candidate/messages',
        iconClass: 'feat-icon-community',
      },
      {
        label: 'Học tập & Sự kiện',
        desc: 'Workshop, livestream và khóa học kỹ năng cho dev.',
        icon: <GraduationCap size={20} />,
        path: '/candidate/ai',
        iconClass: 'feat-icon-learn',
      },
    ],
  },
];

type PublicHomepageV2Props = {
  navigate: (path: string) => void;
};

type FieldKey = 'keyword' | 'location';

const popularSearches = [
  'Frontend',
  'Backend',
  'DevOps',
  'AI Engineer',
  'Data',
  'UI/UX',
];

const locationOptions = [
  'TP. Hồ Chí Minh',
  'Hà Nội',
  'Đà Nẵng',
  'Bình Dương',
  'Cần Thơ',
  'Hải Phòng',
  'Remote',
  'Nước ngoài',
];

type Language = {
  code: string;
  label: string;
  flag: string;
};

// Add new languages here — the switch UI scales automatically.
const languages: Language[] = [
  { code: 'VI', label: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'EN', label: 'English', flag: '🇬🇧' },
];

const keywordSuggestions = [
  'React',
  'Vue.js',
  'Angular',
  'Node.js',
  'Java',
  'Spring Boot',
  'Python',
  'Golang',
  '.NET',
  'PHP',
  'Flutter',
  'React Native',
  'AWS',
  'Kubernetes',
  'Docker',
  'Data Engineer',
  'AI Engineer',
  'Machine Learning',
  'QA Automation',
  'UI/UX Designer',
  'Product Manager',
  'Business Analyst',
];

const trustedCompanies = [
  ['FPT', 'Software'],
  ['VNG', ''],
  ['viettel', 'solutions'],
  ['tiki', ''],
  ['momo', ''],
];

export function PublicHomepageV2({ navigate }: PublicHomepageV2Props) {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [openField, setOpenField] = useState<FieldKey | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [lang, setLang] = useState<string>('VI');
  const [langOpen, setLangOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const langRef = useRef<HTMLDivElement | null>(null);

  const searchCardRef = useRef<HTMLElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!openField) return undefined;

    function handlePointerDown(event: MouseEvent) {
      if (!searchCardRef.current?.contains(event.target as Node)) {
        setOpenField(null);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpenField(null);
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openField]);

  useEffect(() => {
    if (!openMenu) return undefined;

    function handlePointerDown(event: MouseEvent) {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpenMenu(null);
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openMenu]);

  useEffect(() => {
    if (!langOpen) return undefined;

    function handlePointerDown(event: MouseEvent) {
      if (!langRef.current?.contains(event.target as Node)) {
        setLangOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setLangOpen(false);
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [langOpen]);

  const keywordMatches = useMemo(() => {
    const query = keyword.trim().toLowerCase();
    const source = query
      ? keywordSuggestions.filter((item) => item.toLowerCase().includes(query))
      : keywordSuggestions;
    return source.slice(0, 6);
  }, [keyword]);

  function runSearch(overrides?: { keyword?: string }) {
    const params = new URLSearchParams();
    const term = (overrides?.keyword ?? keyword).trim();
    if (term) params.set('keyword', term);
    if (location) params.set('location', location);
    setOpenField(null);
    const query = params.toString();
    navigate(query ? `/candidate/jobs?${query}` : '/candidate/jobs');
  }

  function toggleField(field: FieldKey) {
    setOpenField((current) => (current === field ? null : field));
  }

  return (
    <main className="public-v2-page">
      <header className="public-v2-header">
        <button
          className="public-v2-logo"
          onClick={() => navigate('/')}
          aria-label="Trang chủ UpNext"
        >
          <img src={upnextLogo.wordmark} alt="UpNext" />
        </button>

        <nav
          className="public-v2-nav"
          aria-label="Điều hướng chính"
          ref={navRef}
        >
          {navMenus.map((menu) => (
            <div
              key={menu.key}
              className={`public-v2-nav-dd${openMenu === menu.key ? ' is-open' : ''}`}
              onMouseEnter={() => setOpenMenu(menu.key)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button
                type="button"
                className="public-v2-nav-trigger"
                aria-haspopup="true"
                aria-expanded={openMenu === menu.key}
                onClick={() =>
                  setOpenMenu((open) => (open === menu.key ? null : menu.key))
                }
              >
                {menu.label}
                <ChevronDown size={15} />
              </button>

              <div
                className={`public-v2-mega${menu.columns === 1 ? ' is-single' : ''}`}
                role="menu"
              >
                <div className="public-v2-mega-head">
                  <span className="public-v2-mega-eyebrow">
                    <Sparkles size={14} /> {menu.eyebrow}
                  </span>
                  <p>{menu.tagline}</p>
                </div>
                <div className="public-v2-mega-grid">
                  {menu.items.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      role="menuitem"
                      className="public-v2-mega-item"
                      onClick={() => {
                        setOpenMenu(null);
                        navigate(item.path);
                      }}
                    >
                      <i className={`public-v2-mega-icon ${item.iconClass}`}>
                        {item.icon}
                      </i>
                      <span className="public-v2-mega-text">
                        <b>
                          <span>{item.label}</span>
                          {item.badge && (
                            <em className="public-v2-mega-badge">
                              {item.badge}
                            </em>
                          )}
                        </b>
                        <small>{item.desc}</small>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </nav>

        <div className="public-v2-header-actions">
          <button
            className="public-v2-employer"
            onClick={() => navigate('/employer')}
          >
            <span className="public-v2-employer-text">
              <small>Dành cho</small>
              <b>Nhà Tuyển Dụng</b>
            </span>
            <ArrowUpRight className="public-v2-employer-arrow" size={17} />
          </button>

          <span className="public-v2-action-sep" aria-hidden="true" />

          <div
            className={`public-v2-lang${langOpen ? ' is-open' : ''}`}
            ref={langRef}
          >
            <button
              type="button"
              className="public-v2-lang-trigger"
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-label="Chọn ngôn ngữ"
              onClick={() => setLangOpen((open) => !open)}
            >
              <Globe size={17} />
              <span>{lang}</span>
              <ChevronDown size={14} />
            </button>

            <ul className="public-v2-lang-menu" role="listbox">
              {languages.map((item) => (
                <li key={item.code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={lang === item.code}
                    className={`public-v2-lang-option${lang === item.code ? ' is-active' : ''}`}
                    onClick={() => {
                      setLang(item.code);
                      setLangOpen(false);
                    }}
                  >
                    <span className="public-v2-lang-flag">{item.flag}</span>
                    <span className="public-v2-lang-name">{item.label}</span>
                    {lang === item.code && <Check size={15} />}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            className="public-v2-theme"
            aria-label={
              theme === 'light'
                ? 'Chuyển sang chế độ tối'
                : 'Chuyển sang chế độ sáng'
            }
            onClick={() =>
              setTheme((current) => (current === 'light' ? 'dark' : 'light'))
            }
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <span className="public-v2-action-sep" aria-hidden="true" />

          <button
            className="public-v2-login"
            onClick={() => navigate('/login')}
          >
            Đăng nhập
          </button>
          <button
            className="public-v2-register"
            onClick={() => navigate('/register')}
          >
            Đăng ký
          </button>
        </div>
      </header>

      <section className="public-v2-content">
        <section className="public-v2-hero">
          <div className="public-v2-copy">
            <span className="public-v2-eyebrow">
              <Sparkles size={16} /> Nền tảng tuyển dụng IT hàng đầu
            </span>
            <h1>
              Tìm đúng việc IT.
              <br />
              Bật tăng <span>sự nghiệp.</span>
            </h1>
            <p>
              UpNext kết nối ứng viên IT với các công ty công nghệ uy tín.
              <br />
              Tìm việc nhanh chóng, phù hợp kỹ năng và định hướng của bạn.
            </p>

            <section
              className="public-v2-search-card"
              aria-label="Tìm kiếm việc làm IT"
              ref={searchCardRef}
            >
              <form
                className="public-v2-search-grid"
                onSubmit={(event) => {
                  event.preventDefault();
                  runSearch();
                }}
              >
                <div
                  className={`public-v2-field public-v2-field-keyword${openField === 'keyword' ? ' is-open' : ''}`}
                >
                  <div className="public-v2-control">
                    <Search size={20} />
                    <input
                      value={keyword}
                      onChange={(event) => setKeyword(event.target.value)}
                      onFocus={() => setOpenField('keyword')}
                      placeholder="Nhập tên công việc, kỹ năng..."
                      aria-label="Từ khóa tìm việc"
                      autoComplete="off"
                    />
                  </div>
                  {openField === 'keyword' && keywordMatches.length > 0 && (
                    <ul
                      className="public-v2-dropdown"
                      role="listbox"
                      aria-label="Gợi ý từ khóa"
                    >
                      {keywordMatches.map((item) => (
                        <li key={item}>
                          <button
                            type="button"
                            className="public-v2-option"
                            role="option"
                            aria-selected={keyword === item}
                            onClick={() => {
                              setKeyword(item);
                              runSearch({ keyword: item });
                            }}
                          >
                            <Search size={15} />
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <SelectField
                  label="Địa điểm"
                  icon={<MapPin size={19} />}
                  placeholder="Tất cả địa điểm"
                  value={location}
                  options={locationOptions}
                  open={openField === 'location'}
                  onToggle={() => toggleField('location')}
                  onSelect={(value) => {
                    setLocation(value);
                    setOpenField(null);
                  }}
                />

                <button type="submit" className="public-v2-search-submit">
                  <Search size={19} /> Tìm việc
                </button>
              </form>
            </section>

            <div className="public-v2-popular">
              <span>Từ khóa phổ biến:</span>
              <div>
                {popularSearches.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setKeyword(item);
                      runSearch({ keyword: item });
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div
            className="public-v2-visual"
            aria-label="Ứng viên IT trên nền tảng UpNext"
          >
            <div className="public-v2-stage">
              <svg
                className="public-v2-stage-bg"
                viewBox="0 0 600 600"
                fill="none"
                aria-hidden="true"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  <linearGradient id="v2blobA" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#d6f5e6" />
                    <stop offset="1" stopColor="#eafaf2" stopOpacity="0.35" />
                  </linearGradient>
                  <linearGradient id="v2blobB" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#c7f0de" stopOpacity="0.7" />
                    <stop offset="1" stopColor="#eafaf2" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Large soft organic blobs flowing in from the right. */}
                <path
                  d="M392 60c70-26 150-8 178 64 30 74-6 150-58 196-56 50-58 118-126 140-64 20-150 6-198-48-44-50-36-118 0-176 40-64 26-140 92-178 36-22 76-22 112-2z"
                  fill="url(#v2blobA)"
                />
                <path
                  d="M470 360c54-8 104 22 116 74 12 50-14 104-64 124-46 18-104 4-130-40-24-42-12-100 28-130 16-12 32-26 50-28z"
                  fill="url(#v2blobB)"
                />

                {/* Thin concentric connector arcs centered behind the figure. */}
                <circle
                  cx="300"
                  cy="300"
                  r="210"
                  stroke="#bfe9d6"
                  strokeWidth="1.5"
                  strokeDasharray="2 9"
                />
                <circle
                  cx="300"
                  cy="300"
                  r="262"
                  stroke="#d6efe3"
                  strokeWidth="1.5"
                />

                {/* Connector dots sitting on the arcs near the tech bubbles. */}
                <circle cx="455" cy="150" r="6" fill="#10b981" />
                <circle cx="520" cy="300" r="5" fill="#34d399" />
                <circle cx="250" cy="120" r="5" fill="#10b981" opacity="0.7" />
                <circle cx="150" cy="430" r="6" fill="#10b981" />
              </svg>
              <span
                className="public-v2-stage-dot public-v2-stage-dot-1"
                aria-hidden="true"
              />
              <span
                className="public-v2-stage-dot public-v2-stage-dot-2"
                aria-hidden="true"
              />

              <img
                className="public-v2-hero-banner"
                src="/homepage-v2/hero-banner.png"
                alt="Ứng viên IT đang làm việc trên nền tảng UpNext"
              />

              {/* Floating job card */}
              <div
                className="public-v2-float public-v2-float-job"
                aria-hidden="true"
              >
                <div className="float-job-head">
                  <span className="float-job-badge">
                    <Sparkles size={12} /> Nổi bật
                  </span>
                  <Bookmark size={16} />
                </div>
                <b className="float-job-title">Senior Frontend Developer</b>
                <span className="float-job-company">
                  <Building2 size={13} /> UpNext • Hà Nội
                </span>
                <div className="float-job-tags">
                  <i>React</i>
                  <i>TypeScript</i>
                  <i>Tailwind</i>
                </div>
                <strong className="float-job-salary">25 - 40 triệu VND</strong>
              </div>

              {/* Interactive orbit of tech skills — drag to spin. */}
              <TechOrbit />

              {/* Salary insight card */}
              <div
                className="public-v2-float public-v2-float-salary"
                aria-hidden="true"
              >
                <span className="float-salary-label">Mức lương trung bình</span>
                <span className="float-salary-role">Frontend Developer</span>
                <strong className="float-salary-value">24.5 triệu</strong>
                <span className="float-salary-trend">
                  <TrendingUp size={13} /> 12% so với tháng trước
                </span>
                <span className="float-salary-spark" aria-hidden="true">
                  <i style={{ height: '38%' }} />
                  <i style={{ height: '54%' }} />
                  <i style={{ height: '46%' }} />
                  <i style={{ height: '70%' }} />
                  <i style={{ height: '60%' }} />
                  <i style={{ height: '88%' }} />
                </span>
              </div>

              {/* Match pill */}
              <div
                className="public-v2-float public-v2-float-match"
                aria-hidden="true"
              >
                <span className="float-match-icon">
                  <Check size={16} />
                </span>
                <span className="float-match-text">
                  <b>Phù hợp với bạn</b>
                  <small>98% match với kỹ năng &amp; kinh nghiệm</small>
                </span>
                <ChevronRight size={18} />
              </div>
            </div>
          </div>
        </section>

        <section className="public-v2-trust-strip">
          <div className="public-v2-stats">
            <article>
              <i>
                <BriefcaseBusiness size={25} />
              </i>
              <p>
                <strong>2.500+</strong>
                <span>Việc làm IT đang tuyển</span>
              </p>
            </article>
            <article>
              <i>
                <Building2 size={25} />
              </i>
              <p>
                <strong>1.000+</strong>
                <span>Công ty công nghệ</span>
              </p>
            </article>
            <article>
              <i>
                <UsersRound size={25} />
              </i>
              <p>
                <strong>50.000+</strong>
                <span>Ứng viên đã tin tưởng</span>
              </p>
            </article>
          </div>

          <div className="public-v2-trusted">
            <span>Được tin tưởng bởi các công ty công nghệ hàng đầu</span>
            <div className="public-v2-marquee">
              <div className="public-v2-marquee-track" aria-hidden="true">
                {trustedCompanies.map(([name, suffix]) => (
                  <b
                    className={`public-v2-company public-v2-company-${name}`}
                    key={name}
                  >
                    {name}
                    <small>{suffix}</small>
                  </b>
                ))}
                {/* Duplicate set creates the seamless loop; hidden when motion is reduced. */}
                {trustedCompanies.map(([name, suffix]) => (
                  <b
                    className={`public-v2-company public-v2-company-clone public-v2-company-${name}`}
                    key={`${name}-clone`}
                  >
                    {name}
                    <small>{suffix}</small>
                  </b>
                ))}
              </div>
            </div>
          </div>
        </section>

        <FeaturedJobs navigate={navigate} />
      </section>
    </main>
  );
}

type SelectFieldProps = {
  label: string;
  icon: ReactNode;
  placeholder: string;
  value: string;
  options: string[];
  open: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
};

function SelectField({
  label,
  icon,
  placeholder,
  value,
  options,
  open,
  onToggle,
  onSelect,
}: SelectFieldProps) {
  return (
    <div className={`public-v2-field${open ? ' is-open' : ''}`}>
      <span className="public-v2-field-label">{label}</span>
      <button
        type="button"
        className="public-v2-control"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={onToggle}
      >
        {icon}
        <span className={value ? 'has-value' : 'is-placeholder'}>
          {value || placeholder}
        </span>
        <ChevronDown size={17} />
      </button>
      {open && (
        <ul className="public-v2-dropdown" role="listbox" aria-label={label}>
          {value && (
            <li>
              <button
                type="button"
                className="public-v2-option public-v2-option-clear"
                onClick={() => onSelect('')}
              >
                {placeholder}
              </button>
            </li>
          )}
          {options.map((item) => (
            <li key={item}>
              <button
                type="button"
                className={`public-v2-option${value === item ? ' is-active' : ''}`}
                role="option"
                aria-selected={value === item}
                onClick={() => onSelect(item)}
              >
                {item}
                {value === item && <Check className="check" size={16} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  MapPin,
  Menu,
  Search,
  Sparkles,
  UsersRound,
} from 'lucide-react';
import { upnextLogo } from '../brand';
import { HeroBoundary } from '../components/HeroBoundary';

const HeroScene = lazy(() => import('./HeroScene'));

type PublicHomepageV2Props = {
  navigate: (path: string) => void;
};

type FieldKey = 'keyword' | 'position' | 'location' | 'workType';

const popularSearches = [
  'Frontend Developer',
  'Backend Developer',
  'Full-stack Developer',
  'DevOps Engineer',
  'UI/UX Designer',
];

const positionOptions = [
  'Frontend Developer',
  'Backend Developer',
  'Full-stack Developer',
  'Mobile Developer',
  'DevOps Engineer',
  'Data Engineer',
  'AI/ML Engineer',
  'QA / Tester',
  'UI/UX Designer',
  'Product Manager',
  'Business Analyst',
  'Solution Architect',
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

const workTypeOptions = [
  'Toàn thời gian',
  'Bán thời gian',
  'Remote',
  'Hybrid',
  'Thực tập',
  'Freelance',
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
  const [position, setPosition] = useState('');
  const [location, setLocation] = useState('');
  const [workType, setWorkType] = useState('');
  const [openField, setOpenField] = useState<FieldKey | null>(null);

  const searchCardRef = useRef<HTMLElement | null>(null);

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
    if (position) params.set('position', position);
    if (location) params.set('location', location);
    if (workType) params.set('type', workType);
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

        <nav className="public-v2-nav" aria-label="Điều hướng chính">
          <button onClick={() => navigate('/candidate/jobs')}>Việc làm</button>
          <button onClick={() => navigate('/candidate/companies')}>
            Công ty
          </button>
          <button onClick={() => navigate('/candidate/salary')}>
            Tài nguyên <ChevronDown size={15} />
          </button>
          <button onClick={() => navigate('/candidate/ai')}>Lộ trình IT</button>
          <button onClick={() => navigate('/candidate/messages')}>
            Cộng đồng
          </button>
        </nav>

        <div className="public-v2-header-actions">
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
          <button
            className="public-v2-menu"
            aria-label="Mở menu"
            onClick={() => navigate('/candidate')}
          >
            <Menu size={25} />
          </button>
        </div>
      </header>

      <section className="public-v2-content">
        <section className="public-v2-hero">
          <div className="public-v2-copy">
            <span className="public-v2-eyebrow">
              <Sparkles size={16} /> Nền tảng tuyển dụng IT hàng đầu dành cho
              bạn
            </span>
            <h1>
              Tìm việc IT phù hợp.
              <br />
              Bứt phá <span>sự nghiệp.</span>
            </h1>
            <p>
              Hàng ngàn cơ hội việc làm chất lượng từ các công ty công nghệ uy
              tín. Tìm đúng việc - Đúng môi trường - Đúng định hướng.
            </p>
          </div>

          <div
            className="public-v2-visual"
            aria-label="Nền tảng kết nối các lĩnh vực nghề nghiệp IT"
          >
            <HeroBoundary
              fallback={
                <img
                  className="hero3d-fallback-img"
                  src="/homepage-v2/hero-platform.png"
                  alt="Nền tảng UpNext kết nối các lĩnh vực IT"
                />
              }
            >
              <Suspense
                fallback={
                  <div className="hero3d-fallback" aria-hidden="true" />
                }
              >
                <HeroScene navigate={navigate} />
              </Suspense>
            </HeroBoundary>
          </div>
        </section>

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
              <span className="public-v2-field-label">Từ khóa</span>
              <div className="public-v2-control">
                <Search size={20} />
                <input
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                  onFocus={() => setOpenField('keyword')}
                  placeholder="VD: React, Frontend, Engineer..."
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
              label="Vị trí"
              icon={<BriefcaseBusiness size={19} />}
              placeholder="Chọn vị trí"
              value={position}
              options={positionOptions}
              open={openField === 'position'}
              onToggle={() => toggleField('position')}
              onSelect={(value) => {
                setPosition(value);
                setOpenField(null);
              }}
            />

            <SelectField
              label="Địa điểm"
              icon={<MapPin size={19} />}
              placeholder="Chọn địa điểm"
              value={location}
              options={locationOptions}
              open={openField === 'location'}
              onToggle={() => toggleField('location')}
              onSelect={(value) => {
                setLocation(value);
                setOpenField(null);
              }}
            />

            <SelectField
              label="Hình thức làm việc"
              icon={<CalendarDays size={19} />}
              placeholder="Tất cả hình thức"
              value={workType}
              options={workTypeOptions}
              open={openField === 'workType'}
              onToggle={() => toggleField('workType')}
              onSelect={(value) => {
                setWorkType(value);
                setOpenField(null);
              }}
            />

            <button type="submit" className="public-v2-search-submit">
              Tìm việc ngay <Search size={20} />
            </button>
          </form>

          <div className="public-v2-popular">
            <span>Tìm kiếm phổ biến:</span>
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
            <button
              className="public-v2-view-all"
              type="button"
              onClick={() => navigate('/candidate/jobs')}
            >
              Xem tất cả <ChevronRight size={16} />
            </button>
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

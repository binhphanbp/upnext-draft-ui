import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Bookmark,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Clock,
  Coins,
  Flame,
  Globe,
  LayoutGrid,
  MapPin,
  Monitor,
  Sparkles,
  Star,
} from 'lucide-react';

type FeaturedJobsProps = {
  navigate: (path: string) => void;
};

type BadgeTone = 'featured' | 'new' | 'urgent' | 'remote' | 'salary';

type JobCard = {
  id: string;
  badge: { label: string; tone: BadgeTone };
  company: string;
  verified: boolean;
  /** Logo image in /public/homepage-v2/companies. Falls back to a monogram. */
  logo: string;
  /** Fallback monogram tint (used until the real logo image is added). */
  logoColor: string;
  title: string;
  salary: string;
  location: string;
  mode: string;
  experience: string;
  tags: string[];
  deadline: string;
  /** Which filter tabs this job belongs to (besides "all"). */
  filters: Array<'remote' | 'high-salary' | 'newest'>;
};

const badgeIcon: Record<BadgeTone, ReactNode> = {
  featured: <Star size={13} />,
  new: <Sparkles size={13} />,
  urgent: <Flame size={13} />,
  remote: <Globe size={13} />,
  salary: <Coins size={13} />,
};

/** Logo image with a colored-monogram fallback while real assets are missing. */
function CompanyLogo({
  src,
  name,
  color,
}: {
  src: string;
  name: string;
  color: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <i className="v2job-logo v2job-logo-mono" style={{ background: color }}>
        {name.charAt(0)}
      </i>
    );
  }

  return (
    <i className="v2job-logo">
      <img src={src} alt={`Logo ${name}`} onError={() => setFailed(true)} />
    </i>
  );
}

const jobs: JobCard[] = [
  {
    id: 'fpt-frontend',
    badge: { label: 'Nổi bật', tone: 'featured' },
    company: 'FPT Software',
    verified: true,
    logo: '/homepage-v2/companies/fpt.png',
    logoColor: '#0a66c2',
    title: 'Senior Frontend Developer',
    salary: '30 - 45 triệu',
    location: 'Hà Nội',
    mode: 'Hybrid',
    experience: '3 - 5 năm',
    tags: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    deadline: 'Còn 5 ngày để nộp',
    filters: ['high-salary'],
  },
  {
    id: 'vng-backend',
    badge: { label: 'Mới đăng', tone: 'new' },
    company: 'VNG Corporation',
    verified: true,
    logo: '/homepage-v2/companies/vng.png',
    logoColor: '#1a8cff',
    title: 'Backend Developer (Node.js)',
    salary: '25 - 40 triệu',
    location: 'Hồ Chí Minh',
    mode: 'Hybrid',
    experience: '2 - 4 năm',
    tags: ['Node.js', 'NestJS', 'PostgreSQL', 'Redis'],
    deadline: 'Còn 2 ngày để nộp',
    filters: ['newest'],
  },
  {
    id: 'viettel-devops',
    badge: { label: 'Tuyển gấp', tone: 'urgent' },
    company: 'Viettel Solutions',
    verified: true,
    logo: '/homepage-v2/companies/viettel.png',
    logoColor: '#ee0033',
    title: 'DevOps Engineer',
    salary: '28 - 50 triệu',
    location: 'Đà Nẵng',
    mode: 'Onsite',
    experience: '3 - 6 năm',
    tags: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
    deadline: 'Còn 1 ngày để nộp',
    filters: ['high-salary'],
  },
  {
    id: 'momo-data',
    badge: { label: 'Remote', tone: 'remote' },
    company: 'MoMo',
    verified: true,
    logo: '/homepage-v2/companies/momo.png',
    logoColor: '#a50064',
    title: 'Data Engineer',
    salary: '27 - 45 triệu',
    location: 'Remote',
    mode: 'Remote',
    experience: '2 - 5 năm',
    tags: ['Python', 'Spark', 'Snowflake', 'Airflow'],
    deadline: 'Còn 5 ngày để nộp',
    filters: ['remote', 'high-salary'],
  },
  {
    id: 'tiki-mobile',
    badge: { label: 'Lương tốt', tone: 'salary' },
    company: 'Tiki',
    verified: true,
    logo: '/homepage-v2/companies/tiki.png',
    logoColor: '#1a94ff',
    title: 'Mobile Developer (Flutter)',
    salary: '22 - 38 triệu',
    location: 'Hà Nội',
    mode: 'Hybrid',
    experience: '1 - 3 năm',
    tags: ['Flutter', 'Dart', 'Firebase', 'REST API'],
    deadline: 'Còn 6 ngày để nộp',
    filters: ['newest'],
  },
  {
    id: 'vnpay-qa',
    badge: { label: 'Nổi bật', tone: 'featured' },
    company: 'VNPAY',
    verified: true,
    logo: '/homepage-v2/companies/vnpay.png',
    logoColor: '#005baa',
    title: 'QA Engineer (Manual/Auto)',
    salary: '18 - 30 triệu',
    location: 'Hồ Chí Minh',
    mode: 'Hybrid',
    experience: '2 - 4 năm',
    tags: ['Selenium', 'API Testing', 'JIRA', 'Postman'],
    deadline: 'Còn 8 ngày để nộp',
    filters: ['newest'],
  },
];

const tabs = [
  { key: 'all', label: 'Tất cả', icon: <LayoutGrid size={16} /> },
  { key: 'remote', label: 'Remote', icon: <Globe size={16} /> },
  { key: 'high-salary', label: 'Lương cao', icon: <Coins size={16} /> },
  { key: 'newest', label: 'Mới nhất', icon: <Clock size={16} /> },
] as const;

type TabKey = (typeof tabs)[number]['key'];

const TOTAL_PAGES = 145;

export function FeaturedJobs({ navigate }: FeaturedJobsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [page, setPage] = useState(1);
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  const visibleJobs = useMemo(() => {
    if (activeTab === 'all') return jobs;
    return jobs.filter((job) => job.filters.includes(activeTab));
  }, [activeTab]);

  function toggleSaved(id: string) {
    setSaved((current) => ({ ...current, [id]: !current[id] }));
  }

  return (
    <section className="public-v2-jobs" aria-label="Cơ hội đang được quan tâm">
      <header className="public-v2-jobs-head">
        <div>
          <h2>Cơ hội đang được quan tâm</h2>
          <p>
            Những vị trí IT nổi bật từ các công ty uy tín, được cập nhật liên
            tục.
          </p>
        </div>
        <button
          type="button"
          className="public-v2-jobs-all"
          onClick={() => navigate('/candidate/jobs')}
        >
          Xem tất cả <ChevronRight size={16} />
        </button>
      </header>

      <div
        className="public-v2-jobs-tabs"
        role="tablist"
        aria-label="Lọc cơ hội"
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.key}
            className={`public-v2-jobs-tab${activeTab === tab.key ? ' is-active' : ''}`}
            onClick={() => {
              setActiveTab(tab.key);
              setPage(1);
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="public-v2-jobs-grid">
        {visibleJobs.map((job) => (
          <article
            key={job.id}
            className="v2job-card"
            onClick={() => navigate('/candidate/jobs/fresher-java')}
          >
            <header className="v2job-top">
              <span className={`v2job-badge v2job-badge-${job.badge.tone}`}>
                {badgeIcon[job.badge.tone]}
                {job.badge.label}
              </span>
              <button
                type="button"
                className={`v2job-save${saved[job.id] ? ' is-saved' : ''}`}
                aria-label={saved[job.id] ? 'Bỏ lưu tin' : 'Lưu tin'}
                aria-pressed={saved[job.id] ?? false}
                onClick={(event) => {
                  event.stopPropagation();
                  toggleSaved(job.id);
                }}
              >
                <Bookmark
                  size={18}
                  fill={saved[job.id] ? 'currentColor' : 'none'}
                />
              </button>
            </header>

            <div className="v2job-company">
              <CompanyLogo
                src={job.logo}
                name={job.company}
                color={job.logoColor}
              />
              <span>
                {job.company}
                {job.verified && (
                  <BadgeCheck size={15} className="v2job-verified" />
                )}
              </span>
            </div>

            <h3 className="v2job-title">{job.title}</h3>

            <div className="v2job-salary">
              <Coins size={16} />
              {job.salary}
            </div>

            <div className="v2job-meta">
              <span>
                <MapPin size={15} />
                {job.location}
              </span>
              <span>
                <Monitor size={15} />
                {job.mode}
              </span>
              <span>
                <Briefcase size={15} />
                {job.experience}
              </span>
            </div>

            <div className="v2job-tags">
              {job.tags.map((tag) => (
                <i key={tag}>{tag}</i>
              ))}
            </div>

            <footer className="v2job-foot">
              <span className="v2job-deadline">
                <Clock size={14} />
                {job.deadline}
              </span>
              <button
                type="button"
                className="v2job-apply"
                onClick={(event) => {
                  event.stopPropagation();
                  navigate('/candidate/apply');
                }}
              >
                Ứng tuyển <ArrowRight size={15} />
              </button>
            </footer>
          </article>
        ))}
      </div>

      <nav className="public-v2-jobs-pager" aria-label="Phân trang">
        <button
          type="button"
          aria-label="Trang trước"
          disabled={page <= 1}
          onClick={() => setPage((current) => Math.max(1, current - 1))}
        >
          <ChevronLeft size={18} />
        </button>
        <span>
          <b>{page}</b> / {TOTAL_PAGES} trang
        </span>
        <button
          type="button"
          aria-label="Trang sau"
          disabled={page >= TOTAL_PAGES}
          onClick={() =>
            setPage((current) => Math.min(TOTAL_PAGES, current + 1))
          }
        >
          <ChevronRight size={18} />
        </button>
      </nav>
    </section>
  );
}

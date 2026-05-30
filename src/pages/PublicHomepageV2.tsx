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

// Accurate brand glyphs (Simple Icons paths) so the floating tech bubbles read
// as real logos rather than text labels.
type TechBadge = {
  key: string;
  name: string;
  color: string;
  path: string;
  posClass: string;
};

const techBadges: TechBadge[] = [
  {
    key: 'react',
    name: 'React',
    color: '#149eca',
    posClass: 'public-v2-tech-react',
    path: 'M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 0 0-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44a23.476 23.476 0 0 0-3.107-.534 23.892 23.892 0 0 0-2.03-2.44c1.591-1.48 3.086-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.807 4.11 2.28-.686.72-1.37 1.536-2.02 2.44a23.476 23.476 0 0 0-3.113.538 15.02 15.02 0 0 1-.254-1.42c-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87a25.64 25.64 0 0 1-4.412.005 26.64 26.64 0 0 1-1.183-1.86c-.372-.64-.71-1.29-1.018-1.946a25.17 25.17 0 0 1 1.013-1.954c.38-.66.773-1.286 1.18-1.868A25.245 25.245 0 0 1 12 8.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933a25.952 25.952 0 0 0-1.345-2.32zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493a23.966 23.966 0 0 0-1.1-2.98c.45-1.017.81-2.01 1.085-2.962zm-13.395.004c.278.96.645 1.957 1.1 2.98a23.142 23.142 0 0 0-1.086 2.964c-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39a25.819 25.819 0 0 0 1.341-2.338zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143a22.005 22.005 0 0 1-2.006-.386c.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295a1.185 1.185 0 0 1-.553-.132c-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z',
  },
  {
    key: 'ts',
    name: 'TypeScript',
    color: '#3178c6',
    posClass: 'public-v2-tech-ts',
    path: 'M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z',
  },
  {
    key: 'node',
    name: 'Node.js',
    color: '#5fa04e',
    posClass: 'public-v2-tech-node',
    path: 'M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339c.082.045.197.045.272 0l8.795-5.076c.082-.047.134-.141.134-.238V6.921c0-.099-.053-.192-.137-.242l-8.791-5.072c-.081-.047-.189-.047-.271 0L3.075 6.68c-.085.049-.139.145-.139.241v10.146c0 .097.054.189.139.235l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675c-.57-.329-.922-.943-.922-1.608V6.921c0-.666.353-1.28.922-1.607l8.795-5.082c.557-.315 1.296-.315 1.848 0l8.794 5.082c.57.329.924.943.924 1.607v10.146c0 .665-.354 1.278-.924 1.608l-8.794 5.078c-.281.163-.6.247-.926.247zm7.101-10.007c0-1.9-1.284-2.406-3.987-2.763-2.731-.361-3.009-.548-3.009-1.187 0-.528.235-1.233 2.258-1.233 1.807 0 2.473.389 2.747 1.607.024.115.129.199.247.199h1.141c.071 0 .138-.031.186-.081.048-.054.074-.123.067-.196-.177-2.098-1.571-3.076-4.388-3.076-2.508 0-4.004 1.058-4.004 2.833 0 1.925 1.488 2.457 3.895 2.695 2.879.282 3.103.703 3.103 1.269 0 .983-.789 1.402-2.642 1.402-2.327 0-2.839-.584-3.011-1.742-.02-.124-.126-.215-.253-.215h-1.137c-.141 0-.254.112-.254.253 0 1.482.806 3.248 4.655 3.248 2.774 0 4.372-1.097 4.372-3.014z',
  },
  {
    key: 'py',
    name: 'Python',
    color: '#3b7aab',
    posClass: 'public-v2-tech-py',
    path: 'M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z',
  },
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

              {/* Tech stack bubbles with accurate brand logos */}
              {techBadges.map((tech) => (
                <span
                  key={tech.key}
                  className={`public-v2-tech ${tech.posClass}`}
                  style={{ color: tech.color }}
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="26"
                    height="26"
                    fill="currentColor"
                  >
                    <path d={tech.path} />
                  </svg>
                </span>
              ))}

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

import type { L10n } from '../lib/i18n';

/**
 * Sitedeki bütün metinler ve veriler burada. Bileşenlere sabit metin yazma.
 *
 * İçerik kuralı (PROFILE.md — "Kamuya açık konumlandırma kuralı"):
 * kamuya açık metinlerde PHP ve Laravel adı geçmez. Geniş teknoloji yetkinliği
 * gerektiğinde genel ifade kullanılır.
 */

export const profile = {
  name: 'Ömer Faruk Taşdemir',
  /** Header ve favicon'da kullanılan monogram. */
  monogram: 'ÖFT',
  role: {
    en: 'Backend Engineer',
    tr: 'Backend Geliştirici',
  } satisfies L10n,
  /** Hero'daki mono teknoloji şeridi — dilden bağımsız. */
  stackLine: 'Go · PostgreSQL · REST APIs · Docker',
  /** Hero sağ sütunu: kısa tanıtım. */
  intro: {
    en: 'Backend-focused software engineer with 5+ years of professional experience building reliable web applications, APIs and data-driven systems. I work primarily with Go and PostgreSQL, and I contribute across other stacks when a project needs full delivery.',
    tr: '5 yılı aşkın profesyonel deneyime sahip, backend odaklı bir yazılım geliştiricisiyim. Ağırlıklı olarak Go ve PostgreSQL ile güvenilir web uygulamaları, API’ler ve veri odaklı sistemler geliştiriyorum. Proje uçtan uca teslim gerektirdiğinde diğer teknoloji yığınlarında da çalışıyorum.',
  } satisfies L10n,
  /** İletişim bölümündeki uzun paragraf. */
  about: {
    en: 'I care about clear scope, secure data handling and delivery in small, testable steps. Before writing code I separate the work into scope and risks; I protect existing data, plan migrations carefully and document the setup, deployment and operational checks that come after.',
    tr: 'Net kapsamı, güvenli veri yönetimini ve test edilebilir küçük aşamalar hâlinde teslimi önemsiyorum. Koda başlamadan önce işi kapsam ve risklere ayırıyorum; mevcut veriyi koruyor, geçişleri dikkatle planlıyor ve kurulum, yayın ve işletme kontrollerini belgeliyorum.',
  } satisfies L10n,
} as const;

/** Hero altındaki üç ölçü. Değer kısa ve tarama sırasında okunabilir olmalı. */
export const heroStats: ReadonlyArray<{ value: L10n; label: L10n }> = [
  {
    value: { en: '5+ years', tr: '5+ yıl' },
    label: { en: 'Professional experience', tr: 'Profesyonel deneyim' },
  },
  {
    value: { en: 'Go · PostgreSQL', tr: 'Go · PostgreSQL' },
    label: { en: 'Primary stack', tr: 'Ana teknoloji yığını' },
  },
  {
    value: { en: 'Isparta, Türkiye', tr: 'Isparta, Türkiye' },
    label: { en: 'Remote friendly', tr: 'Uzaktan çalışmaya uygun' },
  },
];

/* --------------------------------------------------------------------------
   Gezinme
   -------------------------------------------------------------------------- */

export const nav: ReadonlyArray<{ id: string; label: L10n }> = [
  { id: 'work', label: { en: 'Work', tr: 'Projeler' } },
  { id: 'skills', label: { en: 'Skills', tr: 'Yetkinlikler' } },
  { id: 'experience', label: { en: 'Experience', tr: 'Deneyim' } },
  { id: 'contact', label: { en: 'Contact', tr: 'İletişim' } },
];

/* --------------------------------------------------------------------------
   Projeler
   -------------------------------------------------------------------------- */

/** Filtre grupları; `all` her zaman ilk sırada durur. */
export const workFilters: ReadonlyArray<{ id: WorkGroup | 'all'; label: L10n }> = [
  { id: 'all', label: { en: 'All', tr: 'Tümü' } },
  { id: 'api', label: { en: 'Backend & APIs', tr: 'Backend & API' } },
  { id: 'realtime', label: { en: 'Real-time & clients', tr: 'Gerçek zamanlı & istemci' } },
  { id: 'ml', label: { en: 'Data & ML', tr: 'Veri & makine öğrenmesi' } },
];

export type WorkGroup = 'api' | 'realtime' | 'ml';

export interface Project {
  id: string;
  title: string;
  group: WorkGroup;
  summary: L10n;
  /** Kart üzerindeki teknoloji rozetleri. Kısa tut; dört-beş taneyi geçme. */
  tags: readonly string[];
  /** Herkese açık depo adresi. Kapalı projelerde `null`. */
  href: string | null;
}

export const projects: readonly Project[] = [
  {
    id: 'awqatsalah',
    title: 'AwqatSalah Cookbook',
    group: 'api',
    summary: {
      en: 'Client examples for the Diyanet AwqatSalah API across five language stacks, all held to one shared technical contract: token caching, quota-aware authentication and secure secret handling.',
      tr: 'Diyanet AwqatSalah API’sini beş ayrı teknoloji yığınıyla kullanan örnek koleksiyonu. Hepsi tek bir teknik sözleşmeye bağlı: token önbelleği, kota farkındalıklı kimlik doğrulama ve gizli bilgi yönetimi.',
    },
    tags: ['Go', 'JavaScript', 'Python', 'C#', 'REST'],
    href: 'https://github.com/omerfruk/AwqatSalah-Cookbook',
  },
  {
    id: 'kare-rehber',
    title: 'KARE Rehber',
    group: 'api',
    summary: {
      en: 'Student and coach guidance platform on PostgreSQL and Docker: role-based access, OTP sign-in, audit logging, messaging, notifications and reporting — with 41 automated tests and a smoke-check flow.',
      tr: 'PostgreSQL ve Docker tabanlı öğrenci-koç rehberlik platformu: rol bazlı erişim, OTP girişi, audit log, mesajlaşma, bildirim ve raporlama. 41 otomatik test ve smoke-check akışı belgelenmiş.',
    },
    tags: ['PostgreSQL', 'Docker', 'RBAC', 'Audit log'],
    href: null,
  },
  {
    id: 'seslen',
    title: 'Seslen',
    group: 'realtime',
    summary: {
      en: 'WebSocket server in Go with a SwiftUI macOS client: token-based authentication, per-organisation isolation, server-side authorization checks and a Docker deployment.',
      tr: 'Go ile yazılmış WebSocket sunucusu ve SwiftUI macOS istemcisi: token tabanlı kimlik doğrulama, kurum bazlı izolasyon, sunucu tarafı yetki doğrulama ve Docker ile dağıtım.',
    },
    tags: ['Go', 'WebSocket', 'SwiftUI', 'SQLite'],
    href: null,
  },
  {
    id: 'go-generics-api',
    title: 'go-generics-api',
    group: 'api',
    summary: {
      en: 'REST API skeleton where Go generics carry reusable CRUD handlers and service layers, so a new resource needs a type rather than another copy of the same code.',
      tr: 'Go generics ile yeniden kullanılabilir CRUD handler ve servis katmanı kuran REST API iskeleti. Yeni bir kaynak eklemek aynı kodu kopyalamak yerine bir tip tanımlamak oluyor.',
    },
    tags: ['Go', 'Fiber', 'PostgreSQL', 'Generics'],
    href: 'https://github.com/omerfruk/go-generics-api',
  },
  {
    id: 'xray-landmark',
    title: 'X-Ray Landmark Detection',
    group: 'ml',
    summary: {
      en: 'Deep learning pipeline for anatomical landmark detection on radiographs, built with PyTorch and MONAI alongside evaluation metrics and reproducible training scripts.',
      tr: 'Röntgen görüntülerinde anatomik nokta tespiti için derin öğrenme hattı. PyTorch ve MONAI ile kurulu; değerlendirme metrikleri ve tekrarlanabilir eğitim betikleri içeriyor.',
    },
    tags: ['Python', 'PyTorch', 'MONAI'],
    href: 'https://github.com/omerfruk/xray_landmark',
  },
  {
    id: 'go-mongodb-api',
    title: 'go-mongodb-api',
    group: 'api',
    summary: {
      en: 'Layered Go REST API over MongoDB covering CRUD and aggregation pipelines, with handler, service and repository kept deliberately separate.',
      tr: 'MongoDB üzerinde katmanlı Go REST API: CRUD ve aggregation örnekleri; handler, servis ve repository katmanları bilinçli olarak ayrı tutulmuş.',
    },
    tags: ['Go', 'Fiber', 'MongoDB'],
    href: 'https://github.com/omerfruk/go-mongodb-api',
  },
  {
    id: 's3-operations',
    title: 'Amazon S3 Bucket Operations',
    group: 'api',
    summary: {
      en: 'Tested AWS SDK for Go v2 examples for everyday bucket and object work, using the standard credential chain instead of keys pasted into source.',
      tr: 'Günlük bucket ve nesne işleri için test edilmiş AWS SDK for Go v2 örnekleri. Anahtarları koda gömmek yerine standart kimlik zinciri kullanılıyor.',
    },
    tags: ['Go', 'AWS', 'S3'],
    href: 'https://github.com/omerfruk/Amazon-S3-Bucket-Operations',
  },
];

/* --------------------------------------------------------------------------
   Yetkinlikler — hepsi PROFILE.md'de doğrulanmış maddelerden gelir.
   -------------------------------------------------------------------------- */

export const skillGroups: ReadonlyArray<{ title: L10n; items: readonly string[] }> = [
  {
    title: { en: 'Backend', tr: 'Backend' },
    items: [
      'Go',
      'REST API design',
      'Fiber',
      'WebSocket',
      'Role-based authorization',
      'Tenant isolation',
      'Audit logging',
    ],
  },
  {
    title: { en: 'Data', tr: 'Veri' },
    items: [
      'PostgreSQL',
      'Data modeling',
      'Migrations & seeds',
      'MongoDB',
      'SQLite',
      'Firebase Firestore',
    ],
  },
  {
    title: { en: 'Delivery', tr: 'Teslim' },
    items: [
      'Docker & Compose',
      'Automated tests',
      'Health & smoke checks',
      'Cloudflare Pages',
      'Netlify',
      'PWA & Service Worker',
    ],
  },
  {
    title: { en: 'Clients & frontend', tr: 'İstemci & frontend' },
    items: ['Vue.js', 'TypeScript', 'React', 'SwiftUI (macOS)', 'Python'],
  },
];

/* --------------------------------------------------------------------------
   Deneyim ve eğitim — LinkedIn ile doğrulanmış kayıtlar.
   -------------------------------------------------------------------------- */

export interface TimelineEntry {
  org: string;
  title: L10n;
  /** Ekranda görünen tarih aralığı. */
  period: L10n;
  meta: L10n;
  /** Devam eden kayıt; küçük bir işaretle belirtilir. */
  current?: boolean;
}

export const experience: readonly TimelineEntry[] = [
  {
    org: 'Hay Teknoloji ve Yazılım A.Ş.',
    title: { en: 'Developer · Full-time', tr: 'Developer · Tam zamanlı' },
    period: { en: 'Jan 2021 — present', tr: 'Ocak 2021 — devam' },
    meta: { en: 'Isparta, Türkiye', tr: 'Isparta, Türkiye' },
    current: true,
  },
  {
    org: '2sworks Technologies',
    title: { en: 'Full Stack Developer · Part-time', tr: 'Full Stack Developer · Yarı zamanlı' },
    period: { en: 'Sep 2023 — Feb 2026', tr: 'Eylül 2023 — Şubat 2026' },
    meta: { en: 'Remote', tr: 'Uzaktan' },
  },
  {
    org: 'UniPubs',
    title: { en: 'Back End Developer · Freelance', tr: 'Back End Developer · Serbest' },
    period: { en: 'Mar 2023 — Jul 2023', tr: 'Mart 2023 — Temmuz 2023' },
    meta: { en: 'Remote', tr: 'Uzaktan' },
  },
  {
    org: 'Nozzle — Ship Management Software',
    title: { en: 'Frontend Developer · Part-time', tr: 'Frontend Developer · Yarı zamanlı' },
    period: { en: 'Jan 2023 — Jun 2023', tr: 'Ocak 2023 — Haziran 2023' },
    meta: { en: 'Remote', tr: 'Uzaktan' },
  },
];

export const education: readonly TimelineEntry[] = [
  {
    org: 'Süleyman Demirel Üniversitesi',
    title: {
      en: "MSc, Computer Engineering",
      tr: 'Bilgisayar Mühendisliği, Yüksek Lisans',
    },
    period: { en: 'Aug 2023 — present', tr: 'Ağustos 2023 — devam' },
    meta: { en: 'Isparta, Türkiye', tr: 'Isparta, Türkiye' },
    current: true,
  },
  {
    org: 'Kütahya Dumlupınar Üniversitesi',
    title: { en: 'BSc, Computer Engineering', tr: 'Bilgisayar Mühendisliği, Lisans' },
    period: { en: 'Sep 2017 — Jun 2022', tr: 'Eylül 2017 — Haziran 2022' },
    meta: { en: 'Kütahya, Türkiye', tr: 'Kütahya, Türkiye' },
  },
];

/* --------------------------------------------------------------------------
   İletişim
   -------------------------------------------------------------------------- */

export const contact = {
  email: 'omer.fruk3547@gmail.com',
  location: { en: 'Isparta, Türkiye', tr: 'Isparta, Türkiye' } satisfies L10n,
  availability: {
    en: 'Open to freelance work up to 30 hours per week.',
    tr: 'Haftada 30 saate kadar freelance projelere açığım.',
  } satisfies L10n,
  /**
   * Telefon numarası bilinçli olarak kapalı: herkese açık bir sayfadaki numara
   * spam toplayıcılarının ilk hedefi oluyor. Yayınlamak istersen numarayı yaz
   * (`'+90 554 513 7809'`); iletişim bölümü satırı kendiliğinden ekler.
   */
  phone: null as string | null,
  links: [
    { label: 'GitHub', handle: '@omerfruk', href: 'https://github.com/omerfruk' },
    {
      label: 'LinkedIn',
      handle: 'ömer-faruk-taşdemir',
      href: 'https://www.linkedin.com/in/%C3%B6mer-faruk-ta%C5%9Fdemir-255114183/',
    },
    { label: 'Arc', handle: '@omerfruk', href: 'https://arc.dev/@omerfruk' },
  ],
} as const;

/* --------------------------------------------------------------------------
   Bölüm başlıkları ve serbest metinler
   -------------------------------------------------------------------------- */

export const copy = {
  skipToContent: { en: 'Skip to content', tr: 'İçeriğe geç' },
  openMenu: { en: 'Open menu', tr: 'Menüyü aç' },
  closeMenu: { en: 'Close menu', tr: 'Menüyü kapat' },
  langSwitchLabel: { en: 'Türkçe', tr: 'English' },
  langSwitchTitle: { en: 'Switch to Turkish', tr: 'Switch to English' },

  heroPrimaryCta: { en: 'Get in touch', tr: 'İletişime geç' },
  heroSecondaryCta: { en: 'See the work', tr: 'Projelere bak' },

  workEyebrow: { en: 'Selected work', tr: 'Seçili projeler' },
  workTitle: {
    en: 'Systems I have designed, built and kept running.',
    tr: 'Tasarladığım, kurduğum ve ayakta tuttuğum sistemler.',
  },
  workDescription: {
    en: 'Public repositories carry the source. Two entries are client work under a private repository, so they are described rather than linked.',
    tr: 'Herkese açık depolar kaynak kodu içerir. İki kayıt kapalı depodaki müşteri işi olduğu için bağlantı yerine açıklama veriliyor.',
  },
  workPrivate: { en: 'Private repository', tr: 'Kapalı depo' },
  workViewRepo: { en: 'View repository', tr: 'Depoyu görüntüle' },
  workFilterLabel: { en: 'Filter projects by area', tr: 'Projeleri alana göre filtrele' },
  workEmpty: { en: 'Nothing listed in this area yet.', tr: 'Bu alanda henüz kayıt yok.' },

  skillsEyebrow: { en: 'Capabilities', tr: 'Yetkinlikler' },
  skillsTitle: {
    en: 'What I reach for, and what I have shipped with.',
    tr: 'Kullandığım ve teslim ettiğim teknolojiler.',
  },
  skillsDescription: {
    en: 'Go, PostgreSQL and Vue.js carry five years of professional use each. The rest is drawn from work that shipped, not from a reading list.',
    tr: 'Go, PostgreSQL ve Vue.js’in her biri beş yıllık profesyonel kullanıma dayanıyor. Geri kalanı okuma listesinden değil, teslim edilmiş işlerden geliyor.',
  },

  experienceEyebrow: { en: 'Experience', tr: 'Deneyim' },
  experienceTitle: { en: 'Where I have worked.', tr: 'Çalıştığım yerler.' },
  educationTitle: { en: 'Education', tr: 'Eğitim' },
  currentBadge: { en: 'Current', tr: 'Sürüyor' },

  contactEyebrow: { en: 'Contact', tr: 'İletişim' },
  contactTitle: {
    en: 'Tell me about the system you need built.',
    tr: 'Kurulmasını istediğin sistemi anlat.',
  },
  contactEmailLabel: { en: 'Email', tr: 'E-posta' },
  contactPhoneLabel: { en: 'Phone', tr: 'Telefon' },
  contactLocationLabel: { en: 'Location', tr: 'Konum' },
  contactElsewhere: { en: 'Elsewhere', tr: 'Diğer profiller' },

  footerNote: {
    en: 'Built with React, Tailwind CSS and Cloudflare Pages. Source on GitHub.',
    tr: 'React, Tailwind CSS ve Cloudflare Pages ile kuruldu. Kaynak kodu GitHub’da.',
  },
  footerRights: { en: 'All rights reserved.', tr: 'Tüm hakları saklıdır.' },
  backToTop: { en: 'Back to top', tr: 'Başa dön' },
} as const;

/** Sayfa başlığı ve açıklaması — prerender her dil için buradan okur. */
export const meta = {
  title: {
    en: 'Ömer Faruk Taşdemir — Backend Engineer · Go, PostgreSQL, REST APIs',
    tr: 'Ömer Faruk Taşdemir — Backend Geliştirici · Go, PostgreSQL, REST API',
  } satisfies L10n,
  description: {
    en: 'Backend engineer with 5+ years of experience building reliable APIs and data-driven systems with Go, PostgreSQL and Docker. Based in Isparta, Türkiye; available for freelance work.',
    tr: 'Go, PostgreSQL ve Docker ile güvenilir API’ler ve veri odaklı sistemler kuran, 5 yılı aşkın deneyimli backend geliştirici. Isparta merkezli; freelance projelere açık.',
  } satisfies L10n,
  siteUrl: 'https://omerfruk.com',
} as const;

export const repoUrl = 'https://github.com/omerfruk/omerfruk.com';

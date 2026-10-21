// Site identity — the only file you need to change to make this blog yours.
// build.mjs, lib/, scripts/ and api/ read names, URLs, citation formats and keys from here.
// 블로그를 내 것으로 바꿀 때 고치는 유일한 파일이다. 아래 값을 모두 내 정보로 바꾼다.

export const SITE = {
  // 실제 도메인. 배포 전에 반드시 바꾼다 (canonical, RSS, sitemap, 인용 URL이 모두 이 값을 쓴다).
  domain: 'example.com',
  url: 'https://example.com',
  title: '볼트 블로그',
  tagline: '옵시디언 볼트에서 쓰고, 정적 블로그로 낸다',
  description: '옵시디언 볼트의 마크다운을 정본으로 두고 인용할 수 있는 영속 URL로 발행하는 블로그.',
  author: 'Your Name',
  authorKo: '홍길동',
  authorUrl: 'https://example.com/',
  // JSON-LD sameAs 와 llms.txt 에 들어가는 내 다른 주소들 (없으면 빈 배열)
  authorSameAs: [],
  // 글(콘텐츠) 라이선스. 코드 라이선스는 LICENSE(MIT)이고 별개다.
  license: 'CC BY 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/deed.ko',
  // true 면 noindex, sitemap 없음. 공개 준비가 끝나면 false.
  staging: false,
  // 머리말 로고 글자, 글 바이라인, llms.txt 제목, JSON-LD 별칭
  brand: { mark: '볼트', roman: 'Vault Blog' },
  favicon: '/assets/logos/favicon.png',
  ogImage: '/assets/og/og-site.png',
  themeStorageKey: 'vault-blog-theme',
  footerLinks: [['RSS 구독', '/feed.xml']],
  // APA 7 블로그 인용. 국문은 국내 적용형(저자 뒤 온점), 영문은 성, 이니셜.
  citation: {
    ko: { author: '홍길동.', inText: '홍길동', blog: '볼트 블로그' },
    en: { author: 'Hong, G.', inText: 'Hong', blog: 'Vault Blog' },
  },
  seo: {
    // vercel.app 기본 주소가 정식 도메인으로 리다이렉트되는지 볼 때만 쓴다. 없으면 ''.
    duplicateHost: '',
    // IndexNow 키(공개 값, 32자 16진수). 있으면 빌드가 /{key}.txt 를 만들고 seo_audit --ping 이 쓴다.
    indexNowKey: '',
  },
  // 홈 글 모음 제목 옆 한 줄 (없으면 '')
  archiveTagline: '볼트에서 블로그로',
  // api/engagement.js (조회수와 좋아요, 선택 기능). 환경 변수가 없으면 꺼진 채로 둔다.
  // since: 집계를 켠 날 (예: '2026년 11월 1일'), analyticsNote: 별도 방문 분석을 쓰면 그 안내 한 문장.
  engagement: { cookie: 'vault_blog_reader', keyPrefix: 'vault-blog', since: '', analyticsNote: '' },
  // 빌드 결과에 나오면 안 되는 개인 흔적(내 맥 사용자 이름, 볼트 폴더 이름 등). /Users/ 와 file:/// 는 늘 검사한다.
  privateMarkers: [],
  // 원고에 쓰면 테스트가 막는 표기 { 금지: 정본 }
  bannedTerms: {},
  // 회귀 방지 하한: 캡션 달린 본문 이미지 수, 이미지 기록 수
  checks: { minCaptionedImages: 3, minImageRecords: 3 },
};

// 글 분류 (frontmatter kind → URL /kind/{slug}/). 새 kind 는 여기 한 줄 추가.
export const KINDS = { '에세이': 'essay', '소개': 'intro', '기술': 'tech', '노트': 'note' };

// 글 정보 사이드바의 "본문에서 찾은 키워드" 사전. [표시 이름, [본문에서 찾을 표기들]]
// 글 frontmatter 의 keywords 가 있으면 그것이 먼저다.
export const KEYWORD_TERMS = [
  ['옵시디언', ['옵시디언', 'Obsidian']], ['마크다운', ['마크다운', 'Markdown']],
  ['볼트', ['볼트', 'vault']], ['정적 사이트', ['정적 사이트', 'static site']],
  ['인용', ['인용', 'citation']], ['APA', ['APA']], ['캡션', ['캡션', 'caption']],
  ['도식', ['도식', 'diagram', 'Mermaid']], ['메타데이터', ['메타데이터', 'frontmatter', 'metadata']],
  ['RSS', ['RSS']], ['SEO', ['SEO']], ['배포', ['배포', 'deploy']],
  ['지식관리', ['지식관리', '지식 관리', 'knowledge management']], ['기록', ['기록']],
];

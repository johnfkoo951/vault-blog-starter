# vault-blog-starter

[🇬🇧 English](README.md) | 🇰🇷 한국어

**옵시디언 볼트에서 쓰고, 인용할 수 있는 정적 블로그로 낸다.**

마크다운 원고가 계속 정본으로 남는다. 빌드는 그 원고를 사람과 AI 에이전트가 인용할 수 있는 영속 URL의 정적 페이지로 바꾼다. 관리자 화면도 데이터베이스도 없다.

> **실제 예시**: https://jisan.cmdspace.work — 구요한의 저자 블로그 紙散(지산)이 이 엔진으로 돌아간다.
> **템플릿**: 이 페이지 위의 **Use this template** 버튼으로 내 레포를 만든다.

## 들어 있는 것
- **읽기 화면**: 왼쪽 목차 사이드바, 오른쪽 글 정보 사이드바(키워드, 관련 글, 발행 정보, 마크다운 원문 복사). 좁은 화면에서는 서랍으로 열린다. 라이트와 다크 테마, 글자 크기 조절, 읽기 진행 표시, 키보드 단축키.
- **국문과 영문 APA 7 인용**: 글마다 국문 인용(국내 APA 적용형)과 영문 인용(로마자 원제 + 대괄호 번역)이 붙고, 각각 복사 버튼이 있다.
- **캡션 계약**: 모든 이미지에 그림의 종류(AI 생성 일러스트, 실제 화면 캡처, 실제 사진, HTML/CSS 렌더 등)를 밝히는 캡션과 출처 기록이 붙는다. 하나라도 빠지면 빌드가 멈춘다.
- **글 목록과 검색**: 분류 탭, 전문 검색(`/` 또는 Cmd/Ctrl+K), 연재 내비게이션.
- **기계가 읽는 층**: 전문 RSS, sitemap, `llms.txt`, `/posts/{slug}/index.md` 마크다운 원문, Open Graph, Twitter, JSON-LD 메타데이터.
- **점검**: 원문 보존, 캡션, 인용, 화면 구조를 확인하는 단위 테스트, SEO/GEO/AIO 점검 스크립트, 선택 기능인 IndexNow 알림.
- **선택 기능**: 코드로 그리는 도식(Mermaid를 Pele로 미리 렌더), 익명 조회수와 좋아요(Vercel 함수 + Redis).

## 빠르게 시작하기
Node.js 26과 Chrome에서 확인했다. Chrome은 브라우저 테스트와 도식 렌더에만 필요하다.

```bash
npm install
# 1. site.config.mjs 수정: 도메인, 이름, 저자, 인용 형식, 글 라이선스, KINDS, KEYWORD_TERMS
# 2. assets/logos/favicon.png 와 assets/og/og-site.png 교체
# 3. content/posts/ 의 예시 글 교체 (content/image-captions.json 의 기록도 함께)
npm run build    # dist/ 생성
npm test         # 원문 보존, 캡션, 인용, 화면 구조
npm run seo      # dist/ 의 SEO / GEO / AIO 점검
npx vercel deploy --prod   # 또는 dist/ 를 아무 정적 호스팅에 올린다
```

엔진이 이름, 주소, 인용 형식, 키를 읽는 파일은 `site.config.mjs` 하나뿐이다. 처음 공개 배포하기 전에 도메인부터 바꾼다. 캐노니컬 주소, RSS, sitemap, 인용이 모두 이 값을 쓴다.

## 글 쓰는 흐름
1. 볼트에서 쓴다. 발행할 노트를 `content/posts/{slug}.md`로 옮긴다. 볼트 안의 `[[위키링크]]`는 블로그 글 링크나 평문으로 바꾸고 로컬 경로는 지운다. 문장은 다시 쓰지 않는다. 고칠 일이 생기면 볼트 원고를 먼저 고치고 다시 옮긴다.
2. frontmatter를 붙인다.

	```yaml
	---
	title: 글 제목
	slug: english-kebab-slug        # 발행 후 바꾸지 않는다
	date: 2026-10-21                # 같은 날 글이 여럿이면 2026-10-21T09:00 처럼 시간으로 순서를 정한다
	kind: 에세이                     # site.config.mjs 의 KINDS 중 하나
	summary: 목록, 검색, 링크 미리보기에 쓰는 한두 문장
	citationTitleSource: "글 제목"
	citationTitleEn: "English translation of the title"
	citationTitleRomanized: "Romanized original title"
	---
	```
	선택 필드: `updated`, `firstPublished`, `series`와 `seriesOrder`, `keywords`, `relatedPosts`.
3. 이미지는 `content/images/{slug}/`에 둔다. frontmatter 바로 다음 첫 이미지가 히어로이자 링크 미리보기 이미지다. 캡션은 이미지 제목 자리에 그림 종류부터 쓰고, 같은 기록을 `content/image-captions.json`에 남긴다(`kind`, `caption`, `alt`, `evidence`, `sha256`).
4. 인용 제목 후보는 `npm run citation -- "글 제목" "English translation"`으로 만든다. 로마자 변환은 철자 보조라서 고유명사와 외래어는 직접 확인한다.
5. `npm run build && npm test` 뒤 배포한다.

`content/posts/`의 예시 글 세 편이 같은 순서를 글로 보여 준다.

## 도식 (선택)
본문에 ```` ```mermaid ```` 펜스를 쓰고 바로 다음 줄에 이탤릭 캡션 한 줄을 둔다. `npm run diagrams`가 펜스마다 정적 SVG(데스크톱 폭, 폰 폭)와 RSS용 PNG를 만들고, 빌드는 그 캐시만 읽는다. 그래서 배포할 때는 브라우저가 필요 없다.

지금은 렌더 단계에 `cmds-pele` 도구 모음(Pele 테마, 검사기, 렌더러)이 이 폴더 옆에 있어야 하고, 이 도구 모음은 아직 공개 전이다. 그동안은 이미 렌더된 예시 도식을 그대로 두거나 그 글을 지우면 된다. 다른 기능은 모두 도식 없이 동작한다. 렌더러가 없으면 렌더러가 필요한 테스트는 자동으로 건너뛴다.

## 조회수와 좋아요 (선택)
`api/engagement.js`는 Vercel 함수다. 서버 쪽 환경 변수를 넣기 전에는 꺼져 있다(`{ "enabled": false }`, 숫자를 보여 주지 않음).
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` (또는 `KV_REST_API_URL`, `KV_REST_API_TOKEN`). 이 블로그 전용 Redis를 쓴다.
- `ENGAGEMENT_COOKIE_SECRET`: 32자 이상의 무작위 비밀값
- `ENGAGEMENT_ALLOWED_ORIGIN`: 미리보기 주소가 따로 있을 때만

숫자는 익명 브라우저 단위의 대략적인 반응이지, 실제 사람 수가 아니다.

## 구조
```
site.config.mjs   사이트 정보, 인용 형식, 분류, 키워드 사전      ← 내 것
content/          글, 이미지, 캡션 기록, 도식 캐시               ← 내 것
assets/logos/, assets/og/   파비콘, 기본 링크 미리보기 이미지     ← 내 것
build.mjs         정적 생성기 (목록, 글, 분류, RSS, sitemap, llms.txt, 검색 색인)
lib/              인용, 캡션, 글 정보, 도식
scripts/          도식, 인용 제목 도우미, SEO 점검
api/              선택 기능인 조회수 함수
assets/*.js|css   읽기 화면, 검색, 도식 스타일
tests/            node:test 테스트와 도식 브라우저 점검
```

## 엔진 업데이트
엔진(위에서 "내 것"이 아닌 파일)은 실제 운영 중인 [jisan-blog](https://github.com/johnfkoo951/jisan-blog) 레포에서 내보낸다. 나중에 업데이트를 받으려면 바뀐 엔진 파일만 내 레포에 덮어쓴다. 설정, 글, 이미지는 엔진에 속하지 않는다.

## 라이선스
| 대상 | 라이선스 |
|---|---|
| 코드 (아래 행을 뺀 전부) | [MIT](LICENSE) |
| `content/`의 예시 글과 예시 이미지 | CC BY 4.0. 내 글로 바꿔 쓴다 |
| 도식 글꼴 부분집합 `assets/fonts/*.woff` (Pretendard 기반) | SIL Open Font License 1.1, [assets/fonts/OFL.txt](assets/fonts/OFL.txt) |

내 글의 라이선스는 `site.config.mjs`의 `license`, `licenseUrl`에서 정하고 모든 페이지에 표시된다.

---

Built by **Yohan Koo (CMDSPACE)** — https://cmdspace.work. 도식은 [Pele](https://github.com/obsidianmd/pele)로 렌더한다.

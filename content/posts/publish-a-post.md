---
title: 글 하나를 발행하는 순서
slug: publish-a-post
date: 2026-10-21
kind: 기술
summary: 원고를 옮기고, 이미지에 캡션과 기록을 달고, 인용 제목을 만들고, 빌드와 검사를 거쳐 배포하기까지. 빠뜨리면 빌드가 먼저 멈추도록 만든 다섯 단계.
series: 시작하기
seriesOrder: 2
citationTitleSource: "글 하나를 발행하는 순서"
citationTitleEn: "The steps to publish one post"
citationTitleRomanized: "Geul hanareul balhaenghaneun sunseo"
---

![원고, 이미지와 캡션, 인용 제목, 빌드와 배포의 네 단계를 화살표로 이은 그림이다.](/images/publish-a-post/hero-publish-a-post.png "HTML/CSS로 렌더링한 도표. 글 하나를 발행하는 단계를 순서대로 보여 준다.")

이 블로그는 빠뜨린 것이 있으면 빌드가 먼저 멈춘다. 캡션 없는 이미지, 인용 제목이 빠진 글, 깨진 관련 글 링크는 배포되기 전에 걸린다. **귀찮은 확인을 사람이 기억하지 않아도 되게 만든 것이다.**

## 1. 원고를 옮긴다
`content/posts/{slug}.md`를 만들고 맨 위에 frontmatter를 붙인다. slug는 영문 케밥 표기로 쓰고, 발행한 뒤에는 바꾸지 않는다.

```yaml
---
title: 글 제목
slug: english-kebab-slug
date: 2026-10-21
kind: 에세이
summary: 목록, 검색 결과, 공유 미리보기에 쓰는 한두 문장 요약
citationTitleSource: "글 제목"
citationTitleEn: "English translation of the title"
citationTitleRomanized: "Romanized original title"
---
```

선택 필드는 `updated`, `firstPublished`, `series`와 `seriesOrder`, `keywords`, `relatedPosts`다. 같은 날짜에 글이 여럿이면 `date: 2026-10-21T09:00`처럼 시간을 붙여 순서를 정한다. 연재는 하루씩 간격을 두고 1부를 가장 이른 날짜로 한다.

## 2. 이미지에 캡션과 기록을 단다
이미지는 `content/images/{slug}/`에 두고, 본문에는 캡션을 제목 자리에 넣는다.

```markdown
![이미지 자체를 설명하는 대체 텍스트](/images/my-post/figure-01.png "실제 구동 화면 캡처. 무엇을 보여 주는지 한 문장.")
```

frontmatter 바로 다음의 첫 이미지가 히어로이자 공유 미리보기 이미지가 된다. 그리고 `content/image-captions.json`에 같은 캡션과 근거를 기록한다.

| kind | 캡션 첫머리 |
|---|---|
| `ai-illustration` | AI 생성 일러스트. |
| `runtime-screenshot` | 실제 구동 화면 캡처. |
| `service-screenshot` | 실제 서비스 화면 캡처. |
| `photo` | 실제 사진. |
| `rendered-chart` | HTML/CSS로 렌더링한 도표. |
| `unknown` | 제작 방식 미확인. |

기록에는 `kind`, `caption`, `alt`, `evidence`(어떻게 만들었는지), `sha256`(파일 해시)이 들어간다. 그림처럼 보인다고 AI 생성이라 적지 않는다. 확인한 사실만 적는다.

## 3. 인용 제목을 만든다
영문 인용은 원제를 로마자로 적고 뜻을 대괄호로 덧붙인다. 후보는 스크립트가 만든다.

```bash
npm run citation -- "글 제목" "English translation of the title"
```

로마자 변환은 철자를 돕는 도구일 뿐이다. 고유명사와 외래어는 직접 확인한다.

## 4. 빌드하고 검사한다

```bash
npm run build   # dist/ 생성
npm test        # 원문 보존, 캡션, 인용, 목차, 검색 색인 검사
npm run seo     # SEO, GEO, AIO 정적 검사
```

## 5. 배포한다
`dist/`는 어느 정적 호스팅에나 올릴 수 있다. Vercel을 쓰면 `vercel.json`이 이미 들어 있어서 `npx vercel deploy --prod` 한 줄이면 된다. 조회수와 좋아요(`api/engagement.js`)는 Vercel 함수와 Redis가 있을 때만 켜지는 선택 기능이고, 없어도 글은 그대로 읽힌다.

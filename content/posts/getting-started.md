---
title: 볼트에서 쓰고, 블로그로 낸다
slug: getting-started
date: 2026-10-20
kind: 소개
summary: 옵시디언 볼트의 마크다운을 정본으로 두고, 인용할 수 있는 영속 URL로 발행하는 블로그의 구조를 소개한다. 이 예시 글을 지우고 내 글로 바꾸면 된다.
series: 시작하기
seriesOrder: 1
citationTitleSource: "볼트에서 쓰고, 블로그로 낸다"
citationTitleEn: "Write in the vault, publish as a blog"
citationTitleRomanized: "Bolteueseo sseugo, beullogeuro naenda"
---

![볼트 노트에서 content/posts를 거쳐 정적 블로그로 이어지는 흐름을 세 개의 상자와 화살표로 그렸다.](/images/getting-started/hero-getting-started.png "HTML/CSS로 렌더링한 도표. 볼트 노트가 content/posts를 거쳐 정적 블로그가 되는 흐름을 보여 준다.")

이 블로그는 옵시디언 볼트에서 쓴 마크다운을 그대로 정적 페이지로 바꾼다. 관리자 화면도 데이터베이스도 없다. **글의 정본은 볼트에 있고, 블로그는 그 파생본이다.**

## 정본은 볼트에, 블로그는 파생본으로
흐름은 세 단계다.

1. 볼트에서 글을 쓴다.
2. 발행할 글을 `content/posts/{slug}.md`로 옮기고 블로그용 frontmatter를 붙인다.
3. `npm run build`가 `dist/`에 사이트를 만들고, 그 폴더를 배포한다.

옮길 때 볼트 안의 위키링크는 블로그 글 링크나 평문으로 바꾸고, 로컬 경로는 지운다. 문장 자체는 다시 쓰지 않는다. 고칠 일이 생기면 볼트 원고를 먼저 고치고 블로그에 옮긴다.

## 처음 바꿀 것은 설정 파일 하나다
`site.config.mjs`가 사이트 이름, 도메인, 저자, 글 라이선스, 인용 형식, 분류, 키워드 사전을 모두 갖고 있다. 엔진(`build.mjs`, `lib/`, `scripts/`)은 이 파일만 읽는다.

| 설정 | 하는 일 |
|---|---|
| `domain`, `url` | 캐노니컬 주소, RSS, sitemap, 인용 URL |
| `title`, `tagline`, `brand` | 머리말 로고, 페이지 제목, 글 바이라인 |
| `author`, `authorKo`, `citation` | 국문과 영문 APA 인용의 저자와 블로그명 |
| `license`, `licenseUrl` | 글 라이선스. 코드 라이선스(MIT)와는 별개다 |
| `KINDS` | 글 분류와 `/kind/{slug}/` 주소 |
| `KEYWORD_TERMS` | 글 정보 사이드바의 키워드 사전 |

## 글마다 자동으로 붙는 것
- 왼쪽 목차 사이드바와 오른쪽 글 정보 사이드바. 글 정보에는 키워드, 관련 글, 발행 정보, 마크다운 원문 복사가 들어간다.
- 국문과 영문 APA 7 인용, 그리고 각각의 복사 버튼.
- 모든 이미지의 캡션. 캡션은 그림의 종류(AI 생성, 실제 캡처, HTML/CSS 렌더 등)를 먼저 밝힌다.
- 글 주소 뒤에 `index.md`를 붙이면 마크다운 원문이 그대로 나온다. 사람도 AI 에이전트도 원문으로 인용할 수 있다.
- RSS 전문, sitemap, `llms.txt`, 검색 색인, 라이트와 다크 테마.

> 링크가 영원해야 인용할 수 있다. 그래서 slug는 발행한 뒤 바꾸지 않는다.

다음 글에서는 글 하나를 실제로 발행하는 순서를 따라간다.

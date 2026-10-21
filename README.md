# vault-blog-starter

🇬🇧 English | [🇰🇷 한국어](README.ko.md)

**Write in your Obsidian vault, publish a citable static blog.**

Your Markdown stays the master copy. The build turns it into static pages with permanent URLs that people and AI agents can quote. No admin panel and no database.

> **Live example**: https://jisan.cmdspace.work — the author blog of Yohan Koo, built on this engine.
> **Template**: click **Use this template** at the top of this page to start your own copy.

## What you get
- **Reader layout**: a contents rail on the left and an article-info rail on the right (keywords, related posts, publication facts, raw Markdown copy). Narrow screens get drawers. Light and dark themes, text size controls, reading progress, keyboard shortcuts.
- **Bilingual APA 7 citations**: every post shows a Korean reference (domestic APA application) and an English reference (romanized original title with a bracketed translation), each with its own copy button.
- **Caption contract**: every image carries a caption that states what kind of image it is (AI illustration, real screenshot, photo, HTML/CSS render…) plus a provenance record. The build fails if one is missing.
- **Archive and search**: category tabs, full-text search (`/` or Cmd/Ctrl+K), series navigation.
- **Machine-readable**: full-text RSS, sitemap, `llms.txt`, raw Markdown at `/posts/{slug}/index.md`, Open Graph, Twitter and JSON-LD metadata.
- **Checks**: unit tests for source fidelity, captions, citations and landmarks, plus an SEO/GEO/AIO audit script and optional IndexNow ping.
- **Optional**: diagrams as code (Mermaid, pre-rendered with Pele) and anonymous views/likes (Vercel Function + Redis).

## Quick start
Tested with Node.js 26 and Chrome (Chrome is only needed for browser tests and diagram rendering).

```bash
npm install
# 1. Edit site.config.mjs: domain, names, author, citation format, content license, KINDS, KEYWORD_TERMS
# 2. Replace assets/logos/favicon.png and assets/og/og-site.png
# 3. Replace the sample posts in content/posts/ (and their records in content/image-captions.json)
npm run build    # dist/
npm test         # fidelity, captions, citations, landmarks
npm run seo      # SEO / GEO / AIO audit of dist/
npx vercel deploy --prod   # or upload dist/ to any static host
```

`site.config.mjs` is the only file the engine reads for names, URLs, citation formats and keys. Change the domain before the first public deploy: canonical URLs, RSS, the sitemap and citations all use it.

## Writing workflow
1. Write in your vault. When a note is ready, copy it to `content/posts/{slug}.md`. Turn internal `[[wikilinks]]` into blog links or plain text and remove local paths. Do not rewrite the prose: fix the vault note first, then copy again.
2. Add the frontmatter:

	```yaml
	---
	title: Post title
	slug: english-kebab-slug        # never change after publishing
	date: 2026-10-21                # add a time (2026-10-21T09:00) to order posts on the same day
	kind: 에세이                     # one of the KINDS keys in site.config.mjs
	summary: One or two sentences for the archive, search and link previews
	citationTitleSource: "Post title"
	citationTitleEn: "English translation of the title"
	citationTitleRomanized: "Romanized original title"
	---
	```
	Optional: `updated`, `firstPublished`, `series` + `seriesOrder`, `keywords`, `relatedPosts`.
3. Put images in `content/images/{slug}/`. The first image after the frontmatter is the hero and the link-preview image. Write the caption in the title slot, starting with the image kind, and add the same record to `content/image-captions.json` (`kind`, `caption`, `alt`, `evidence`, `sha256`).
4. Generate citation title candidates with `npm run citation -- "Post title" "English translation"`. Romanization is a spelling aid; check names and loanwords yourself.
5. `npm run build && npm test`, then deploy.

The sample posts in `content/posts/` walk through the same steps in Korean.

## Diagrams (optional)
Write a ```` ```mermaid ```` fence and put a single italic caption line right after it. `npm run diagrams` renders each fence to static SVG (desktop and phone widths) and a PNG for RSS, and the build only reads that cache, so deploys need no browser.

Rendering currently needs the `cmds-pele` toolkit (Pele theme, linter and renderer) next to this folder, and it is not public yet. Until then you can keep the pre-rendered sample diagram or delete that post; every other feature works without it. Tests that need the renderer are skipped automatically when it is missing.

## Views and likes (optional)
`api/engagement.js` is a Vercel Function. It stays off (`{ "enabled": false }`, no counts shown) unless you set server-side environment variables:
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` (or `KV_REST_API_URL` / `KV_REST_API_TOKEN`), for a Redis database used only by this blog
- `ENGAGEMENT_COOKIE_SECRET`: a random secret of at least 32 characters
- `ENGAGEMENT_ALLOWED_ORIGIN`: optional exact preview origin

Counts are approximate reactions per anonymous browser, not unique people.

## Project structure
```
site.config.mjs   site identity, citation format, categories, keyword dictionary  ← yours
content/          posts, images, caption records, diagram cache                    ← yours
assets/logos/, assets/og/   favicon and default link-preview image                ← yours
build.mjs         static generator (index, posts, kinds, RSS, sitemap, llms.txt, search index)
lib/              citations, captions, reader metadata, diagrams
scripts/          diagrams, citation helper, SEO audit
api/              optional engagement function
assets/*.js|css   reader UI, search, diagram styles
tests/            node:test suites and a browser check for diagrams
```

## Engine updates
The engine (everything not marked "yours" above) is exported from the live [jisan-blog](https://github.com/johnfkoo951/jisan-blog) repository. To take a later update, copy the changed engine files over yours. Your config, content and images are never part of the engine.

## License
| Part | License |
|---|---|
| Code (everything except the rows below) | [MIT](LICENSE) |
| Sample posts and sample images in `content/` | CC BY 4.0. Replace them with your own |
| Diagram font subset `assets/fonts/*.woff` (from Pretendard) | SIL Open Font License 1.1, see [assets/fonts/OFL.txt](assets/fonts/OFL.txt) |

The license of your own posts is set in `site.config.mjs` (`license`, `licenseUrl`) and shown on every page.

---

Built by **Yohan Koo (CMDSPACE)** — https://cmdspace.work. Diagrams are rendered with [Pele](https://github.com/obsidianmd/pele).

# Changelog

## 0.1.0: 2026-10-21
- First release of the engine behind 紙散 (Jisan), exported from jisan-blog with `scripts/export-starter.mjs`.
- Site identity moved to `site.config.mjs`: names, URLs, author and citation format, content license, categories (`KINDS`), keyword dictionary, SEO keys, engagement settings and test thresholds.
- Three sample posts (getting started, publishing one post, diagrams as code) with HTML/CSS-rendered heroes, caption records and one pre-rendered Pele diagram.
- Tests run without the private `cmds-pele` toolkit; the two renderer tests are skipped when it is missing.
- Code under MIT. Sample content under CC BY 4.0. Diagram font subset under SIL OFL 1.1.

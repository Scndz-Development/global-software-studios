# SEO configuration

Business name: **Global Software Solution**.

Current public base: https://globalsoftwarestudios.com/

## Implemented

- Unique page titles and descriptions, with software development and UI/UX language grounded in the site's actual services.
- Self-referencing canonical URLs that use the configured custom domain.
- Organization, WebSite and WebPage JSON-LD on the home page. No invented logo, legal registration, location, ratings, awards or project results are claimed.
- Complete Open Graph and Twitter metadata, including a locally hosted 1200×630 social image and descriptive alternative text.
- An XML sitemap listing the home, terms, privacy and credits pages. Confirmation and error pages have `noindex` metadata and are excluded from the sitemap.
- Semantic headings, descriptive images, internal legal-page navigation, responsive images, local WOFF2 fonts and crawlable HTML content.
- A true custom 404 page with a home link that follows the configured base URL.

## Search Console and custom domain

Indexing and ranking are controlled by search engines; metadata does not guarantee either. The owner can verify a URL-prefix property in Google Search Console and submit `https://globalsoftwarestudios.com/sitemap.xml`.

GitHub project Pages serves this repository below a path. Its `robots.txt` is therefore below that path too; crawlers normally request robots.txt at the host root, which this repository does not control. The supplied file becomes the root robots.txt when a custom domain is attached. The live HTML robots tags and directly submitted sitemap work independently of that file.

The supplied target domain remains **globalsoftwarestudios.com**. When it resolves to this site and GitHub Pages has issued its certificate, run:

```sh
python3 tools/configure_site.py --base-url https://globalsoftwarestudios.com/
```

Commit and push the resulting files. If a real `CNAME` file is present, running the helper with no argument derives its base from that file. It updates canonical/social/schema/sitemap/robots URLs, the 404 link, and the inquiry form's fallback return URL together. See `DEPLOYMENT.md`; the `www` CNAME target is now **scndz-development.github.io**.

GitHub redirects old repository URLs after a transfer, but the former personal-account Pages URL does not redirect to the organization Pages URL. Update external links to the new website address. The repository's numeric identity and original Git history were preserved.

References: [Google canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization), [GitHub transfer behavior](https://docs.github.com/en/repositories/creating-and-managing-repositories/transferring-a-repository).

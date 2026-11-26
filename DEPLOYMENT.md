# GitHub Pages and custom domain

Repository: https://github.com/Scndz-Development/global-software-studios

## GitHub Pages

In **Settings → Pages**, select **Deploy from a branch**, branch **main**, folder **/ (root)**. The site is buildless, and `.nojekyll` ensures the static files are served directly.

Default URL: https://scndz-development.github.io/global-software-studios/

## Connect GlobalSoftwareStudios.com

1. In GitHub, verify domain ownership in the organization's **Settings → Pages** using GitHub's requested TXT record. This helps protect domain ownership.
2. In the repository's **Settings → Pages → Custom domain**, enter `globalsoftwarestudios.com` and save. GitHub creates a `CNAME` file in the root. Alternatively, rename `CNAME.example` to `CNAME`, commit and push it; the file must contain only `globalsoftwarestudios.com`.
3. At your DNS provider, configure these records:

| Type | Host/name | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | scndz-development.github.io |

For Namecheap, this is normally **Domain List → Manage → Advanced DNS → Host Records** if Namecheap is your authoritative DNS provider. Use Automatic TTL. Replace conflicting parked-domain A/CNAME/URL Redirect records for `@` or `www`; keep unrelated mail/MX/TXT records.

The `www` CNAME points to `scndz-development.github.io`, without `https://`, a trailing path or the repository name. The root domain uses the four A records above. You do not need hosting from the registrar.

4. Wait for DNS propagation and GitHub's domain check and certificate issuance. When available, enable **Enforce HTTPS** in GitHub Pages settings.
5. Check both `https://globalsoftwarestudios.com` and `https://www.globalsoftwarestudios.com`. The second should redirect to the configured root domain.
6. Once the custom domain is active, run `python3 tools/configure_site.py --base-url https://globalsoftwarestudios.com/`, then commit and push. This updates canonical URLs, structured data, social images, robots, sitemap, the 404 home link and the form fallback return URL together. If a real `CNAME` file is present, running the script without `--base-url` uses that domain. No package installation is needed.

The custom domain is configured as `globalsoftwarestudios.com` in `CNAME` and GitHub Pages settings. Namecheap has the four A records and www CNAME above, with Private Email records preserved. GitHub has approved the root/www TLS certificate and HTTPS enforcement is enabled. Canonical, social, schema, sitemap, robots and form return URLs use `https://globalsoftwarestudios.com/`. The website itself has no build step or runtime server. The optional script only edits the static source files.

GitHub documentation:
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages
- https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https

# GitHub Pages and custom domain

Repository: https://github.com/knightndgale/global-software-studios

## GitHub Pages

In **Settings → Pages**, select **Deploy from a branch**, branch **main**, folder **/ (root)**. The site is buildless, and `.nojekyll` ensures the static files are served directly.

Default URL: https://knightndgale.github.io/global-software-studios/

## Connect GlobalSoftwareStudios.com

1. In GitHub, verify domain ownership in your account's **Settings → Pages** using GitHub's requested TXT record. This helps protect domain ownership.
2. In the repository's **Settings → Pages → Custom domain**, enter `globalsoftwarestudios.com` and save. GitHub creates a `CNAME` file in the root. Alternatively, rename `CNAME.example` to `CNAME`, commit and push it; the file must contain only `globalsoftwarestudios.com`.
3. At your DNS provider, configure these records:

| Type | Host/name | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | knightndgale.github.io |

For Namecheap, this is normally **Domain List → Manage → Advanced DNS → Host Records** if Namecheap is your authoritative DNS provider. Use Automatic TTL. Replace conflicting parked-domain A/CNAME/URL Redirect records for `@` or `www`; keep unrelated mail/MX/TXT records.

The `www` CNAME points to `knightndgale.github.io`, without `https://`, a trailing path or the repository name. The root domain uses the four A records above. You do not need hosting from the registrar.

4. Wait for DNS propagation and GitHub's domain check and certificate issuance. When available, enable **Enforce HTTPS** in GitHub Pages settings.
5. Check both `https://globalsoftwarestudios.com` and `https://www.globalsoftwarestudios.com`. The second should redirect to the configured root domain.
6. Update the home link in `404.html` to `https://globalsoftwarestudios.com/` once the custom domain is active. Its initial link uses the verified GitHub Pages address.

The page's canonical URL, social-card URL, robots and sitemap already target the requested custom domain. Social previews need that domain to be connected before they can fetch the image. Keep the GitHub Pages URL for initial review.

GitHub documentation:
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages
- https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https

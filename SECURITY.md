# Website security

## Reporting a concern

Contact **jay.sterling@globalsoftwarestudios.com**, with a description of the issue and steps to reproduce it. Do not post credentials, private inquiries or personal information in a public issue. Please avoid disruptive tests against the live site or its providers.

## Implemented controls

- Static HTML, CSS and JavaScript only: no application server, database, login, upload endpoint, CMS or browser-side email credentials.
- HTTPS is enforced in GitHub Pages settings.
- Every HTML page has an early Content Security Policy. It allows this site's scripts, styles, fonts and images; connections and form submissions are limited to FormSubmit. It blocks object/plugin content, base-URL changes, inline event handlers, inline executable scripts and eval-style execution. Home-page JSON-LD is authorized with an exact SHA-256 hash.
- No third-party runtime JavaScript, font CDN, analytics library, cookie store or browser storage dependency.
- Inquiry text is rendered with text nodes, never `innerHTML`. The outbound JSON is built from an explicit allowlist with fixed recipient routing, no browser credentials, no redirects and no page query string.
- Inquiry fields have limits and validation. The form has a honeypot, required agreement acknowledgment, duplicate-send protection and a request timeout. These are usability/abuse defenses; a public browser form is not an authenticated API or a server-side rate limiter.
- Source and both existing Git commits were checked for common credential formats; no matches were found. GitHub secret scanning and push protection are enabled on the organization repository.
- Dependency vulnerability alerts and Dependabot security updates are enabled for future supported manifests. The shipped website currently has no npm or other runtime package dependencies.
- `main` branch protection is enabled for administrators as well: force pushes and branch deletion are blocked, and PR conversations must be resolved. Authorized maintainers can still publish ordinary commits.

## Hosting and provider limits

GitHub Pages controls the HTTP response headers. This repository cannot set custom `Content-Security-Policy` response headers, `X-Frame-Options`, `Permissions-Policy` or `X-Content-Type-Options` through an `_headers` file or HTML metadata. In particular, `frame-ancestors` is not supported in a meta CSP, so no claim of a custom anti-framing header is made. A header-capable proxy or host would be needed to add that protection. See [MDN's CSP reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors).

FormSubmit is a third-party processor. Its activation, delivery, spam controls and availability apply. A fixed address visible in a public form is not a secret; direct requests to the provider cannot be prevented by frontend code. Recipient activation and inbox delivery testing remain owner tasks.

Repository and organization account security remain important: maintain MFA/passkeys, review collaborator access and watch GitHub security notifications. No existing account credentials, organization-wide sign-in policy or collaborator permissions were changed during this update.

These controls reduce risk. They do not certify that the site, GitHub account or external providers cannot be compromised. The checks are not a penetration test or a warranty of security.

## After changing the domain or structured data

Run `python3 tools/configure_site.py` (or supply `--base-url`). The helper refreshes the structured-data CSP hash and all public URLs. Commit the resulting static files; no runtime server or package install is required.

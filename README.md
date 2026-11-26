# Global Software Solution

A responsive, buildless studio website for **GlobalSoftwareStudios.com**. Plain HTML, CSS and JavaScript; no Node.js, package installation, database, server or build step is needed for hosting.

## Files

- `index.html` — studio home, portfolio, services, process, FAQ and contact.
- `styles.css` — responsive layouts, focus states, reduced-motion and print styles.
- `script.js` — mobile navigation, accessible project dialogs and inquiry validation/delivery.
- `credits.html` — photography/font attribution.
- `terms.html` and `privacy.html` — website terms, inquiry data handling and contact details.
- `site.json` and `tools/configure_site.py` — optional standard-library helper to update static metadata after a domain change.
- `SECURITY.md` — implemented defenses, hosting limits and reporting contact.
- `SEO.md` — indexing configuration and custom-domain migration.
- `404.html` — custom not-found page.
- `thank-you.html` — fallback confirmation page after FormSubmit accepts an HTML form submission.
- `INQUIRY-SETUP.md` — recipients, provider activation and delivery checks.
- `RESEARCH.md` — primary-source benchmarks and how they informed this revision.
- `assets/` — self-hosted photos, fonts, source project wordmarks, social card and brief template.
- `.nojekyll` — serves the source files directly on GitHub Pages.
- `CNAME.example` — domain value to use when connecting the domain.
- `DEPLOYMENT.md` — exact GitHub Pages and DNS setup.
- `QA.md` — validation performed and remaining setup considerations.

## Hosting

The repository is configured for GitHub Pages from `main` → `/ (root)`. Any push to `main` publishes the updated static files. There are no npm commands to run.

Temporary URL: https://scndz-development.github.io/global-software-studios/

The repository is owned by **Scndz-Development**, with its original history preserved. The custom domain is deliberately not activated until DNS is ready, so the GitHub Pages preview stays usable. Follow `DEPLOYMENT.md` to connect it.

## Editing content

Project cards and all general copy live in `index.html`. Expanded project descriptions live in `script.js`; update both the cards and their matching dialog definitions when scope changes. The no-JavaScript overviews at the end of `index.html` should also stay aligned.

The portfolio uses PNTZE’s supplied wordmark and SCNDZ’s source stacked wordmark, with custom background illustrations. CFS uses a text identifier because its available design materials do not contain separate logo artwork. The studio name is text only; no company logo is claimed. Project status is explicitly ongoing. No internal documents, private chat URLs or repository implementation details are published.

### Contact

The inquiry form sends to `knightndgale@gmail.com` with `jay.sterling@mail.com` copied through FormSubmit. Visitor email is the Reply-To address. The form validates locally, blocks duplicate clicks while sending and preserves entries after delivery errors or activation requirements. An email-app fallback addresses both recipients.

The hosted endpoint requires one-time activation by the primary recipient before it can deliver submissions. See `INQUIRY-SETUP.md`. No email passwords, API keys or private SMTP credentials are embedded in the source.


### Fonts and photographs

All display assets are local; visitors do not contact font or photography CDNs. See `credits.html` and `assets/OFL-Manrope.txt`. Do not substitute paid Unsplash+ assets without an appropriate license.

## Local preview (optional)

Open `index.html` directly, or serve the folder with any static preview tool. For example, if Python is installed:

```sh
python3 -m http.server 4173
```

Visit http://localhost:4173/. This is only a local preview; GitHub serves the production site.

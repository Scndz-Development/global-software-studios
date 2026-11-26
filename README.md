# Global Software Studios

A responsive, buildless studio website for **GlobalSoftwareStudios.com**. Plain HTML, CSS and JavaScript; no Node.js, package installation, database, server or build step is needed for hosting.

## Files

- `index.html` — studio home, portfolio, services, process, FAQ and contact.
- `styles.css` — responsive layouts, focus states, reduced-motion and print styles.
- `script.js` — mobile navigation and accessible native project dialogs.
- `credits.html` — photography/font attribution and privacy information.
- `404.html` — custom not-found page.
- `assets/` — self-hosted photos, fonts, brand mark, social card and brief template.
- `.nojekyll` — serves the source files directly on GitHub Pages.
- `CNAME.example` — domain value to use when connecting the domain.
- `DEPLOYMENT.md` — exact GitHub Pages and DNS setup.
- `QA.md` — validation performed and remaining setup considerations.

## Hosting

The repository is configured for GitHub Pages from `main` → `/ (root)`. Any push to `main` publishes the updated static files. There are no npm commands to run.

Temporary URL: https://knightndgale.github.io/global-software-studios/

The custom domain is deliberately not activated until DNS is ready, so the GitHub Pages preview stays usable. Follow `DEPLOYMENT.md` to connect it.

## Editing content

Project cards and all general copy live in `index.html`. Expanded project descriptions live in `script.js`; update both the cards and their matching dialog definitions when scope changes. The no-JavaScript overviews at the end of `index.html` should also stay aligned.

The portfolio uses custom concept illustrations, not screenshots or official client logos. Project status is explicitly ongoing. No internal documents, private chat URLs or repository implementation details are published.

### Contact

The current call to action opens Mark's GitHub profile because a business email has not yet been supplied. To switch to email, change the `.contact-link` href to `mailto:YOUR_ADDRESS`, set its visible text to `Start a conversation`, update `.contact-caption`, and update the contact line in `assets/project-brief.txt`. There is no form that pretends to submit data.

### Fonts and photographs

All display assets are local; visitors do not contact font or photography CDNs. See `credits.html` and `assets/OFL-Manrope.txt`. Do not substitute paid Unsplash+ assets without an appropriate license.

## Local preview (optional)

Open `index.html` directly, or serve the folder with any static preview tool. For example, if Python is installed:

```sh
python3 -m http.server 4173
```

Visit http://localhost:4173/. This is only a local preview; GitHub serves the production site.

# QA record — 26 November 2026

## Verified locally in Brave (Chromium)

- Responsive widths: 320, 375, 620, 768, 1024 and 1440 CSS pixels. Document width matched viewport width at each size; no horizontal overflow. All photo and brand assets loaded.
- Desktop hero and portfolio, mobile hero and modal, contact/FAQ and credits were visually reviewed.
- Mobile menu opens, exposes navigation, closes on section selection, and updates `aria-expanded`.
- PNTZE, SCNDZ and CFS links open the correct overview. Close control and Escape dismiss them, body scrolling is restored, and focus returns to the invoking project link.
- Forward and reverse keyboard focus wrap inside the modal. An explicit focus-cycle handler was added after the reverse-tab check exposed browser-chrome focus behavior.
- All four native FAQ disclosures expand and display their answers.
- Project brief link invokes a browser save dialog; the 679-byte `project-brief.txt` download completed and was saved to the local QA folder.
- Credits navigation loads its page. All site resource and local link targets respond over HTTP.
- No browser console errors or warnings were returned in the tested session.

## Static validation

- JavaScript syntax passes `node --check` (Node is used only as a development syntax checker; the website has no Node dependency).
- 52 local structure/link/resource/HTTP checks passed: unique IDs, one h1 per page, language declarations, image alternatives, accessible button names, new-tab security attributes, hash targets and local assets.
- Core text contrast ratios range from **5.57:1 to 15.50:1**, exceeding WCAG AA's normal-text minimum for those tested solid-color pairs. Text over photography uses dark gradient overlays and was visually reviewed; this is not an exhaustive accessibility certification.
- Images are responsive WebP with declared dimensions. The below-the-fold photograph is lazy-loaded. Fonts use WOFF2 with `font-display: swap`.
- The entire website is approximately 305 KB before Git metadata and documentation updates, including both photo sizes, both fonts and the share image.
- No third-party runtime scripts, remote fonts, analytics, cookies or form-processing dependencies.
- Reduced-motion CSS disables transitions and smooth scrolling. Native disclosures and static anchor overviews provide progressive fallback without JavaScript; that fallback was inspected in source, not tested with browser JavaScript disabled.

## Scope and remaining setup

- QA used desktop Brave with responsive viewport simulation. Physical iOS/Android devices and Safari/Firefox were not independently tested.
- GitHub is the initial contact destination. Replace it with a supplied business email when ready.
- Project descriptions deliberately identify ongoing work. Abstract visuals are labeled concept illustrations and do not claim to be actual product screenshots.
- Custom-domain DNS, ownership verification and HTTPS certificate issuance remain dependent on the domain owner's configuration. See `DEPLOYMENT.md`.
- Canonical/social/sitemap URLs target the requested domain, so social-image fetches need that domain to be connected.

# QA record — 26 November 2026 revision

## Branding and project assets

- Business name updated to **Global Software Solution** across the header, footer, page titles, metadata, social share image, brief and documentation. The supplied `globalsoftwarestudios.com` domain and existing GitHub repository are retained.
- Removed the invented company icon and hero monogram. The business name is presented as plain text.
- PNTZE uses its supplied pink-terminal wordmark exported from the existing design reference, without redrawing the lettering.
- SCNDZ uses the application source's stacked SC / ND / Z wordmark, orange dot and Oswald typeface. CFS has no separate logo artwork in the available source and remains a text identifier.
- Fonts and photos are self-hosted. Font licenses and asset provenance are documented in the credits page.

## Inquiry behavior: ten automated tests passed

Provider responses were simulated; these tests do not establish live inbox delivery.

1. Required fields prevent requests and produce a focused, linked error summary.
2. Invalid email and short messages are rejected.
3. Accepted submissions use the correct primary endpoint, CC and visitor Reply-To, then reset the form.
4. Activation-required responses preserve entries and explain the next step.
5. Provider rejection preserves entries and restores the button.
6. Network failure retains the full message.
7. Repeated clicks while sending produce only one request.
8. A timeout does not claim delivery or automatically retry.
9. A filled honeypot blocks transmission.
10. Service starting-point buttons select the matching inquiry category and focus the name field.

The tests exposed malformed service option tags during implementation; the tags were corrected and all six options, including the initial prompt, are now present. The complete ten-test suite passed after the correction.

## Browser and static checks

- Reviewed in Brave at 320, 375, 768, 1024 and 1440 CSS pixels. Document width matched the viewport at each size; no horizontal overflow.
- All visible inquiry inputs have associated labels. Controls retain a minimum 16px input font.
- Empty and invalid form submissions show inline messages, focus the linked summary and do not leave the page.
- Starting-point selection updates the real select control. Mobile menu and existing project dialogs remain functional.
- Source project wordmarks, desktop header, mobile contact layout and inquiry states were visually reviewed.
- JavaScript syntax check and 56 local structure/link/resource/HTTP checks passed.
- Core solid-color text contrast ratios range from 5.57:1 to 15.50:1. This is not a full accessibility certification.
- The site remains buildless HTML, CSS and JavaScript. No Node runtime, SMTP password or Gmail credential is required for hosting.
- Third-party inquiry processing and the two recipients are disclosed before submission and in the privacy section.

## Delivery activation and verification limits

FormSubmit requires one-time recipient activation. A real test email has not been sent by the agent without the user's permission. Live inbox delivery and Reply-To behavior remain to be confirmed after activation. See `INQUIRY-SETUP.md`.

Provider acceptance is kept distinct from confirmed inbox arrival. Error, timeout and activation responses retain entered text and offer the email-app fallback addressed to both recipients. Physical iOS/Android devices and Safari/Firefox were not independently tested.

## Organization, terms, SEO and security update

- Renamed the business to **Global Software Solution** and transferred the same repository (numeric ID 1472933663) to **Scndz-Development** with its original history preserved.
- Added website-use terms, a separate privacy notice, footer links and required inquiry agreement acknowledgment with version `2026-11-26`. No jurisdiction or legal-entity details were invented. Paid project agreements remain separate.
- Twelve inquiry tests pass, adding mandatory agreement and an injected-delivery-control/query-stripping test to the earlier suite. All provider responses are simulated; no live email test was sent.
- Canonical, Open Graph, Twitter, JSON-LD, sitemap, robots and fallback URLs now target the organization's actual live Pages base. The optional metadata helper updates all related files together after a future custom-domain change.
- Eighty-two SEO/security structure and history checks passed before final documentation updates: CSP directives and JSON-LD hash, canonical consistency, no inline handlers/CSS, no unapproved runtime scripts, safe text rendering, mandatory consent, expected recipients and a common-credential-pattern scan of both existing commits.
- Ninety-two local HTML/asset/link/HTTP checks passed before final documentation updates. Core solid-color text contrast checks remain above AA minimums for the tested pairs.
- In Brave, scripts and inquiry validation work under the new CSP. An empty inquiry reports five required-field errors, including agreement, without a request. The terms page renders and navigation works; no site-origin console warnings/errors were returned in that check.
- GitHub API readback confirms HTTPS enforcement, secret scanning, push protection, dependency vulnerability alerts/updates and protected `main` with force-push/deletion blocking and admin enforcement.
- GitHub Pages response-header limitations and provider activation/inbox-delivery limits are documented in `SECURITY.md` and `INQUIRY-SETUP.md`. These checks do not establish immunity to compromise or replace a penetration test.

## PNTZE logo presentation refinement

Removed the pink card background and inset white badge. The logo now sits centered on a single white surface, with clear space and its original aspect ratio. The source PNG is unchanged. Verified in Brave on desktop and at 375px: no horizontal overflow, transparent wrapper background, loaded asset and zero horizontal/vertical center offset.

## Company email update

Replaced Jay’s old address with jay.sterling@globalsoftwarestudios.com in AJAX and native form delivery, direct email links, contact metadata, privacy/terms text and project brief. Added a direct email link in the footer and clarified the contact section heading. All 12 mocked inquiry checks and 86 SEO/security checks passed, including the refreshed structured-data CSP hash. Browser access was unavailable in this chat; no visual recheck or real email delivery test was performed.

## Custom domain configuration

Configured `globalsoftwarestudios.com` in CNAME and regenerated canonical, social, structured-data, sitemap, robots, 404 and inquiry return URLs. The structured-data CSP hash was refreshed. All 12 mocked inquiry checks and 87 SEO/security checks passed for the domain root deployment. DNS and HTTPS activation require separate live verification.

Namecheap DNS configured: `www` CNAME points to `scndz-development.github.io`; the root has all four GitHub Pages A records (`185.199.108.153` through `185.199.111.153`). The parked URL redirect was replaced. Authoritative DNS returned all four addresses and both original Private Email MX hosts. DKIM and the Private Email configuration were preserved. GitHub Pages deployment completed; certificate issuance was still pending while GitHub’s resolver retained an older root-domain response.

## HTTPS activation — 2026-11-27

GitHub approved the certificate for `globalsoftwarestudios.com` and `www.globalsoftwarestudios.com`. Enabled HTTPS enforcement through the Pages API and verified `https_enforced: true`. The root HTTPS URL returned HTTP 200 with certificate verification enabled.

## Globe identity, postal address and public contact — 2026-11-27

Added a transparent globe mark isolated from the owner’s supplied reference to site headers, the home footer, favicon and Organization metadata. Kept the reference’s raster wordmark out of the asset. Added the supplied Cyprus address to the contact section, all existing footers, legal contact details, downloadable brief and PostalAddress schema, with map links. Public pages use Email us links/buttons instead of displaying either recipient address. Knight’s email remains the primary form endpoint and Jay remains CC. Updated response and consent copy to name Knight and Jay.

Validation: 12 mocked inquiry checks passed; SEO/security checks passed with the regenerated schema CSP hash. Checked visible page text for raw recipient addresses, footer address coverage, mailto destinations, native/AJAX form recipients and logo resource references. Browser activity interrupted local visual QA, so no new desktop/mobile screenshot was verified in this revision. No real inquiry was sent.

## Favicon and navigation logo sizing — 2026-11-27

Added a root multi-size favicon.ico (16/32/48), explicit 16/32px PNG favicon links and a 180px Apple touch icon using the existing globe artwork. All six HTML pages reference the icons with a new cache version. Navigation globe is reduced from 56px to 36px (32px on mobile), with tighter spacing; footer globe is set to 40px in the redesigned footer. Verified icon file signatures, dimensions, alpha, ICO frame entries, link targets and CSS scope.

## Footer hierarchy refinement — 2026-11-27

Replaced the repeated full-width footer rows with a three-column brand/contact/address grid and one compact copyright/legal row on all five pages with footers. Mobile stacks those sections and keeps project/email actions together. Removed the requested receiver sentence below the form submit button. Verified the desktop and 375px mobile layouts in Brave, including the smaller navigation mark and loaded tab favicon; saved screenshots. The Start a project link navigated to the contact section. Browser console messages were extension warnings and blocked local DevTools discovery requests; no application-code error was observed. Temporary device emulation and DevTools were closed after QA.

## Public copy cleanup — 2026-11-27

Removed all View on map links, the brief download link and its FAQ reference, the hero photo credit line, hero service footnote and the Project identities section on Credits. Photography/font license attribution remains on Credits. Terms display Effective June 2026, Version 2026-06; both native and AJAX submissions send that matching terms version. Inquiry, consent, confirmation and privacy copy refer to the team and form. The privacy notice describes automatic submission archiving without naming vendors or promising a fixed retention period. Form delivery endpoints and both recipients are unchanged.

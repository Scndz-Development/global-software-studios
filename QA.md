# QA record — 26 November 2026 revision

## Branding and project assets

- Business name updated to **Global Software Solutions Studio** across the header, footer, page titles, metadata, social share image, brief and documentation. The supplied `globalsoftwarestudios.com` domain and existing GitHub repository are retained.
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

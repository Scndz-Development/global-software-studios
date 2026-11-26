# Inquiry delivery setup

## Routing

- To: **knightndgale@gmail.com**
- CC: **jay.sterling@mail.com**
- Reply-To: the visitor's validated email address.
- Subject: **New project inquiry — Global Software Solutions Studio**.
- Provider: [FormSubmit](https://formsubmit.co/), a hosted form-to-email endpoint. GitHub Pages still hosts static files only. There is no Node server or email password in the source.

## One-time activation

FormSubmit requires the primary recipient to confirm an activation email before submissions are delivered. The first real submission triggers that email. Open it in **knightndgale@gmail.com**, check that it refers to this website, and select its activation link. Check Spam if necessary.

After activation, submit a clearly identified test inquiry and confirm it arrives in both inboxes. The normal success message confirms acceptance by the email service; it does not itself prove arrival in either mailbox. Mark should also test replying to confirm that Reply-To points to the visitor's address.

If activation is pending, the JavaScript form retains the message and directs visitors to the **Email both of us** link. A failed request, timeout or unconfirmed result retains all entered information and restores the send button. There are no automatic retry loops.

The provider is a third-party dependency. Its spam controls and delivery availability apply. The HTML POST fallback retains the provider's default verification behavior; the AJAX path uses the provider's documented cross-origin endpoint. A hidden honeypot blocks obvious automated submissions locally and is also included in the provider payload.

## Custom domain

The AJAX request uses the current page URL as its source. If FormSubmit asks to activate the new website origin after switching to `globalsoftwarestudios.com`, repeat the activation for that origin. Update `_next` in `index.html` to `https://globalsoftwarestudios.com/thank-you.html` so the no-JavaScript fallback returns to the custom domain.

## Editing

Recipients appear in the form action, hidden `_cc`, JavaScript AJAX endpoint, visible contact addresses and fallback email links. Keep them synchronized if changed. Privacy details are in `credits.html#privacy`.

Form responses must remain text. Do not render visitor input as HTML. Do not add SMTP, Gmail or mail.com credentials to public source.

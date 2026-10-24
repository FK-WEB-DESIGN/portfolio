# Farah Karim — Portfolio

Frontend-only personal portfolio for **Farah Karim**, Multimedia Designer & Video Editor. Content is taken from the CV. There is no backend, CMS, database, authentication, or contact-form submission.

## Open the site

Open `index.html` in a browser, or serve the folder locally:

```bash
npx serve .
```

## Update content

Repeatable content lives in `js/data.js`:

- Contact details and LinkedIn URL
- Skills
- Experience
- Portfolio projects and images
- Certifications

`js/main.js` renders those lists and only shows LinkedIn when `linkedinUrl` is a real `http(s)` URL. Until then it stays:

```js
linkedinUrl: "REPLACE_WITH_LINKEDIN_PROFILE_URL"
```

Do not invent other social profiles. Do not add fake project or client URLs. If a project has no live link, leave it without a button.

The markup in `index.html` is a no-JavaScript fallback. After you change `js/data.js`, visitors with JavaScript enabled will see the updated lists automatically.

## Replace images

1. Add files under `assets/images/` (for example `profile-placeholder.jpg`, `project-01.jpg`).
2. Point `profileImage` and each project `image` in `js/data.js` to those local paths.

Current placeholders:

- Profile: `https://picsum.photos/seed/farah-karim/800/900`
- Projects: `https://placehold.co/` images defined in `js/data.js`

## Stack

- HTML, custom CSS, a small amount of JavaScript
- Bootstrap 5.3.8 for grid, navbar, and breakpoints
- Google Fonts: Montserrat (headings), Open Sans (body)
- Font Awesome 7.3.0 for icons

Colors are limited to white (`#FFFFFF`), accent (`#FFBF65`), and dark (`#2C2C2C`).

## File map

```text
index.html
assets/images/
assets/favicon/
css/variables.css
css/base.css
css/components.css
css/responsive.css
js/data.js
js/main.js
README.md
```

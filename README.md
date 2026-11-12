# Win Thant Tin Han - Portfolio

Personal portfolio site: projects, experience, and resume.

**Live:** [win-thant-portfolio.vercel.app](https://win-thant-portfolio.vercel.app)

## Highlights

- **Bookshelf projects page.** Each project is a book spine colored by category. Clicking a spine pulls the book off the shelf and opens it into a detail view (Framer Motion shared layout animation inside an accessible Radix dialog). Arrow keys move along the shelf and between open books.
- **List view toggle.** A plain, skimmable list of every project with summary, stack, and links. The choice is remembered per visitor, and both views are server-rendered, so all project text is in the page HTML.
- **Accessible by default.** Skip link, visible focus styles, keyboard support, reduced-motion support, and no axe (WCAG A/AA) violations across pages.
- **Light and fast.** Mostly server components, self-hosted fonts, a CSS-only hero animation, and static pages.
- **Content in one place.** All projects, experience, skills, and profile info live in typed data files, so updating the site rarely means touching components.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) and React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion (bookshelf animation)
- Radix UI (dialog, tabs) via shadcn/ui
- Lucide icons
- Vercel (hosting and analytics)

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command                | What it does                            |
| ---------------------- | --------------------------------------- |
| `npm run dev`          | Start the dev server (Turbopack)        |
| `npm run build`        | Production build                        |
| `npm start`            | Serve the production build              |
| `npm run lint`         | Run ESLint                              |
| `npm run format`       | Format everything with Prettier         |
| `npm run format:check` | Check formatting without changing files |

## Project structure

```
.
├── public/                  # images, video, resume PDF, tech stack icons
└── src/
    ├── app/                 # routes: /, /projects, /experience, /about, /contact, /resume
    │   ├── layout.tsx       # fonts, metadata, header and footer
    │   ├── globals.css      # color tokens, type styles, bookshelf styles
    │   └── opengraph-image.png
    ├── components/
    │   ├── layout/          # Header, Footer
    │   ├── sections/        # homepage sections
    │   ├── shelf/           # Bookshelf, BookDetail, ProjectList, view toggle
    │   └── ui/              # shadcn/ui primitives (sheet, tabs)
    ├── data/                # projects, experience, skills, profile, shared types
    ├── fonts/               # self-hosted Newsreader and Hanken Grotesk
    └── lib/                 # date formatting and small helpers
```

## Editing content

Everything is in `src/data/`:

- `projects.ts`: projects shown on the homepage, bookshelf, list view, and resume
- `experience.ts`: roles on the experience page and resume
- `skills.ts`: the "Tools I reach for" section and resume skills
- `profile.ts`: name, links, education, research

### Adding a project

Add an entry to `projects.ts`. Useful optional fields under `portfolio`:

- `featured: true` shows it on the homepage and adds a gold band to its spine
- `spineTitle` is a short label for the spine (keep it under about 19 characters so it fits on phones)
- `image` and `imageMode` (`"cover"`, `"contain"`, or `"logo"`) control the thumbnail

The spine color and icon come from the project's `category`, set in `src/components/shelf/bookType.ts`.

## Code style

Prettier and EditorConfig keep formatting consistent (tabs, displayed 4 wide). Run `npm run format` before committing, or turn on format-on-save in your editor.

## Deployment

Deployed on Vercel from the repository root. Pushes to `main` deploy to production, and other branches get preview URLs.

## Credits

Fonts: [Newsreader](https://fonts.google.com/specimen/Newsreader) and [Hanken Grotesk](https://fonts.google.com/specimen/Hanken+Grotesk), both under the SIL Open Font License.

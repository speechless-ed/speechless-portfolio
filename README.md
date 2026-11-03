# Speechless: personal portfolio

A single-page portfolio for **Bosuakpe Michael Edem ("Speechless")**, a Robotics Engineering and AI student at the University of Mines and Technology (UMaT), Ghana. It presents him honestly as a developing builder: nothing about employment, awards, customers, or skill levels is invented.

Built with React 19, Vite, plain JavaScript and CSS, and Lucide icons. There is no backend, database, analytics, cookies, or third-party scripts. It is hosted on GitHub Pages.

## Build stages

The site is built in stages. Each stage is deployed and checked before the next one starts.

| Stage | What it adds | Status |
| --- | --- | --- |
| 1 | Foundation: navigation, hero, footer, GitHub Pages deployment | **Current** |
| 2 | About and Projects sections | Planned |
| 3 | Skills, Journey, and Contact sections | Planned |
| 4 | Content editor at `/#/admin` (edit all details in the browser, then export) | Planned |

The complete version (all stages together) is kept on the `full` git branch.

## Local setup (optional)

You do not need to run anything locally to publish: GitHub builds the site for you (see below). To preview on your computer, install Node.js 20.19 or newer, then:

```bash
npm install
npm run dev       # dev server, usually http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

On Windows PowerShell, if `npm` is blocked by the execution policy, use `npm.cmd` instead (for example `npm.cmd install`).

## Editing your information

All text lives in **`src/content/content.json`**: name, hero text, about, projects, skills, journey, contact links, footer. Blank values are hidden on the site rather than shown as fake details. Stage 1 displays the `site`, `hero`, and `footer` parts; the rest is filled in and ready for the later stages.

To change something, edit that file (GitHub lets you do this in the browser: open the file and click the pencil icon), commit, and the site redeploys.

## Publish on GitHub Pages

One-time setup:

1. Create a new **public** repository on GitHub (any name, for example `speechless-portfolio`).
2. Upload this project's files to it, keeping the folder structure. Make sure the `.github/workflows/deploy.yml` file is included.
3. In the repository, open **Settings, Pages**, and under **Build and deployment** set **Source** to **GitHub Actions**.
4. Go to the **Actions** tab. The "Deploy to GitHub Pages" workflow runs on every push to `main` (the first run starts after step 2; if it ran before step 3, open it and choose **Re-run all jobs**).
5. When it shows a green tick, your site is at `https://<your-username>.github.io/<repository-name>/`.

Every later push to `main` redeploys automatically. No environment variables or secrets are needed, and the workflow sets the full address that link previews need.

## Project structure

```
.github/workflows/   deploy.yml: builds and publishes to GitHub Pages
public/              logo, favicon, share image
src/
  content/           content.json, content store, React context, section list
  components/        Navbar, Hero, ConnectedGraphic, Footer
  styles/            tokens.css (design tokens), base.css, site.css
  utils/             link safety, content normalising, asset paths
```

## Later: live editing with Supabase

All reading of content goes through `src/content/contentStore.js`. To make edits go live instantly, swap its functions for calls to a Supabase table (with login and row-level security so only you can write). The rest of the app does not need to change.

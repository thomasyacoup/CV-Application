# CV Application

A web-based resume builder focused on the classic **Jake's Resume** format (Overleaf's popular CS/software-engineering template), built as a hands-on project for learning React fundamentals — routing, `useReducer`, Context, and controlled forms — without leaning on state-management libraries.

**[Live demo →](https://cv-application-seven-pi.vercel.app/home)**

<p align="center">
  <img src="./src/assets/Free Resume-1.png   " alt="CV Application screenshot" width="700" />
</p>

## Features

- **Split-screen live preview** — edit your resume on the left, see the formatted result on the right, styled to match Jake's Resume layout.
- **Section-based forms** — add, edit, and delete entries for Education, Experience, Projects, and Skills, each with its own collapsible form.
- **Drag-to-reorder** — reorder entries within a section by dragging them into place.
- **Rich text skills editor** — format the Skills section with a lightweight WYSIWYG editor.
- **Print-ready export** — export straight to PDF using the browser's native print dialog (styled specifically for print, so it comes out clean with no UI chrome).
- **Fully client-side** — no backend, no accounts, nothing leaves your browser.

## Tech Stack

- **React 19** — UI, all state managed with built-in hooks (`useState`, `useReducer`, `useContext`) rather than external state libraries.
- **React Router (Data mode)** — routing via `createBrowserRouter`.
- **Tailwind CSS + shadcn/ui** — styling and UI primitives.
- **Motion** — animations and the drag-to-reorder interaction.
- **React Quill** — rich text editing for the Skills section.
- **Vite** — dev server and build tooling.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/thomasyacoup/CV-Application.git
   cd CV-Application
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the app at the local URL Vite prints in your terminal (typically `http://localhost:5173`).

## Usage

- Go to `/app` to open the builder (the `/home` route is the landing page).
- Expand a section (Education, Experience, Projects, Skills) and fill in the form.
- Hit **Save** on an entry to commit it — the preview on the right updates immediately after saving.
- Drag entries within a section to reorder them.
- Use the export button in the header to open your browser's print dialog and save as PDF.

> **Note:** Nothing is persisted yet — refreshing the page resets your data to the sample resume. Local storage support is planned.

## Project Structure

```
src/
├── components/
│   ├── form/          # One component per resume section (Education, Experience, Projects, Skills)
│   ├── ui/             # shadcn/ui primitives + shared UI (collapsible sections, item lists)
│   ├── Form.jsx         # Container that renders all section forms
│   ├── Header.jsx       # Top bar (export/print action)
│   └── Resume.jsx       # The live preview, styled to page dimensions for print
├── context/
│   └── ResumeContext.jsx  # Single source of truth for saved resume data
├── reducers/
│   └── educationReducer.js  # Shared add/update/remove/reorder reducer, reused across sections
├── routers/
│   ├── App.jsx           # Builder layout (forms + preview)
│   └── Home.jsx          # Landing page
└── router.jsx            # createBrowserRouter route definitions
```

## Contributing

Contributions are welcome — feel free to open an issue or a pull request.

## License

MIT — see [LICENSE](./LICENSE) for details.
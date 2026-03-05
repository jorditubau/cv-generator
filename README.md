# CVCraft — Interactive CV/Resume Generator

A fully **client-side** CV/Resume generator — no backend, no API keys, no database required.

## Features

### Form Sections
- **Personal Info** — Name, job title, contact details, social links, profile photo upload
- **Professional Summary** — Textarea with live 300-character counter
- **Work Experience** — Dynamic entries with drag-to-reorder (dnd-kit)
- **Education** — Add/remove education entries
- **Skills** — Tag-style pill input across Technical, Soft Skills, and Languages categories
- **Projects** — Showcase work with tech stack and links
- **Certifications** — Name, issuer, year

### 3 CV Templates
| Template | Style |
|----------|-------|
| **Classic** | Clean, serif fonts, traditional left-aligned layout, printer-friendly |
| **Modern** | Two-column with customizable accent color sidebar |
| **Minimal** | Single column, large bold name, startup-style with accent color |

### UX Features
- **Real-time preview** — CV updates on every keystroke
- **PDF Export** — A4-size, print-quality PDF via jsPDF + html2canvas
- **Shareable Link** — Entire CV encoded as base64 in URL hash (no backend!)
- **Auto-save** — localStorage persistence every 2 seconds
- **Undo/Redo** — Full history with Ctrl+Z / Ctrl+Y
- **Dark/Light mode** — App UI toggle (preview stays white for print)
- **Load Example** — Pre-fills all fields with realistic sample data
- **Progress indicator** — "X% complete" bar based on filled sections
- **Color picker** — 10 presets + custom color for Modern/Minimal templates

## Tech Stack
- **React 18** + **Vite 4** + **TypeScript**
- **Tailwind CSS 3** — utility-first styling
- **Zustand** — global state management
- **@dnd-kit** — drag-and-drop reordering
- **jsPDF + html2canvas** — PDF generation
- **react-hook-form** — form management (integrated via zustand)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```
/src
  /components
    /form         # PersonalInfo, Experience, Education, Skills, Projects, Certifications
    /preview      # CVPreview, Template1 (Classic), Template2 (Modern), Template3 (Minimal)
    /ui           # TagInput, DraggableList, ImageUpload, ColorPicker
  /store          # cvStore.ts (zustand)
  /hooks          # useAutoSave.ts, usePDFExport.ts
  /utils          # urlEncoder.ts, pdfExport.ts, sampleData.ts
  /types          # cv.types.ts
```

## Screenshots

_Add screenshots here after running the app_

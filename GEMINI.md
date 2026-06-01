# Gemini Project Context: Compiler Pipeline Portfolio

This project is a personal portfolio for **Bratik Mukherjee (Bimbok)**, themed around the stages of a compiler pipeline. It uses a terminal-inspired CRT aesthetic with a Gruvbox color scheme.

## Project Overview

The portfolio is structured as a sequence of "compiler phases" that the user scrolls through:
1. **Source Intro**: Introduction and profile overview.
2. **Lexer Hero**: Lexical analysis phase, splitting code into tokens (GSAP animations).
3. **Parser AST**: Abstract Syntax Tree representation of projects.
4. **Compiler Middle End**: Information about the developer's journey.
5. **Optimizer Skills**: Skills and proficiencies.
6. **Code Generation**: Final output/build stage.
7. **Execution**: Detailed project views.

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Styling**: 
  - Tailwind CSS 4 (using `@theme` inline configuration)
  - Gruvbox color palette (defined in `globals.css`)
  - Framer Motion for UI transitions
  - GSAP (GreenSock) for complex, scroll-triggered animations
- **Icons**: Lucide React, Phosphor Icons
- **UI Components**: Radix UI, custom Aceternity-style components (3D cards, tracing beams, etc.)
- **Fonts**: Geist Sans, Geist Mono, JetBrains Mono

## Project Structure

- `src/app/`: Next.js App Router entry points and global styles.
- `src/components/`: Modular components representing different compiler stages.
- `src/components/ui/`: Reusable, atomic UI primitives (e.g., `terminal.tsx`, `pixelated-canvas.tsx`).
- `src/lib/`: Shared utility functions (e.g., `cn` helper).
- `public/`: Static assets, including CRT sound effects and images.

## Key Commands

- `npm run dev`: Starts the development server.
- `npm run build`: Generates the production build.
- `npm run start`: Runs the production server.
- `npm run lint`: Executes ESLint checks.

## Development Conventions

- **Animation Strategy**: 
  - Use **GSAP** for heavy, scroll-bound animations (e.g., `ScrollTrigger`).
  - Use **Framer Motion** for state-based transitions and simpler entry animations.
- **Theming**:
  - Adhere to the **Gruvbox** color scheme (`bg-gruv-bg`, `text-gruv-fg`, `text-gruv-red`, etc.).
  - Always use the `font-mono` (JetBrains Mono) for a technical/terminal feel.
- **CRT Effect**:
  - The project includes a CRT scanline overlay and a slight flicker effect for authenticity.
- **Components**:
  - Prefer functional components with TypeScript interfaces for props.
  - Use `"use client"` for components requiring interactivity or browser-only APIs (like GSAP).

## Instructional Context for Gemini

- **Surgical Edits**: When modifying components, ensure the GSAP timelines are preserved or carefully adjusted to avoid breaking scroll behavior.
- **Tailwind 4**: Note that this project uses Tailwind CSS 4. Styling is primarily done via the `@theme` block in `globals.css` and utility classes in components.
- **Types**: Maintain strict TypeScript typing, especially for component props and animation refs.

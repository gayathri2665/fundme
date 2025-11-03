# GEMINI.md

## Project Overview

This project is a crowdfunding platform called "FundMeUp". It allows entrepreneurs to create funding campaigns and investors to back them. The platform is built using the following technologies:

*   **Frontend:** React, Vite, TypeScript, Tailwind CSS
*   **Backend:** Supabase (Authentication, Database)
*   **Routing:** React Router
*   **Icons:** Lucide React

The database schema includes tables for user profiles, campaigns, campaign updates, backers, and messages. Row Level Security (RLS) is enabled on all tables to ensure data privacy and security.

## Building and Running

To build and run the project, use the following commands:

*   **Install dependencies:**
    ```bash
    npm install
    ```
*   **Run the development server:**
    ```bash
    npm run dev
    ```
*   **Build for production:**
    ```bash
    npm run build
    ```
*   **Lint the code:**
    ```bash
    npm run lint
    ```
*   **Preview the production build:**
    ```bash
    npm run preview
    ```
*   **Type-check the code:**
    ```bash
    npm run typecheck
    ```

## Development Conventions

*   **Coding Style:** The project uses ESLint to enforce a consistent coding style.
*   **Testing:** There are no explicit testing practices defined in the project.
*   **Contribution:** There are no contribution guidelines defined in the project.

## Recent Updates

### Mock Authentication
*   Implemented mock authentication to bypass the sign-in process, allowing users to access the app with any email and password.
*   The "Create Account" and "Sign In" buttons now navigate to the dashboard without requiring authentication.

### Feature Box Modals
*   Added modals to the feature boxes on the landing page ("Fast & Easy", "Global Network", "Real Growth", "Secure").
*   When a feature is clicked, a modal appears with a brief description of the feature.

### Sign-Up Form
*   Added a "Freelancer" role to the sign-up form, in addition to the existing "Entrepreneur" and "Investor" roles.

### Bug Fixes and Code Cleanup
*   Fixed all broken buttons and navigation links throughout the app.
*   Resolved all linting errors and warnings, ensuring a clean and consistent codebase.
*   Updated the routing to remove authentication-based redirects, making all pages accessible without signing in.

### New Investors Page
*   Created a new "Investors" page at the `/investors` route, designed to attract and inform potential investors.
*   The page is fully responsive and consistent with the existing design language of the application.
*   **Page Sections:**
    *   **Header:** A large, welcoming header with a clear value proposition.
    *   **Key Highlights:** A grid layout showcasing the platform's key benefits for investors.
    *   **Pitch Demo:** An interactive section allowing users to view and get summaries of sample pitches.
    *   **CTA:** Clear calls-to-action to guide users to the next steps.
    *   **Trust Section:** A section building credibility with logos of partners and key metrics.
*   No existing pages, routes, or logic were modified or broken during the implementation.
*   Performance and design consistency were maintained.

---
**Changelog:**
- Added `Investors.tsx` page with complete layout and functionality.
- Updated `App.tsx` to include the new `/investors` route.
- Added a navigation link to the Investors page in `Landing.tsx`.

### New Investors Page (JavaScript)
*   Created a new `Investors.jsx` page to provide a fast, responsive, and theme-consistent experience for potential investors.
*   The page includes a Header, Key Highlights, an interactive Pitch Demo, CTA buttons, and a Trust Section.
*   Implemented using functional components and hooks for minimal, efficient React code.
*   Added a route for `/investors` in `App.tsx` without modifying existing navigation links, per instructions.
*   The implementation was restricted to the `src/` directory and `GEMINI.md`.

---
**Changelog (Investors.jsx):**
- Created `src/pages/Investors.jsx`.
- Updated `App.tsx` to route `/investors` to the new `.jsx` component.
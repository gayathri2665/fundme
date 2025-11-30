# GEMINI.md

## Project Overview

This project is a crowdfunding platform called "FundMeUp". It allows entrepreneurs to create funding campaigns and investors to back them. The platform is built using the following technologies:

*   **Frontend:** React, Vite, TypeScript, Tailwind CSS
*   **Backend:** Express.js (initially Supabase)
*   **Routing:** React Router
*   **Icons:** Lucide React

The database schema includes tables for user profiles, campaigns, campaign updates, backers, and messages. Row Level Security (RLS) is enabled on all tables to ensure data privacy and security.

## Project Status

### Local Authentication

The project has been updated to use a local authentication system instead of Supabase. A local server (`server.mjs`) has been created to handle sign-up and sign-in functionality. User data is stored in a local `users.json` file.

**Note:** This is a temporary solution for development and is not suitable for production.

### Mocked Campaign Data

The campaign data is currently being mocked in `src/lib/api.ts`. The `fetchCampaigns` and `fetchCampaignById` functions return static data, and the images are placeholders from the `public/assets` directory.

### Python Backend

The AI assistant is powered by a Python backend that uses the Gemini API. The backend is located in the `python-backend` directory.
To run the Python backend, you need to set the `GOOGLE_API_KEY` environment variable.

### Anomalies and Inconsistencies

*   **Incomplete Investor Onboarding:** The "Investor" role has a multi-step onboarding process that is not fully implemented. The `InvestorStep.tsx` component and the `handleInvestorStepComplete` function in `Auth.tsx` are incomplete.
*   **Inconsistent File Extensions:** The `src/pages` directory contains a mix of `.tsx` and `.jsx` files. The project should be standardized to use `.tsx` for all React components.
*   **`useAuth` Hook:** The `useAuth` hook in `src/hooks/useAuth.ts` is a simple context wrapper. All authentication logic is contained within `src/context/AuthContext.tsx`, which could be confusing.

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

---
**Changelog:**
- Switched to a local authentication system using `server.mjs` and `users.json`.
- Mocked campaign data in `src/lib/api.ts` to use local placeholder images.
- Fixed a bug in the `Auth.tsx` component that was causing the page to crash.
- Resolved all linting errors.
- Added `Investors.tsx` page with complete layout and functionality.
- Updated `App.tsx` to include the new `/investors` route.
- Added a navigation link to the Investors page in `Landing.tsx`.

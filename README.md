# FundMeUp

FundMeUp is a crowdfunding platform that connects entrepreneurs with investors and mentors. It focuses on showcasing founder potential, refining pitches with AI, and fostering transparent connections between talent and capital.

## Technologies Used

*   **Frontend:** React, Vite, TypeScript, Tailwind CSS
*   **Backend:** Express.js (for local authentication), Python Flask (for AI assistant)
*   **Routing:** React Router
*   **Icons:** Lucide React
*   **AI:** Google Gemini API

## Project Status & Key Features

*   **Local Authentication:** User authentication is handled locally using `server.mjs` and `users.json`. This is a temporary solution for development.
*   **Mocked Campaign Data:** Campaign data is currently mocked in `src/lib/api.ts` using local placeholder images.
*   **AI Assistant (Chatbot):** Powered by a Python Flask backend using the Google Gemini API (`gemini-2.0-flash-lite`).
*   **Freelancer Profile Form:** Allows freelancers to submit their profiles, including skills, years of experience, and an optional co-build link. Data is stored in `freelancers.json`.

## Getting Started

Follow these steps to set up and run the project locally.

### 1. Prerequisites

*   Node.js (LTS version recommended)
*   Python 3.8+
*   `npm` or `yarn`

### 2. Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd FundMeUp
    ```
2.  **Install Node.js dependencies:**
    ```bash
    npm install
    ```
3.  **Setup Python virtual environment and dependencies:**
    ```bash
    cd python-backend
    python -m venv venv
    # On Windows:
    .\venv\Scripts\activate
    # On macOS/Linux:
    source venv/bin/activate
    pip install -r requirements.txt # (Assuming requirements.txt exists or you'll install flask, google-generativeai, flask-cors manually)
    deactivate # Exit virtual environment
    cd ..
    ```
    *Note: If `requirements.txt` is missing, you'll need to install `Flask`, `google-generativeai`, and `Flask-CORS` manually within the virtual environment.*

### 3. Google Gemini API Key

The AI assistant requires a `GOOGLE_API_KEY`. You need to obtain this from the [Google AI Studio](https://aistudio.google.com/).

Create a `.env` file in the `python-backend` directory and add your API key:

```
GOOGLE_API_KEY=YOUR_ACTUAL_GOOGLE_API_KEY
```

### 4. Running the Development Server

To run the frontend, local authentication backend, and Python AI backend concurrently:

```bash
npm run dev
```

This command will:
*   Start the local authentication server (`server.mjs`) on `http://localhost:3001`.
*   Start the Python AI backend on `http://localhost:5000`.
*   Start the React development server (usually on `http://localhost:5173`).

### Available Scripts

*   `npm run dev`: Starts all development servers (frontend, local Express backend, Python backend).
*   `npm run start:backend`: Starts only the local Express authentication server.
*   `npm run start:python`: Starts only the Python AI backend.
*   `npm run build`: Builds the React app for production.
*   `npm run lint`: Lints the project code.
*   `npm run preview`: Serves the production build locally.
*   `npm run typecheck`: Runs TypeScript type checking.

## Development Conventions

*   **Coding Style:** ESLint is used to enforce consistent coding style.
*   **Testing:** No explicit testing practices are currently defined.
*   **Contribution:** No formal contribution guidelines are defined.

## Anomalies and Inconsistencies

*   **Incomplete Investor Onboarding:** The "Investor" role has a multi-step onboarding process that is not fully implemented.
*   **Inconsistent File Extensions:** The `src/pages` directory contains a mix of `.tsx` and `.jsx` files; standardization to `.tsx` is recommended.
*   **`useAuth` Hook Structure:** The `useAuth` hook is a simple context wrapper, with authentication logic primarily in `src/context/AuthContext.tsx`.

## Local Data Files

*   `users.json`: Stores local user authentication data.
*   `freelancers.json`: Stores submitted freelancer profile data.

These files are automatically created if they don't exist and are managed by the local Express backend. They are included in `.gitignore` to prevent committing sensitive local data.

# 📞 Cooee Signup Flow

A multi-step signup flow built with **Next.js 13 (App Router)** and
**React** for Cooee, guiding users through selecting a number, choosing
a plan, registering, making a payment, and confirming their
subscription.

------------------------------------------------------------------------

## 🚀 Live Demo

👉 [Visit the live site on Vercel](https://callcooee-signup.vercel.app/)

------------------------------------------------------------------------

## 📂 Project Structure

    callcooee/
    ├── .idea/                  # IDE config files
    ├── .next/                  # Next.js build output (generated)
    ├── node_modules/           # Installed dependencies
    ├── public/                 # Static assets (favicon, etc.)
    ├── src/
    │   └── app/
    │       ├── favicon.ico
    │       ├── globals.css     # Global styles
    │       ├── layout.js       # App layout wrapper
    │       ├── page.js         # Entry page
    │       └── components/
    │           └── cooee-signup.js   # Multi-step signup flow component
    ├── .gitignore
    ├── eslint.config.mjs
    ├── jsconfig.json
    ├── next.config.mjs
    ├── package.json
    ├── package-lock.json
    ├── postcss.config.mjs
    └── README.md

------------------------------------------------------------------------

## ⚙️ Setup Instructions

1.  **Clone the repository**

    ``` bash
    git clone https://github.com/KavyaRajeevs/callcooee-signup.git
    cd callcooee-signup
    ```

2.  **Install dependencies**

    ``` bash
    npm install
    ```

3.  **Run the development server**

    ``` bash
    npm run dev
    ```

    Visit <http://localhost:3000> in your browser.

4.  **Build for production**

    ``` bash
    npm run build
    npm start
    ```

------------------------------------------------------------------------

## 🏗 Architecture Overview

-   **Next.js App Router**: Used for routing and server-side rendering.
-   **Components**: The signup flow is implemented as a single component
    (`cooee-signup.js`) that manages different steps:
    -   Step 1: Country & Number Selection
    -   Step 2: Plan Selection
    -   Step 3: User Registration
    -   Step 4: Payment Form
    -   Step 5: Confirmation
-   **State Management**: React `useState` hooks are used for managing
    user input and navigation between steps.
-   **Styling**: TailwindCSS.
-   **Mock Data**: Countries, phone numbers, and plans are simulated
    with mock JSON data inside the component.

------------------------------------------------------------------------

## 📌 Assumptions

-   Signup flow is **frontend-only** (no backend API integration yet).
-   Payment and authentication steps are **simulated** using mock data
    and placeholder logic.
-   Implemented basic user registration logic.

------------------------------------------------------------------------

## 📝 License

This project is licensed under the MIT License.

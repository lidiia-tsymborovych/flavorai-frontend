# FlavorAI Frontend

This is the **frontend** part of the FlavorAI project — a platform to discover, manage, and share personal recipes. Built with modern React, TypeScript, Tailwind CSS, and Next.js.

## 🚀 Features

- User authentication (login/register)
- View all recipes
- Manage your personal recipes
- Rate recipes with interactive star rating
- Responsive UI with Tailwind CSS
- Dark/light theme support
- Form validation with Zod + React Hook Form

## 🛠 Tech Stack

- **Frontend:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Form Validation:** React Hook Form + Zod
- **Routing:** Next.js Router
- **Icons:** Lucide React

## 📂 Project Structure

/app
/components # reusable components (AuthForm, RecipeCard, Rating, etc.)
/pages # page components (Home, Login, Register, Recipes, MyRecipes)
/lib # auth, API calls, store (Zustand)
/types # TypeScript types

## ⚡ Getting Started

1. Clone the repository:

```
git clone git@github.com:your-username/flavorai-frontend.git
cd flavorai-frontend
```
2. Install dependencies:
`npm install`

3. Run the development server:
`npm run dev`

4. Open http://localhost:3000 in your browser.

✅ Usage
Create an account or log in

Add your own recipes

Browse all recipes and rate them

Enjoy smooth and responsive UI!

🔗 Links
Backend repository https://github.com/lidiia-tsymborovych/flavorai-backend

💡 Notes
The frontend expects the backend API to be running at a configured endpoint.

Authentication tokens are handled via cookies.
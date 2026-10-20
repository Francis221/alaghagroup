# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Project Structure

```text
src/
├── main.jsx
├── App.jsx
├── routes.jsx
├── constants/
│   ├── index.js        <- Single consolidated import registry
│   ├── images.js       <- Categorized image imports & project map
│   └── data.js         <- Company info, contact, and data arrays
├── assets/
│   ├── images/
│   │   ├── logo/
│   │   ├── certificates/
│   │   ├── clients/
│   │   ├── consultants/
│   │   ├── contractors/
│   │   ├── projects/
│   │   └── general/
│   └── _unused/        <- Preserved legacy/duplicate assets
├── components/         <- Shared reusable components (Icons, etc.)
├── pages/
│   ├── Home/           <- Entry point for Home nav item & sections
│   ├── Services/       <- Main frame for Services nav item
│   ├── Projects/       <- Main frame for Projects nav item
│   ├── About/          <- Main frame for About nav item
│   ├── Clients/        <- Main frame for Clients nav item
│   ├── Career/         <- Main frame for Career nav item
│   └── Team/           <- Main frame for Team nav item
└── styles/
    ├── index.css       <- Global styles & keyframes
    └── App.css
```


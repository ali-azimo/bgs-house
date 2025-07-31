# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# Google Analytics no site React (Vite) na Vercel

## Setup
1. Criar propriedade GA4 e obter Measurement ID (ex: G-...)
2. No Vercel, adicionar variável de ambiente:
   - `VITE_GA_MEASUREMENT_ID=G-...`
3. Garantir que o `src/ga.js` existe e que `App.jsx` usa `initGA` + `logPageView`.

## Comportamento
- `initGA` injeta o `gtag.js` e configura sem enviar automaticamente a pageview.
- `logPageView` dispara um evento de pageview em cada navegação (SPA).

## Testar
- Ir ao painel GA4 > Realtime e navegar no site para ver pageviews.
- Usar `console.log(import.meta.env.VITE_GA_MEASUREMENT_ID)` para validar a variável.

## Boas práticas
- Só inicializar depois de consentimento, se necessário.
- Filtrar tráfego interno com user properties ou IP, conforme necessidades.
// Tailwind CSS v4 passe par un plugin PostCSS : plus besoin de tailwind.config.js,
// la configuration (couleurs, polices…) se fait directement en CSS via @theme
// (voir src/app/globals.css).
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;

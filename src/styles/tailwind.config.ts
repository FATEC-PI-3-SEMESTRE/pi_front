import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}", // Inclui todos os arquivos TypeScript
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'], // Defina a fonte padrão
      },
    },
  },
  plugins: [],
}

export default config

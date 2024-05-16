/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        fondoPantallaModal: 'var(--colorFondoPantallaModal)',
        fondoModal: 'var(--colorFondoModal)',
        tituloModal: 'var(--colorTituloModal)',
        blanco: 'var(--colorBlanco)',
        negro: 'var(--colorNegro)',
        textoTarjeta: 'var(--colorTextoTarjeta)',
        fondoTablaModal: 'var(--colorFondoTablaModal)',
        tarjetaModal: 'var(--colorTarjetaModal)',
      },
    },
  },
  plugins: [],
}

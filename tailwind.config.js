module.exports = {
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
      gridTemplateColumns: {
        'custom': 'repeat(3, minmax(0, 1fr))',
        'custom2': 'repeat(2, minmax(0, 1fr))',
        '2fr': 'repeat(2, 1fr)',
      },
       spacing: {
      // Define tu clase personalizada dentro de la directiva @layer
      '1rem': '1rem', // Define el valor del espacio que deseas, puede ser 1rem o cualquier otro valor deseado
    },
      
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('layer', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.layer${separator}${className}`;
        });
      });
    },
  ],
};

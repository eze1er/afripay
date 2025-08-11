module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'afri-primary': '#00A1E0',   // Bleu Flutterwave
        'afri-secondary': '#0A2540', // Bleu foncé Wave
        'afri-accent': '#F5A623',    // Jaune Paystack
        'afri-success': '#22A75D',   // Vert succès
        'afri-error': '#E02828',     // Rouge erreur
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
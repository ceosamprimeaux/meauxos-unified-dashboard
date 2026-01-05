/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'meauxos': {
          primary: '#4AECDC',
          secondary: '#8B5CF6',
          accent: '#F59E0B',
        },
        'inneranimal': {
          primary: '#F59E0B',
          secondary: '#10B981',
          accent: '#EC4899',
        },
        'meauxbility': {
          primary: '#EC4899',
          secondary: '#8B5CF6',
          accent: '#10B981',
        },
      },
      backgroundImage: {
        'gradient-meauxos': 'linear-gradient(135deg, #4AECDC 0%, #8B5CF6 100%)',
        'gradient-inneranimal': 'linear-gradient(135deg, #F59E0B 0%, #10B981 100%)',
        'gradient-meauxbility': 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
      },
    },
  },
  plugins: [],
};

// tailwind.config.js

module.exports = {
    content: [
      './src/**/*.{js,jsx,ts,tsx}',  // Ensure Tailwind CSS scans these files
    ],
    darkMode: 'class', // Enable dark mode using the 'class' strategy
    theme: {
      extend: {
        // Your custom Tailwind theme extensions (if needed)
      },
    },
    plugins: [],
  }
  
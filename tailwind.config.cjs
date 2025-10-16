// tailwind.config.cjs
// CommonJS config; using createRequire only where needed for ESM packages.
const { createRequire } = require('module');
const require2          = createRequire(__filename);

// Tailwind core + helpers
const defaultTheme      = require2('tailwindcss/defaultTheme');
const pluginFactory     = require2('tailwindcss/plugin');

// Official plugins
const typography        = require2('@tailwindcss/typography');
const aspectRatio       = require2('@tailwindcss/aspect-ratio');

// Iconify dynamic selectors
const { addDynamicIconSelectors } = require2('@iconify/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layouts/**/*.{html,js}',
    './themes/**/layouts/**/*.{html,js}',
    './shortcodes/**/*.html',
    './content/**/*.{md,html}',
    './assets/js/**/*.{js,ts}',
    './data/**/*.{yaml,yml,json,toml}',
  ],

  safelist: [
    'icon-[mdi--cross]',
    'icon-[material-symbols--family-restroom]',
    'icon-[ic--baseline-history-edu]',
    'icon-[ic--baseline-home]',
    'icon-[ic--baseline-hearing]',
    'icon-[mdi--hands-pray]',
    'icon-[mdi--heart-circle]',
    'icon-[mdi--sparkles]',
    'icon-[mdi--circle-small]',
    'icon-[mdi--campfire]',
    'icon-[mdi--flag]',
    'icon-[mdi--account-cowboy-hat-outline]',
    'icon-[mdi--clock-time-five]',
    'icon-[mdi--information]',
    'icon-[mdi--party-popper]',
    'icon-[mdi--crowd]',
    'icon-[mdi--human-male-male-child]',
    'icon-[mdi--balloon]',
    'icon-[mdi--map-marker-radius-outline]',
    'icon-[mdi--map-outline]',
  ],

  darkMode: 'class',

  theme: {
    fontFamily: {
      sans: ['Lato', ...defaultTheme.fontFamily.sans],
      serif: ['Merriweather', ...defaultTheme.fontFamily.serif],
      mono: [...defaultTheme.fontFamily.mono],
      montserrat: ['Montserrat'],
    },

    extend: {
      // keep Tailwind’s default heights, just add your custom ones
      height: {
        '10v': '10vh', '20v': '20vh', '30v': '30vh', '40v': '40vh',
        '50v': '50vh', '60v': '60vh', '70v': '70vh', '80v': '80vh',
        '90v': '90vh', '100v': '100vh',
        '128': '32rem',
      },

      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: {
          DEFAULT: '#9ad2b7', '50': '#ffffff', '100': '#f8fcf9',
          '200': '#c6e7d6', '300': '#aedbc5', '400': '#76bc9c',
          '500': '#45b586', '600': '#36a176', '700': '#30916e',
          '800': '#318767', '900': '#307e62', '950': '#28715a',
        },
        secondary: {
          DEFAULT: '#ffe3c3', '50': '#ffffff', '100': '#fffdfa',
          '200': '#fff4e5', '300': '#ffdab3', '400': '#febb81',
          '500': '#fda05e', '600': '#f98a4e', '700': '#f46a2f',
          '800': '#e85621', '900': '#d34d1d', '950': '#a4340e',
        },
        neutral: {
          DEFAULT: '#95b8c7', '50': '#ffffff', '100': '#f2f5f8',
          '200': '#dbe6eb', '300': '#a1c0ce', '400': '#8bb1c1',
          '500': '#6898ac', '600': '#51839a', '700': '#457087',
          '800': '#416576', '900': '#405d6d', '950': '#334957',
        },
        elm: {
          DEFAULT: '#6B7280', '50': '#ffffff', '100': '#fcfdfd',
          '200': '#dee9ed', '300': '#afc9d4', '400': '#80a7b7',
          '500': '#5488a0', '600': '#476f85', '700': '#3f5c6e',
          '800': '#394d5b', '900': '#32424d',
        },
      },

      lineHeight: { 'extra-loose': '2.5', '12': '3rem' },

      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out both',
      },

      // If you want to tweak @tailwindcss/typography defaults, uncomment and adapt:
      // typography: ({ theme }) => ({
      //   DEFAULT: {
      //     css: {
      //       '--tw-prose-body': theme('colors.gray.800'),
      //       '--tw-prose-headings': theme('colors.gray.900'),
      //     },
      //   },
      // }),
    },
  },

  plugins: [
    aspectRatio,               // enables `aspect-*` utilities
    addDynamicIconSelectors({  // Iconify dynamic selectors
      prefix: 'icon',
      collections: ['mdi', 'ic', 'material-symbols'],
    }),
    typography,

    // Custom plugin: register Material Symbols font + helper class
    pluginFactory(({ addBase, addComponents }) => {
      addBase({
        '@font-face': {
          fontFamily: '"Material Symbols Outlined"',
          fontStyle: 'normal',
          fontWeight: '100 700',
          fontDisplay: 'block',
          src: "url('/fonts/material-symbols-outlined.woff2') format('woff2')",
        },
      });
      addComponents({
        '.material-symbols-outlined': {
          fontFamily: '"Material Symbols Outlined"',
          fontWeight: 'normal',
          fontStyle: 'normal',
          fontSize: '24px',
          lineHeight: '1',
          letterSpacing: 'normal',
          textTransform: 'none',
          display: 'inline-block',
          whiteSpace: 'nowrap',
          wordWrap: 'normal',
          direction: 'ltr',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'optimizeLegibility',
          fontFeatureSettings: '"liga"',
        },
      });
    }),
  ],
};

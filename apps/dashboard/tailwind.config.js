/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require("tailwindcss/defaultTheme");

function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }

    return `rgb(var(${variable}) / ${opacityValue})`;
  };
}

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "../../packages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Inter", ...fontFamily.sans],
      },
      colors: {
        primary: {
          // Customize it on globals.css :root
          50: withOpacityValue("--tw-color-primary-50"),
          100: withOpacityValue("--tw-color-primary-100"),
          200: withOpacityValue("--tw-color-primary-200"),
          300: withOpacityValue("--tw-color-primary-300"),
          400: withOpacityValue("--tw-color-primary-400"),
          500: withOpacityValue("--tw-color-primary-500"),
          600: withOpacityValue("--tw-color-primary-600"),
          700: withOpacityValue("--tw-color-primary-700"),
          800: withOpacityValue("--tw-color-primary-800"),
          900: withOpacityValue("--tw-color-primary-900"),
        },
        danger: {
          50: withOpacityValue("--tw-color-danger-50"),
          100: withOpacityValue("--tw-color-danger-100"),
          200: withOpacityValue("--tw-color-danger-200"),
          300: withOpacityValue("--tw-color-danger-300"),
          400: withOpacityValue("--tw-color-danger-400"),
          500: withOpacityValue("--tw-color-danger-500"),
          600: withOpacityValue("--tw-color-danger-600"),
          700: withOpacityValue("--tw-color-danger-700"),
          800: withOpacityValue("--tw-color-danger-800"),
          900: withOpacityValue("--tw-color-danger-900"),
        },
        warning: {
          50: withOpacityValue("--tw-color-warning-50"),
          100: withOpacityValue("--tw-color-warning-100"),
          200: withOpacityValue("--tw-color-warning-200"),
          300: withOpacityValue("--tw-color-warning-300"),
          400: withOpacityValue("--tw-color-warning-400"),
          500: withOpacityValue("--tw-color-warning-500"),
          600: withOpacityValue("--tw-color-warning-600"),
          700: withOpacityValue("--tw-color-warning-700"),
          800: withOpacityValue("--tw-color-warning-800"),
          900: withOpacityValue("--tw-color-warning-900"),
        },
        success: {
          50: withOpacityValue("--tw-color-success-50"),
          100: withOpacityValue("--tw-color-success-100"),
          200: withOpacityValue("--tw-color-success-200"),
          300: withOpacityValue("--tw-color-success-300"),
          400: withOpacityValue("--tw-color-success-400"),
          500: withOpacityValue("--tw-color-success-500"),
          600: withOpacityValue("--tw-color-success-600"),
          700: withOpacityValue("--tw-color-success-700"),
          800: withOpacityValue("--tw-color-success-800"),
          900: withOpacityValue("--tw-color-success-900"),
        },
        info: {
          50: withOpacityValue("--tw-color-info-50"),
          100: withOpacityValue("--tw-color-info-100"),
          200: withOpacityValue("--tw-color-info-200"),
          300: withOpacityValue("--tw-color-info-300"),
          400: withOpacityValue("--tw-color-info-400"),
          500: withOpacityValue("--tw-color-info-500"),
          600: withOpacityValue("--tw-color-info-600"),
          700: withOpacityValue("--tw-color-info-700"),
          800: withOpacityValue("--tw-color-info-800"),
          900: withOpacityValue("--tw-color-info-900"),
        },
        gray: {
          50: withOpacityValue("--tw-color-gray-50"),
          100: withOpacityValue("--tw-color-gray-100"),
          200: withOpacityValue("--tw-color-gray-200"),
          300: withOpacityValue("--tw-color-gray-300"),
          400: withOpacityValue("--tw-color-gray-400"),
          500: withOpacityValue("--tw-color-gray-500"),
          600: withOpacityValue("--tw-color-gray-600"),
          700: withOpacityValue("--tw-color-gray-700"),
          800: withOpacityValue("--tw-color-gray-800"),
          900: withOpacityValue("--tw-color-gray-900"),
        },
        dark: "#222222",
      },
      keyframes: {
        flicker: {
          "0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%": {
            opacity: 0.99,
            filter:
              "drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))",
          },
          "20%, 21.999%, 63%, 63.999%, 65%, 69.999%": {
            opacity: 0.4,
            filter: "none",
          },
        },
      },
      animation: {
        flicker: "flicker 3s linear infinite",
      },
    },
  },
};

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

      boxShadow: {
        slider: "0 0 0 5px rgba(0, 0, 0, 0.3)",
      },
      keyframes: {
        // Dropdown menu
        "scale-in": {
          "0%": { opacity: 0, transform: "scale(0)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        "slide-down": {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        // Tooltip
        "slide-up-fade": {
          "0%": { opacity: 0, transform: "translateY(2px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-right-fade": {
          "0%": { opacity: 0, transform: "translateX(-2px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        "slide-down-fade": {
          "0%": { opacity: 0, transform: "translateY(-2px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-left-fade": {
          "0%": { opacity: 0, transform: "translateX(2px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        // Navigation menu
        "enter-from-right": {
          "0%": { transform: "translateX(200px)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        "enter-from-left": {
          "0%": { transform: "translateX(-200px)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        "exit-to-right": {
          "0%": { transform: "translateX(0)", opacity: 1 },
          "100%": { transform: "translateX(200px)", opacity: 0 },
        },
        "exit-to-left": {
          "0%": { transform: "translateX(0)", opacity: 1 },
          "100%": { transform: "translateX(-200px)", opacity: 0 },
        },
        "scale-in-content": {
          "0%": { transform: "rotateX(-30deg) scale(0.9)", opacity: 0 },
          "100%": { transform: "rotateX(0deg) scale(1)", opacity: 1 },
        },
        "scale-out-content": {
          "0%": { transform: "rotateX(0deg) scale(1)", opacity: 1 },
          "100%": { transform: "rotateX(-10deg) scale(0.95)", opacity: 0 },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "fade-out": {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        // Toast
        "toast-hide": {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        "toast-slide-in-right": {
          "0%": { transform: `translateX(calc(100% + 1rem))` },
          "100%": { transform: "translateX(0)" },
        },
        "toast-slide-in-bottom": {
          "0%": { transform: `translateY(calc(100% + 1rem))` },
          "100%": { transform: "translateY(0)" },
        },
        "toast-swipe-out": {
          "0%": { transform: "translateX(var(--radix-toast-swipe-end-x))" },
          "100%": {
            transform: `translateX(calc(100% + 1rem))`,
          },
        },
      },
      animation: {
        // Dropdown menu
        "scale-in": "scale-in 0.2s ease-in-out",
        "slide-down": "slide-down 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-up": "slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        // Tooltip
        "slide-up-fade": "slide-up-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-right-fade":
          "slide-right-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-down-fade": "slide-down-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-left-fade": "slide-left-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        // Navigation menu
        "enter-from-right": "enter-from-right 0.25s ease",
        "enter-from-left": "enter-from-left 0.25s ease",
        "exit-to-right": "exit-to-right 0.25s ease",
        "exit-to-left": "exit-to-left 0.25s ease",
        "scale-in-content": "scale-in-content 0.2s ease",
        "scale-out-content": "scale-out-content 0.2s ease",
        "fade-in": "fade-in 0.2s ease",
        "fade-out": "fade-out 0.2s ease",
        // Toast
        "toast-hide": "toast-hide 100ms ease-in forwards",
        "toast-slide-in-right":
          "toast-slide-in-right 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "toast-slide-in-bottom":
          "toast-slide-in-bottom 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "toast-swipe-out": "toast-swipe-out 100ms ease-out forwards",
      },
    },
  },
  plugins: [
    // Initialize with default values (see options below)
    require("tailwindcss-radix")(),
    require("@tailwindcss/container-queries"),
  ],
};

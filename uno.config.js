import { defineConfig, presetUno, presetAttributify, presetWebFonts } from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetWebFonts({
      provider: "google",
      fonts: {
        sans: "Fira Sans:300,400,500,600,700",
        mono: "Fira Code:400,500,600",
      },
    }),
  ],

  shortcuts: {
    "flex-center": "flex justify-center items-center",
    "flex-between": "flex justify-between items-center",
    "flex-col-center": "flex flex-col justify-center items-center",
    "btn": "px-4 py-2 rounded cursor-pointer transition-all duration-200",
    "btn-primary": "btn bg-primary text-white hover:bg-secondary",
    "btn-default": "btn bg-gray-100 text-gray-700 hover:bg-gray-200",
  },

  theme: {
    colors: {
      primary: "#6366f1",
      secondary: "#4f46e5",
      accent: "#10b981",
      danger: "#ef4444",
      warning: "#f59e0b",
      info: "#3b82f6",
    },
  },

  include: ["**/*.vue", "**/*.ts", "**/*.js"],
});

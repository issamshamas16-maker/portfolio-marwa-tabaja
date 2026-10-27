import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Netlify serves the site from the domain root; GitHub Pages serves it from a subpath.
  base: process.env.NETLIFY ? "/" : "/marwa-tabaja-portfolio/",
});

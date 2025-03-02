import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Ensures the server binds to all network interfaces
    port: process.env.PORT || 5173, // Use Render’s port or default
    allowedHosts: ["smart-home-bov6.onrender.com"],
  },
  preview: {
    port: 3000,
  },
});

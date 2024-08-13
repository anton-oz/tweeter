import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const PORT = process.env.PORT || 3002;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: "window",
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/graphql": {
        target: `http://localhost:${PORT}`,
        secure: false,
        changeOrigin: true,
      },
    },
  },
});

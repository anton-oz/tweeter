import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const PORT = process.env.PORT || 3002;
let define;
// https://vitejs.dev/config/
if (process.env.NODE_ENV && process.env.NODE_ENV === "production") {
  define = {};
  } else {
    define = {
      global: "window",
    };
  }

  export default defineConfig({
  plugins: [react()],
  //One for prod one local
  define,
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


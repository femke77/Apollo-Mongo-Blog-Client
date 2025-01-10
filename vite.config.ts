import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    host: true, // opens to network on your internet for other devices to access
    proxy: {
      // stops CORS errors as well as allows fetches to have relative paths
      "/graphql": {
        target: "https://apollo-mongo-blog-server.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

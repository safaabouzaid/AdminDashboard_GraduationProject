import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      external: ['@mui/material', '@mui/system'],
    }
  },
  optimizeDeps: {
    include: ['@mui/material', '@mui/system', '@mui/icons-material'],
  },  

  chunkSizeWarningLimit: 1000 ,
  
  commonjsOptions: {
    include: [/node_modules/]
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});

import { defineConfig  } from "vite";

export default defineConfig((command) => {

  const returned = {
    server: {
      host: true,
    },
    build: {
      target: 'esnext',
      sourcemap: 'inline',
      minify: 'esbuild',
      rollupOptions: {
        output: {
          dir: 'dist',
          format: 'es',
        },
      },
    },
  }
  return returned
});

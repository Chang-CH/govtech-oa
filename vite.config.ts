import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

const commons = {
  resolve: {
    alias: {
      _assets: path.resolve(__dirname, 'src/assets/'),
      _styles: path.resolve(__dirname, 'src/styles/'),
      _components: path.resolve(__dirname, 'src/components/'),
      _markdown: path.resolve(__dirname, 'src/markdown/'),
    },
    extensions: ['.ts', '.tsx', '.js'],
  },
};

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  if (command === 'serve') {
    return {
      plugins: [
        react(),
        tsconfigPaths(),
      ],
      css: {
        modules: {
          // similar to localIdentName of webpack, gives us more info to debug css
          generateScopedName: '[path][name]__[local]--[hash:base64:5]',
          localsConvention: 'camelCaseOnly',
        },
      },
      ...commons,
    };
  }

  return {
    ...commons,
    plugins: [
      react(),
    ],
    build: {
      // reduce build sizes
      minify: 'esbuild',
      rollupOptions: {
        // tree shaking for removal of unused code
        treeshake: 'recommended',
      },
    },
    css: {
      modules: {
        // uglify
        generateScopedName: '[hash:base64:5]',
        localsConvention: 'camelCaseOnly',
      },
    },
  };
});

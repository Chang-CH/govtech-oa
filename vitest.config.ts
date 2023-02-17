/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    alias: {
      _assets: path.resolve(__dirname, './src/assets/'),
      _constants: path.resolve(__dirname, './src/constants/'),
      _styles: path.resolve(__dirname, './src/styles/'),
      _components: path.resolve(__dirname, './src/components/'),
      _pages: path.resolve(__dirname, './src/pages/'),
    },
  },
  resolve: {
    alias: {
      ' _assets/*': path.resolve(__dirname, './src/assets/'),
      '_constants/*': path.resolve(__dirname, './src/constants/'),
      '_styles/*': path.resolve(__dirname, './src/styles/'),
      '_components/*': path.resolve(__dirname, './src/components/'),
      '_pages/*': path.resolve(__dirname, './src/pages/'),
    },
    extensions: ['.ts', '.tsx', '.js'],
  },
});

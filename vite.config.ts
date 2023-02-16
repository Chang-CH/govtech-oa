import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import autoprefixer from 'autoprefixer';
import { visualizer } from 'rollup-plugin-visualizer';

const commons = {
  resolve: {
    alias: {
      _assets: path.resolve(__dirname, 'src/assets/'),
      _constants: path.resolve(__dirname, 'src/constants/'),
      _styles: path.resolve(__dirname, 'src/styles/'),
      _components: path.resolve(__dirname, 'src/components/'),
    },
    extensions: ['.ts', '.tsx', '.js'],
  },
};

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  if (command === 'serve') {
    return {
      plugins: [react(), svgr(), tsconfigPaths()],
      css: {
        postcss: {
          plugins: [
            autoprefixer({}), // add options if needed
          ],
        },
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
    plugins: [react(), svgr(), visualizer()],
    build: {
      minify: 'esbuild',
      rollupOptions: {
        treeshake: 'recommended',
        // output: {
        //   manualChunks: { antd: ['antd'] },
        // },
      },
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer({}), // add options if needed
        ],
      },
      modules: {
        generateScopedName: '[hash:base64:5]',
        localsConvention: 'camelCaseOnly',
      },
    },
  };
});

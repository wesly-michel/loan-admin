/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./jest.setup.ts'],
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}']
  } as import('vitest/config').UserConfig['test']
});

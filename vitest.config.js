import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/unit/**/*.test.js'],
    exclude: ['tests/browser/**', 'tests/integration.test.js']
  }
});

import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:8080",
    browserName: "chromium",
    headless: true,
    reducedMotion: "no-preference",
    viewport: { width: 1097, height: 960 },
    trace: "retain-on-failure",
  },
  webServer: {
    command: "py -3 -m http.server 8080 --bind 127.0.0.1",
    url: "http://127.0.0.1:8080",
    reuseExistingServer: !process.env.CI,
    timeout: 10_000,
  },
});

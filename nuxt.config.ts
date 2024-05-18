// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ["@nuxt/ui-pro"],
  modules: [
    "@nuxt/content",
    "@nuxt/ui",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "nuxt-icon",
    "nuxt-socket-io",
  ],
  ui: {
    icons: {},
    safelistColors: ["primary", "red", "orange", "green"],
  },
  i18n: {
    langDir: "locales/",
    detectBrowserLanguage: false,
    strategy: "prefix_except_default",
    defaultLocale: "en",
    vueI18n: "./i18n.config.ts",
    locales: [
      {
        code: "zh",
        name: "简体中文",
        file: "zh",
      },
      {
        code: "en",
        name: "English",
        file: "en",
      },
    ],
  },
});

/*
 * Every line of code is my tear
 * Every tear is you
 */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ["@nuxt/ui-pro"],
  app: {
    header: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/swulogo.png' }]
    },
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  modules: [
    "@nuxt/content",
    "@nuxt/ui",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "nuxt-icon",
    "nuxt-socket-io",
    "@nuxtjs/sitemap",
    "@nuxtjs/seo",
    "@formkit/auto-animate/nuxt",
  ],
  sourcemap: false,
  site: {
    url: "https://szxd.swu.lol",
  },
  ui: {
    icons: {},
    safelistColors: ["primary", "red", "orange", "green"],
  },
  i18n: {
    langDir: "locales/",
    detectBrowserLanguage: false,
    strategy: "prefix_except_default",
    defaultLocale: "en-US",
    vueI18n: "./i18n.config.ts",
    locales: [
      {
        code: "zh-CN",
        name: "简体中文",
        file: "zh-CN",
      },
      {
        code: "zh-TW",
        name: "繁體中文",
        file: "zh-TW",
      },
      {
        code: "ja-JP",
        name: "日本語",
        file: "ja-JP",
      },
      {
        code: "ru-RU",
        name: "Русский",
        file: "ru-RU",
      },
      {
        code: "en-US",
        name: "English",
        file: "en-US",
      },
    ],
  },
  colorMode: {
    preference: "dark", // default value of $colorMode.preference
    fallback: "dark", // fallback value if not system preference found
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "-mode",
    storageKey: "nuxt-color-mode",
  },
});

/*
 * Every line of code is my tear
 * Every tear is you
 */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/swulogo.png' }]
    }
  },
  css: ['~/assets/css/main.css'],
  modules: [
   "@nuxt/ui",
   "@nuxt/content",
   "@nuxt/image",
   "@nuxtjs/i18n",
   "@nuxt/icon",
   "nuxt-socket-io",
   "@nuxtjs/sitemap",
   "@nuxtjs/seo",
   "@formkit/auto-animate/nuxt",
   "nuxt-seo-utils",
  ],
  sourcemap: false,
  site: {
    url: "https://szxd.swu.lol",
  },
  icon: {
    serverBundle: {
      collections: ['heroicons', 'material-symbols', 'simple-icons', 'lucide']
    }
  },
  i18n: {
    detectBrowserLanguage: false,
    strategy: "prefix_except_default",
    defaultLocale: "en-US",
    locales: [
      {
        code: "zh-CN",
        name: "简体中文",
        file: "zh-CN.json",
      },
      {
        code: "zh-TW",
        name: "繁體中文",
        file: "zh-TW.json",
      },
      {
        code: "ja-JP",
        name: "日本語",
        file: "ja-JP.json",
      },
      {
        code: "ru-RU",
        name: "Русский",
        file: "ru-RU.json",
      },
      {
        code: "en-US",
        name: "English",
        file: "en-US.json",
      },
    ],
  },
  colorMode: {
    preference: "dark", // default value of $colorMode.preference
    fallback: "dark", // fallback value if not system preference found
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: '',
    classSuffix: '',
    storage: 'localStorage', // or 'sessionStorage' or 'cookie'
    storageKey: "nuxt-color-mode",
  },
});
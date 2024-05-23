<template>
  <div>
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <!-- <UHeader :links="links">
        <template #logo>
          <NuxtImg class="w-auto h-10" src="../public/swulogo.png" />
        </template>

        <template #right>
          <UColorModeButton />
        </template>

        <template #panel>
          <UNavigationTree :links="mapContentNavigation(navigation)" />
        </template>
      </UHeader> -->
      <NuxtPage />
      <!-- <UFooter :links="links">
        <template #left> Copyright © {{ new Date().getFullYear() }} </template>

        <template #right>
          <UButton
            icon="i-simple-icons-x"
            color="gray"
            variant="ghost"
            to="https://x.com/nuxt_js"
            target="_blank"
          />
          <UButton
            icon="i-simple-icons-discord"
            color="gray"
            variant="ghost"
            to="https://discord.com/invite/ps2h6QT"
            target="_blank"
          />
          <UButton
            icon="i-simple-icons-github"
            color="gray"
            variant="ghost"
            to="https://github.com/nuxt/nuxt"
            target="_blank"
          />
        </template>
      </UFooter> -->
    </NuxtLayout>

    <UNotifications />
    <UModals />
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
colorMode.preference = "dark";

const color = computed(() =>
  colorMode.value === "dark" ? "#111827" : "white"
);

const { locale } = useI18n();
const { t } = useI18n();

useHead({
  title: t("app.head.title"),
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { key: "theme-color", name: "theme-color", content: color },
    // { name: "baidu-site-verification", content: "codeva-5bhYH6E1wP" },
    // { name: "msvalidate.01", content: "A1770F9DC0579EB104659A67EF158DF3" },
    {
      "http-equiv": "content-security-policy",
      content: "upgrade-insecure-requests",
    },
    {
      hid: "description",
      name: "description",
      content: t("app.head.description"),
    },
    {
      hid: "og:title",
      property: "og:title",
      content: t("app.og.head.title"),
    },
    {
      hid: "og:description",
      property: "og:description",
      content: t("app.og.head.description"),
    },
    {
      hid: "og:type",
      property: "og:type",
      content: "website",
    },
    {
      hid: "og:image",
      property: "og:image",
      content: "https://open.swu.social/background.jpg",
    },
    {
      hid: "og:url",
      property: "og:url",
      content: "https://open.swu.social",
    },
    {
      property: "og:locale",
      content: locale.value,
    },
  ],
  link: [
    { rel: "icon", href: "/logo.png" },
    { rel: "apple-touch-icon", href: "/logo.png" },
  ],
  htmlAttrs: {
    lang: locale.value,
  },
});

const title = "OpenSZXD";
const description =
  "OpenSZXD alleviates the burden of software costs and prevents students from being tethered to proprietary systems, championing ethical freedom in education.";

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  // ogImage: "https://dashboard-template.nuxt.dev/social-card.png",
  // twitterImage: "https://dashboard-template.nuxt.dev/social-card.png",
  // twitterCard: "summary_large_image",
});
</script>

<style>
.my-enter-active,
.my-leave-active {
  transition: opacity 0.3s;
}
.my-enter,
.my-leave-active {
  opacity: 0;
}
</style>

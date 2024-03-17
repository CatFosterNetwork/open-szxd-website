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

const color = computed(() =>
  colorMode.value === "dark" ? "#111827" : "white"
);

useHead({
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { key: "theme-color", name: "theme-color", content: color },
  ],
  link: [{ rel: "icon", href: "/swulogo.png" }],
  htmlAttrs: {
    lang: "en",
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

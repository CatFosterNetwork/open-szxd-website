<template>
  <UHeader :links="links">
    <template #logo>
      <NuxtImg class="w-auto h-10" src="../public/swulogo.png" />
    </template>

    <template #right>
      <UColorModeButton />
      <UDropdown :items="availableLocales" mode="hover">
        <UButton icon="i-heroicons-language" variant="ghost" class="ml-2" />
      </UDropdown>
    </template>

    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)" />
    </template>
  </UHeader>
  <view class="grid lg:grid-cols-2 lg:items-center gap-8 min-h-5/6 m-10">
    <view class="big-title">
      <ULandingHero
        title="Keep Free and Not Be Controlled"
        description="Watch your dreams materialize before your eyes with us."
        :links="[
          {
            label: 'Get Started',
            icon: 'i-heroicons-rocket-launch',
            size: 'lg',
            to: startPosition,
          },
        ]"
      />
    </view>
    <view>
      <ULandingGrid>
        <ULandingCard
          class="col-span-6 row-span-2"
          icon="i-heroicons-swatch"
          title="High Visualization"
          description="Visualize data so that you have a clear understanding of the functions of DingTalk in SWU."
        />
        <ULandingCard
          class="col-span-6 row-span-4"
          team
          icon="i-heroicons-wrench-screwdriver"
          title="Professional Maintenance"
          description="Our projects are maintained by skilled experts. The reliability and stability are far ahead among similar products. We use the web to make it easier for everyone to access. It can be seen that choosing us means choosing peace of mind."
        />
        <ULandingCard
          class="col-span-6 row-span-4"
          icon="i-heroicons-computer-desktop"
          title="Automatically Clock In"
          description="Use DingTalk API for automatic daily health check-in and bed check-in, so you no longer have to worry about missing out, the counselor's anger, and affecting your study."
        />
        <ULandingCard
          class="col-span-6 row-span-2"
          icon="i-heroicons-face-smile"
          title="Easy to Use"
          description="More than 100 users of our products have commented favorably on our services."
        />
      </ULandingGrid>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { NavItem } from "@nuxt/content/dist/runtime/types";

let session_token_cookie = useCookie("session_token");
const startPosition = ref<string>("/login");

startPosition.value =
  session_token_cookie.value != "" &&
  session_token_cookie.value != null &&
  session_token_cookie.value != undefined
    ? "/dashboard"
    : "/login";

const availableLocales = [
  [
    {
      label: "English",
      to: "/",
    },
    {
      label: "简体中文",
      to: "/zh",
    },
  ],
];

const navigation = inject<Ref<NavItem[]>>("navigation", ref([]));

const links = [
  {
    label: "Home",
    icon: "i-heroicons-book-open",
    to: "/",
  },
  {
    label: "Dashboard",
    icon: "i-heroicons-square-3-stack-3d",
    to: "/dashboard",
  },
  {
    label: "Product",
    icon: "i-heroicons-rocket-launch",
    to: "/purchase",
  },
];
</script>

<style lang="scss" scoped>
.body {
  height: 85vh;
}
</style>

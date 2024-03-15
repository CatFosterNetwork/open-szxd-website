<template>
  <UHeader :links="links">
    <template #logo>
      <NuxtImg class="w-auto h-10" src="../public/swulogo.png" />
    </template>

    <template #right>
      <UColorModeButton />
    </template>

    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)" />
    </template>
  </UHeader>
  <view class="body">
    <view class="big-title">
      <ULandingHero
        title="Keep Free and Not Be Controlled"
        description="Watch your dreams materialize before your eyes with us."
        :links="[
          {
            label: 'Get Started',
            icon: 'i-heroicons-rocket-launch',
            size: 'lg',
            to: '/login',
          },
        ]"
      />
    </view>
    <view class="grid">
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
    label: "Settings",
    icon: "i-heroicons-rocket-launch",
    to: "/settings",
  },
];
</script>

<style lang="scss" scoped>
.body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
}

.big-title {
  width: 150rem;
  margin-bottom: 2rem;
}

.grid {
  margin: 0 5rem;
}
</style>

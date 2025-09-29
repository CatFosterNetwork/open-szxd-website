<template>
  <UHeader>
    <template #title>
      <NuxtImg class="w-auto h-10" src="/swulogo.png" />
    </template>

    <UNavigationMenu :items="items" />

    <template #right>
      <UColorModeButton />
      <switchLanguage />
    </template>
  </UHeader>
  <view class="flex w-full h-full justify-center items-center">
    <view class="grid lg:grid-cols-2 lg:items-center gap-8 min-h-5/6 m-10">
      <view class="big-title">
        <UPageHero
          class="whitespace-pre-wrap"
          :title="$t('index.landing.hero.title')"
          :description="$t('index.landing.hero.description')"
          :links="[
            {
              label: $t('index.landing.hero.links.label'),
              icon: 'i-heroicons-rocket-launch',
              size: 'lg',
              to: localePath(startPosition),
            },
          ]"
        />
      </view>
      <view>
        <UPageGrid>
          <UPageCard
            class="col-span-6 row-span-2"
            icon="i-heroicons-swatch"
            :title="$t('index.landing.cards.visualization.title')"
            :description="$t('index.landing.cards.visualization.description')"
          />
          <UPageCard
            class="col-span-6 row-span-4"
            team
            icon="i-heroicons-wrench-screwdriver"
            :title="$t('index.landing.cards.maintenance.title')"
            :description="$t('index.landing.cards.maintenance.description')"
          />
          <UPageCard
            class="col-span-6 row-span-4"
            icon="i-heroicons-computer-desktop"
            :title="$t('index.landing.cards.clockin.title')"
            :description="$t('index.landing.cards.clockin.description')"
          />
          <UPageCard
            class="col-span-6 row-span-2"
            icon="i-heroicons-face-smile"
            :title="$t('index.landing.cards.easy.title')"
            :description="$t('index.landing.cards.easy.description')"
          />
        </UPageGrid>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { t } = useI18n();

const localePath = useLocalePath();
const session_token_cookie = useCookie("session_token");
const startPosition = ref<string>("/login");

startPosition.value =
  session_token_cookie.value != "" &&
  session_token_cookie.value != null &&
  session_token_cookie.value != undefined
    ? "/dashboard"
    : "/login";

const items = computed<NavigationMenuItem[]>(() => [
  {
      label: t("header.links.home"),
      icon: "i-heroicons-book-open",
      to: localePath("/"),
    },
    {
      label: t("header.links.dashboard"),
      icon: "i-heroicons-square-3-stack-3d",
      to: localePath("/dashboard"),
    },
    {
      label: t("header.links.purchase"),
      icon: "i-heroicons-rocket-launch",
      to: localePath("/purchase"),
    },
])
</script>

<style scoped>
.body {
  height: 85vh;
}
</style>

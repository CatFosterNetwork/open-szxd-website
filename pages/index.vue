<template>
  <UHeader :links="links">
    <template #logo>
      <NuxtImg class="w-auto h-10" src="../public/swulogo.png" />
    </template>

    <template #right>
      <UColorModeButton />
      <switchLanguage />
    </template>
  </UHeader>
  <view class="grid lg:grid-cols-2 lg:items-center gap-8 min-h-5/6 m-10">
    <view class="big-title">
      <ULandingHero
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
      <ULandingGrid>
        <ULandingCard
          class="col-span-6 row-span-2"
          icon="i-heroicons-swatch"
          :title="$t('index.landing.cards.visualization.title')"
          :description="$t('index.landing.cards.visualization.description')"
        />
        <ULandingCard
          class="col-span-6 row-span-4"
          team
          icon="i-heroicons-wrench-screwdriver"
          :title="$t('index.landing.cards.maintenance.title')"
          :description="$t('index.landing.cards.maintenance.description')"
        />
        <ULandingCard
          class="col-span-6 row-span-4"
          icon="i-heroicons-computer-desktop"
          :title="$t('index.landing.cards.clockin.title')"
          :description="$t('index.landing.cards.clockin.description')"
        />
        <ULandingCard
          class="col-span-6 row-span-2"
          icon="i-heroicons-face-smile"
          :title="$t('index.landing.cards.easy.title')"
          :description="$t('index.landing.cards.easy.description')"
        />
      </ULandingGrid>
    </view>
  </view>
</template>

<script setup lang="ts">
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

const links = computed(() => {
  return [
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
  ];
});
</script>

<style scoped>
.body {
  height: 85vh;
}
</style>

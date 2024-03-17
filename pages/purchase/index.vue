<template>
  <UHeader :links="links">
    <template #logo>
      <NuxtImg class="w-auto h-10" src="../public/swulogo.png" />
    </template>

    <template #right>
      <UColorModeButton />
      <UDropdown
        :items="availableLocales"
        mode="hover"
        :ui="{ item: { disabled: 'cursor-text select-text' } }"
      >
        <UButton icon="i-heroicons-language" variant="ghost" class="ml-2" />
      </UDropdown>
    </template>

    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)" />
    </template>
  </UHeader>
  <UPageBody prose>
    <view
      class="flex flex-col lg:grid w-4/5 justify-center items-center gap-8 mt-20 mx-auto"
    >
      <UPricingGrid>
        <UPricingCard
          :title="$t('purchase.pricing.free.title')"
          :description="$t('purchase.pricing.free.description')"
          discount="100%"
          :highlight="false"
          :features="[
            $t('purchase.pricing.free.features.1'),
            $t('purchase.pricing.free.features.2'),
            $t('purchase.pricing.free.features.3'),
          ]"
        />
        <UPricingCard
          :title="$t('purchase.pricing.basic.title')"
          :description="$t('purchase.pricing.basic.description')"
          :price="$t('purchase.pricing.basic.price')"
          :cycle="$t('purchase.pricing.basic.cycle')"
          :badge="{ label: $t('purchase.pricing.basic.badge') }"
          :button="{ label: $t('purchase.pricing.basic.button') }"
          orientation="vertical"
          :features="[
            $t('purchase.pricing.basic.features.1'),
            $t('purchase.pricing.basic.features.2'),
            $t('purchase.pricing.basic.features.3'),
            $t('purchase.pricing.basic.features.4'),
          ]"
          align="bottom"
          scale
          highlight
        />
        <UPricingCard
          :title="$t('purchase.pricing.premium.title')"
          :description="$t('purchase.pricing.premium.description')"
          :price="$t('purchase.pricing.premium.price')"
          :cycle="$t('purchase.pricing.premium.cycle')"
          :badge="{ label: $t('purchase.pricing.premium.badge') }"
          :button="{ label: $t('purchase.pricing.premium.button'), color: 'black' }"
          orientation="vertical"
          :features="[
            $t('purchase.pricing.premium.features.1'),
            $t('purchase.pricing.premium.features.2'),
            $t('purchase.pricing.premium.features.3'),
            $t('purchase.pricing.premium.features.4'),
          ]"
          align="bottom"
        />
      </UPricingGrid>
    </view>
  </UPageBody>
</template>

<script setup lang="ts">
import type { NavItem } from "@nuxt/content/dist/runtime/types";
const { t } = useI18n();
const localePath = useLocalePath();
const navigation = inject<Ref<NavItem[]>>("navigation", ref([]));
const switchLocalePath = useSwitchLocalePath()

const links = computed(() => {
  return [
    {
      label: t('header.links.home'),
      icon: "i-heroicons-book-open",
      to: localePath("/"),
    },
    {
      label: t('header.links.dashboard'),
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

const availableLocales = [
  [
    {
      label: "English",
      to: switchLocalePath("en"),
    },
  ],
  [
    {
      label: "简体中文",
      to: switchLocalePath("zh"),
    },
  ],
];
</script>

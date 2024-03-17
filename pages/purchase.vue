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
  <UPageBody prose>
    <view
      class="flex flex-col lg:grid w-4/5 justify-center items-center gap-8 mt-20 mx-auto"
    >
      <UPricingGrid>
        <UPricingCard
          title="Free"
          description="Experience product plan, we only provide limited services"
          discount=""
          :highlight="false"
          :features="[
            'Restricted scheduled tasks',
            'limited functionality',
            'Web control panel',
          ]"
        />
        <UPricingCard
          title="Trial"
          description="Monthly membership, you can enjoy all advanced features but only pay a few fees"
          price="$1.99"
          cycle="/month"
          :badge="{ label: 'Most popular' }"
          :button="{ label: 'Buy now' }"
          orientation="vertical"
          :features="[
            'No worries for 30 days',
            'Daily notifications from all channels',
            'Prioritize feedback',
            'Unlock all paid features',
          ]"
          align="bottom"
          scale
          highlight
        />
        <UPricingCard
          title="Premium"
          description="Premium annual paid membership, become a member of us, experience unprecedented freedom, and break all school restrictions"
          price="$19.99"
          cycle="/year"
          :badge="{ label: 'Cost-effectiveness' }"
          :button="{ label: 'Buy now', color: 'black' }"
          orientation="vertical"
          :features="[
            'No worries for 365 days',
            'Modify exam scores (not available now)',
            'Become a beta member for all features',
            'Online human service',
          ]"
          align="bottom"
        />
      </UPricingGrid>
    </view>
  </UPageBody>
</template>

<script setup lang="ts">
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

<script setup lang="ts">
import { sub } from "date-fns";
import type { Period, Range } from "~/types";

checkLogin();

const { t } = useI18n();

const range = ref<Range>({
  start: sub(new Date(), { days: 14 }),
  end: new Date(),
});
const period = ref<Period>("daily");

let hasOpened = useCookie("hasOpened51");

if (hasOpened.value as any != true) {
  hasOpened = useCookie("hasOpened51", {
    maxAge: 3600 * 24 * 6,
  });
}

const open = ref(true)
const isOpened = computed(() => hasOpened.value as any == true ? false : true);

const close = () => {
  hasOpened.value = true as any;
};
</script>

<template>
  <NuxtLayout name="dashboard">
    <UModal v-model="isOpened">
      <div class="p-4">
        <h2 class="text-lg font-semibold">{{ t('dashboard.modals.warmReminder.title') }}</h2>
        <p class="mt-2 text-sm text-gray-500">
          {{ t('dashboard.modals.warmReminder.content') }}
        </p>
        <div class="mt-4 flex justify-end">
          <UButton @click="close">{{ t('dashboard.modals.warmReminder.button') }}</UButton>
        </div>
      </div>
    </UModal>
    <UModal v-model:open="open">
      <div class="p-4">
        <h2 class="text-xl font-semibold">{{ t('dashboard.modals.domainChange.title') }}</h2>
        <p class="mt-2 text-base text-gray-500">
          {{ t('dashboard.modals.domainChange.content') }} <NuxtLink class="link hover:text-green-500" to="https://38.147.184.134/">https://38.147.184.134/</NuxtLink> {{ t('dashboard.modals.domainChange.contentSuffix') }}
        </p>
        <div class="mt-4 flex justify-end">
          <UButton @click="open=false">{{ t('dashboard.modals.domainChange.button') }}</UButton>
        </div>
      </div>
    </UModal>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Dashboard">
        <template #right>
          <!-- <UTooltip text="Notifications" :shortcuts="['N']">
            <UButton
              color="neutral" variant="subtle"
              variant="ghost"
              square
              @click="isNotificationsSlideoverOpen = true"
            >
              <UChip color="red" inset>
                <UIcon name="i-heroicons-bell" class="w-5 h-5" />
              </UChip>
            </UButton>
          </UTooltip> -->

          <!-- <UDropdown :items="items">
            <UButton
              icon="i-heroicons-plus"
              size="md"
              class="ml-1.5 rounded-full"
            />
          </UDropdown> -->
          <switchLanguage />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <!-- ~/components/home/HomeDateRangePicker.vue -->
          <HomeDateRangePicker v-model="range" class="-ml-2.5" />

          <!-- ~/components/home/HomePeriodSelect.vue -->
          <!-- <HomePeriodSelect v-model="period" :range="range" /> -->
        </template>
      </UDashboardToolbar>

      <template #body>
        <!-- ~/components/home/HomeChart.vue -->
        <HomeChart :period="period" :range="range" />

        <div class="grid lg:grid-cols-2 lg:items-start gap-8 mt-8">
          <!-- ~/components/home/HomeSales.vue -->
          <HomeSales />
          <!-- ~/components/home/HomeCountries.vue -->
          <HomeCountries />
        </div>
      </template>
    </UDashboardPanel>
  </NuxtLayout>
</template>

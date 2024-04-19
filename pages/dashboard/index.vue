<script setup lang="ts">
import { sub } from "date-fns";
import type { Period, Range } from "~/types";

checkLogin();

const range = ref<Range>({
  start: sub(new Date(), { days: 14 }),
  end: new Date(),
});
const period = ref<Period>("daily");

const hasOpened = localStorage.getItem("hasOpened");

const isOpened = ref(hasOpened === "true" ? false : true);

const close = () => {
  isOpened.value = false;
  localStorage.setItem("hasOpened", "true");
};
</script>

<template>
  <NuxtLayout name="dashboard">
    <UDashboardPage>
      <UModal v-model="isOpened">
        <div class="p-4">
          <h2 class="text-lg font-semibold">热烈祝贺</h2>
          <p class="mt-2 text-sm text-gray-600">
            恭喜我们的新产品用户数量破百！我们为每一个仍然在有效期内的用户额外提供了6天的免登录打卡期限
          </p>
          <div class="mt-4 flex justify-end">
            <UButton @click="close">Got it!</UButton>
          </div>
        </div>
      </UModal>
      <UDashboardPanel grow>
        <UDashboardNavbar title="Dashboard">
          <template #right>
            <!-- <UTooltip text="Notifications" :shortcuts="['N']">
              <UButton
                color="gray"
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

        <UDashboardPanelContent>
          <!-- ~/components/home/HomeChart.vue -->
          <HomeChart :period="period" :range="range" />

          <div class="grid lg:grid-cols-2 lg:items-start gap-8 mt-8">
            <!-- ~/components/home/HomeSales.vue -->
            <HomeSales />
            <!-- ~/components/home/HomeCountries.vue -->
            <HomeCountries />
          </div>
        </UDashboardPanelContent>
      </UDashboardPanel>
    </UDashboardPage>
  </NuxtLayout>
</template>

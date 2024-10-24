<script setup lang="ts">
import { sub } from "date-fns";
import type { Period, Range } from "~/types";

checkLogin();

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
const isOpened = computed(() => !open.value && hasOpened.value as any == true ? false : true);

const close = () => {
  hasOpened.value = true as any;
};
</script>

<template>
  <NuxtLayout name="dashboard">
    <UDashboardPage>
      <UModal v-model="isOpened">
        <div class="p-4">
          <h2 class="text-lg font-semibold">温馨提示</h2>
          <p class="mt-2 text-sm text-gray-500">
            开放数智西大在节假日期间将会自动检测您的请假状态，如果您处于请假状态，将不会进行自动打卡操作。手动销假过后会恢复自动打卡（若打卡仍未过期）。
            在节假日期间，若您不在学校，您可以通过网页VPN或者客户端VPN进入 <NuxtLink class="link hover:text-green-500" to="http://szxd-swu-lol-s.sangfor.vpn.swu.edu.cn:8118/">http://szxd-swu-lol-s.sangfor.vpn.swu.edu.cn:8118/</NuxtLink>
            来访问我们的服务!
          </p>
          <div class="mt-4 flex justify-end">
            <UButton @click="close">Got it!</UButton>
          </div>
        </div>
      </UModal>
      <UModal v-model="open">
        <div class="p-4">
          <h2 class="text-xl font-semibold">域名更换提示</h2>
          <p class="mt-2 text-base text-gray-500">
            由于运营商屏蔽，我们将域名从原域名迁移至 <NuxtLink class="link hover:text-green-500" to="https://38.147.184.134/">https://38.147.184.134/</NuxtLink> 原有服务不受影响，原域名将会在一段时间后停止服务，请您尽快更换域名来访问我们的服务!
          </p>
          <div class="mt-4 flex justify-end">
            <UButton @click="open=false">Got it!</UButton>
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

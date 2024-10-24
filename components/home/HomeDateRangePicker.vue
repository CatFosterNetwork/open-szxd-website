<script setup lang="ts">
import Api from "~/api/api";

const date = ref<string>("N/A");

await useAsyncData<void>(
  async () => {
    const res = await Api.expire();
    if (res.data && res.data.code === 0x0) {
      date.value = new Date(res.data.data).toLocaleDateString();
    } else {
      date.value = "N/A";
    }
  },
  { server: false, watch: [] }
);
</script>

<template>
  <div
    class="flex items-center sm:divide-x divide-gray-200 dark:divide-gray-800"
  >
    <div class="ms-3 text-xl" v-if="date == 'N/A'">
      {{ $t("homeDateRangePicker.dashboardCard.description") }}
      <span class="text-red-500 dark:text-red-400">{{
        $t("homeDateRangePicker.dashboardCard.deactivate")
      }}</span>
    </div>
    <div class="ms-3 text-xl" v-else>
      {{ $t("homeDateRangePicker.dashboardCard.description") }}
      <span class="text-green-500 dark:text-green-400"
        >{{ $t("homeDateRangePicker.dashboardCard.activateUntill") }}
        {{ date }}</span
      >{{ $t("homeDateRangePicker.dashboardCard.reactivate") }}
    </div>
  </div>
</template>

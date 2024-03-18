<script setup lang="ts">
import Api from "~/api/api";
const { data } = await useAsyncData(
  async () => {
    const res = await Api.gardens();
    const result = res.data.data;
    const colors = ["red", "orange", "yellow", "green", "teal", "blue"];
    let sum = 0;
    for (const key in result) {
      sum += result[key];
    }

    let i = 0;
    for (const key in result) {
      result[key] = {
        label: key,
        value: (result[key] / sum) * 100,
        color: colors[i],
      };
      i++;
    }
    const result2 = Object.keys(result)
      .sort((a, b) => result[b].value - result[a].value)
      .reduce((obj: any, key) => {
        obj[key] = result[key];
        return obj;
      }, {});
    return result2;
  },
  { server: false, watch: [] }
);
</script>

<template>
  <UDashboardCard
    :title="$t('homeCountries.dashboardCard.title')"
    :description="$t('homeCountries.dashboardCard.description')"
    icon="i-heroicons-globe-alt-20-solid"
  >
    <div class="space-y-2">
      <UMeter
        v-for="(country, index) in data"
        :key="index"
        :value="country.value"
        :label="country.label"
        :color="country.color"
        size="lg"
        class="flex-row-reverse items-center"
        :ui="{
          label: { base: 'flex-shrink-0 w-24' },
          indicator: { container: '!w-auto' },
          meter: { base: 'flex-1' },
        }"
        indicator
      />
    </div>
  </UDashboardCard>
</template>

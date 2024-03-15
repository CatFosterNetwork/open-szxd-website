<script setup lang="ts">
const countries = [
  {
    label: "橘园",
    value: 31,
    color: "red",
  },
  {
    label: "李园",
    value: 21,
    color: "orange",
  },
  {
    label: "桃园",
    value: 15,
    color: "yellow",
  },
  {
    label: "竹园",
    value: 10,
    color: "green",
  },
  {
    label: "杏园",
    value: 6,
    color: "teal",
  },
  {
    label: "梅园",
    value: 1,
    color: "blue",
  },
  {
    label: "Brazil",
    value: 1,
    color: "indigo",
  },
  {
    label: "China",
    value: 1,
    color: "pink",
  },
];
</script>

<template>
  <UDashboardCard
    title="Top dormitories"
    description="Dormitories with the most use of automatic check-in services"
    icon="i-heroicons-globe-alt-20-solid"
  >
    <div class="space-y-2">
      <UMeter
        v-for="(country, index) in countries.slice(0, 6)"
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

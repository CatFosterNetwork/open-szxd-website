<template>
  <UDropdown
    :items="availableLocales"
    mode="hover"
    :ui="{ item: { disabled: 'cursor-text select-text' } }"
  >
    <UButton icon="i-heroicons-language" variant="ghost" class="ml-2" />
  </UDropdown>
</template>

<script setup lang="ts">
const switchLocalePath = useSwitchLocalePath();

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

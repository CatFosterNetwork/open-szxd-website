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
      to: switchLocalePath("en-US"),
    },
  ],
  [
    {
      label: "简体中文",
      to: switchLocalePath("zh-CN"),
    },
  ],
  [
    {
      label: "繁體中文",
      to: switchLocalePath("zh-TW"),
    },
  ],
  [
    {
      label: "日本語",
      to: switchLocalePath("ja-JP"),
    },
  ],
  [
    {
      label: "Русский",
      to: switchLocalePath("ru-RU"),
    },
  ]
];
</script>

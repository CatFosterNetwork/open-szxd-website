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
const { setLocale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const availableLocales = [
  [
    {
      label: "English",
      to: () => {
        setLocale("en-US");
        switchLocalePath("en-US");
      },
    },
  ],
  [
    {
      label: "简体中文",
      to: () => {
        setLocale("zh-CN");
        switchLocalePath("zh-CN");
      },
    },
  ],
  [
    {
      label: "繁體中文",
      to: () => {
        setLocale("zh-TW");
        switchLocalePath("zh-TW");
      },
    },
  ],
  [
    {
      label: "日本語",
      to: () => {
        setLocale("ja-JP");
        switchLocalePath("ja-JP");
      },
    },
  ],
  [
    {
      label: "Русский",
      to: () => {
        setLocale("ru-RU");
        switchLocalePath("ru-RU");
      },
    },
  ],
];
</script>

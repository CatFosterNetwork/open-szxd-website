<script setup lang="ts">
const { isHelpSlideoverOpen } = useDashboard();
const { isDashboardSearchModalOpen } = useUIState();
const { metaSymbol } = useShortcuts();
const localePath = useLocalePath();

const items = computed(() => [
  [
    {
      slot: "account",
      label: "",
      disabled: true,
    },
  ],
  [
    {
      label: "Settings",
      icon: "i-heroicons-cog-8-tooth",
      to: localePath("/settings"),
    },
    {
      label: "Command menu",
      icon: "i-heroicons-command-line",
      shortcuts: [metaSymbol.value, "K"],
      click: () => {
        isDashboardSearchModalOpen.value = true;
      },
    },
    {
      label: "Help & Support",
      icon: "i-heroicons-question-mark-circle",
      shortcuts: ["?"],
      click: () => (isHelpSlideoverOpen.value = true),
    },
  ],
  [
    // {
    //   label: "Documentation",
    //   icon: "i-heroicons-book-open",
    //   to: "https://ui.nuxt.com/pro/getting-started",
    //   target: "_blank",
    // },
    // {
    //   label: "GitHub repository",
    //   icon: "i-simple-icons-github",
    //   to: "https://github.com/nuxt-ui-pro/dashboard",
    //   target: "_blank",
    // },
    {
      label: "Buy Open-SZXD Pro",
      icon: "i-heroicons-credit-card",
      to: localePath("/purchase"),
      target: "_blank",
    },
  ],
  [
    {
      label: "Sign out",
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: () => {
        document.cookie.split(";").forEach(function (c) {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(
              /=.*/,
              "=;expires=" + new Date().toUTCString() + ";path=/"
            );
        });
        window.location.href = localePath("/");
      },
    },
  ],
]);

import Api from "~/api/api";

const { data } = await useAsyncData(
  async () => {
    const user = (await Api.profile()).data.data;
    return {
      username: user.username,
      avatar: user.avatar,
    };
  },
  { server: false, watch: [] }
);
</script>

<template>
  <DropdownMenu
    mode="hover"
    :items="items"
    :ui="{ width: 'w-full', item: { disabled: 'cursor-text select-text' } }"
    :popper="{ strategy: 'absolute', placement: 'top' }"
    class="w-full"
  >
    <template #default="{ open }">
      <UButton
        color="neutral"
        variant="ghost"
        class="w-full"
        :label="data?.username"
        :class="[open && 'bg-gray-50 dark:bg-gray-800']"
      >
        <template #leading>
          <UAvatar :src="data?.avatar || '/swulogo.png'" size="2xs" />
        </template>

        <template #trailing>
          <UIcon name="i-heroicons-ellipsis-vertical" class="w-5 h-5 ml-auto" />
        </template>
      </UButton>
    </template>

    <template #account>
      <div class="text-left">
        <p>Signed in as</p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ data?.username }}
        </p>
      </div>
    </template>
  </DropdownMenu>
</template>

<script setup lang="ts">
const teams = [
  {
    label: "Southwest University",
    avatar: {
      src: "/swulogo.png",
    },
    click: () => {
      team.value = teams[0];
    },
  },
  // {
  //   label: "NuxtLabs",
  //   avatar: {
  //     src: "https://avatars.githubusercontent.com/u/62017400?s=200&v=4",
  //   },
  //   click: () => {
  //     team.value = teams[1];
  //   },
  // },
];

const actions = [
  {
    label: "Visit official website",
    icon: "i-heroicons-briefcase",
    to: "http://swu.edu.cn",
    target: "_blank",
  },
  {
    label: "Contact us",
    icon: "i-simple-icons-github",
    to: "https://github.com/CatFosterNetwork",
    target: "_blank",
  },
];

const team = ref(teams[0]);
</script>

<template>
  <UDropdown
    v-slot="{ open }"
    mode="hover"
    :items="[teams, actions]"
    class="w-full"
    :ui="{ width: 'w-full' }"
    :popper="{ strategy: 'absolute' }"
  >
    <UButton
      color="gray"
      variant="ghost"
      :class="[open && 'bg-gray-50 dark:bg-gray-800']"
      class="w-full"
    >
      <UAvatar :src="team.avatar.src" size="2xs" />

      <span class="truncate text-gray-900 dark:text-white font-semibold">{{
        team.label
      }}</span>
    </UButton>
  </UDropdown>
</template>

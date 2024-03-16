<script setup lang="ts">
const route = useRoute();
const appConfig = useAppConfig();
const { isHelpSlideoverOpen } = useDashboard();

const links = [
  {
    id: "home",
    label: "Home",
    icon: "i-heroicons-home",
    to: "/",
    tooltip: {
      text: "Home",
      shortcuts: ["G", "H"],
    },
  },
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "i-heroicons-chart-bar-square",
    to: "/dashboard",
    tooltip: {
      text: "Dashboard",
      shortcuts: ["G", "D"],
    },
  },
  {
    id: "inbox",
    label: "Inbox",
    icon: "i-heroicons-inbox",
    to: "/inbox",
    badge: "4",
    tooltip: {
      text: "Inbox",
      shortcuts: ["G", "I"],
    },
  },
  {
    id: "schedule",
    label: "Schedule",
    icon: "i-heroicons-table-cells",
    to: "/schedule",
    tooltip: {
      text: "Schedule",
      shortcuts: ["G", "S"],
    },
  },
  {
    id: "settings",
    label: "Settings",
    to: "/settings",
    icon: "i-heroicons-cog-8-tooth",
    children: [
      {
        label: "General",
        to: "/settings",
        exact: true,
      },
      {
        label: "Members",
        to: "/settings/members",
      },
      {
        label: "Notifications",
        to: "/settings/notifications",
      },
    ],
    tooltip: {
      text: "Settings",
      shortcuts: ["G", "S"],
    },
  },
];

import { useClipboard } from "@vueuse/core";

const toast = useToast();
const inviteMsg = ref(
  "Go to https://open.szxd.swu.social/ to get free and automatic check in service."
);
const { text, copy, copied, isSupported } = useClipboard({ inviteMsg });

const footerLinks = [
  {
    label: "Invite people",
    icon: "i-heroicons-plus",
    // to: "/settings/members",
    click: () => {
      copy(inviteMsg.value);
      toast.add({ title: "Copied!", icon: "i-heroicons-check-circle" });
    },
  },
  {
    label: "Help & Support",
    icon: "i-heroicons-question-mark-circle",
    click: () => (isHelpSlideoverOpen.value = true),
  },
];

const groups = [
  {
    key: "links",
    label: "Go to",
    commands: links.map((link) => ({
      ...link,
      shortcuts: link.tooltip?.shortcuts,
    })),
  },
  {
    key: "contact",
    label: "Contact",
    commands: [
      {
        id: "source",
        label: "Contact us on GitHub",
        icon: "i-simple-icons-github",
        click: () => {
          window.open(`https://github.com/CatFosterNetwork`, "_blank");
        },
      },
    ],
  },
];

const defaultColors = ref(
  ["green", "teal", "cyan", "sky", "blue", "indigo", "violet"].map((color) => ({
    label: color,
    chip: color,
    click: () => (appConfig.ui.primary = color),
  }))
);
const colors = computed(() =>
  defaultColors.value.map((color) => ({
    ...color,
    active: appConfig.ui.primary === color.label,
  }))
);
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel
      :width="250"
      :resizable="{ min: 200, max: 300 }"
      collapsible
    >
      <UDashboardNavbar class="!border-transparent" :ui="{ left: 'flex-1' }">
        <template #left>
          <TeamsDropdown />
        </template>
      </UDashboardNavbar>

      <UDashboardSidebar>
        <template #header>
          <UDashboardSearchButton />
        </template>

        <UDashboardSidebarLinks :links="links" />

        <UDivider />

        <UDashboardSidebarLinks
          :links="[{ label: 'Colors', draggable: true, children: colors }]"
          @update:links="(colors) => (defaultColors = colors)"
        />

        <div class="flex-1" />

        <UDashboardSidebarLinks :links="footerLinks" />

        <UDivider class="sticky bottom-0" />

        <template #footer>
          <!-- ~/components/UserDropdown.vue -->
          <UserDropdown />
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>

    <slot />

    <!-- ~/components/HelpSlideover.vue -->
    <HelpSlideover />
    <!-- ~/components/NotificationsSlideover.vue -->
    <NotificationsSlideover />

    <ClientOnly>
      <LazyUDashboardSearch :groups="groups" />
    </ClientOnly>
  </UDashboardLayout>
</template>

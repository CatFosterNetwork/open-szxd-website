<script setup lang="ts">
import Api from "~/api/api";
const localePath = useLocalePath();
const appConfig = useAppConfig();
const { isHelpSlideoverOpen } = useDashboard();
const { t } = useI18n();
const badge = ref(0);
const user = ref<any>()

await useAsyncData(
  async () => {
    Api.inbox().then((res) => {
      badge.value = res.data.data.filter(
        (mail: any) => !mail.is_checked
      ).length;
    });
  },
  { server: false, watch: [] }
);

const links = ref([
    {
      id: "home",
      label: t("layouts.dashboard.links.home.label"),
      icon: "i-heroicons-home",
      to: localePath("/"),
      tooltip: {
        text: t("layouts.dashboard.links.home.text"),
        shortcuts: ["G", "H"],
      },
    },
    {
      id: "dashboard",
      label: t("layouts.dashboard.links.dashboard.label"),
      icon: "i-heroicons-chart-bar-square",
      to: localePath("/dashboard"),
      tooltip: {
        text: t("layouts.dashboard.links.dashboard.text"),
        shortcuts: ["G", "D"],
      },
    },
    {
      id: "purchase",
      label: t("layouts.dashboard.links.purchase.label"),
      icon: "i-heroicons-shopping-cart",
      to: localePath("/purchase"),
      tooltip: {
        text: t("layouts.dashboard.links.purchase.text"),
        shortcuts: ["G", "P"],
      },
    },
    {
      id: "inbox",
      label: t("layouts.dashboard.links.inbox.label"),
      icon: "i-heroicons-inbox",
      to: localePath("/inbox"),
      badge: badge.value,
      tooltip: {
        text: t("layouts.dashboard.links.inbox.text"),
        shortcuts: ["G", "I"],
      },
    },
    {
      id: "schedule",
      label: t("layouts.dashboard.links.schedule.label"),
      icon: "i-heroicons-table-cells",
      to: localePath("/schedule"),
      tooltip: {
        text: t("layouts.dashboard.links.schedule.text"),
        shortcuts: ["G", "F"],
      },
    },
    {
      id: "lerun",
      label: t("layouts.dashboard.links.lerun.label"),
      icon: "i-material-symbols-directions-run-rounded",
      to: localePath("/lerun"),
      tooltip: {
        text: t("layouts.dashboard.links.lerun.text"),
        shortcuts: ["G", "L"],
      },
    },
    {
      id: "settings",
      label: t("layouts.dashboard.links.settings.label"),
      to: localePath("/settings"),
      icon: "i-heroicons-cog-8-tooth",
      children: [
        {
          label: t("layouts.dashboard.links.settings.children.general"),
          to: localePath("/settings"),
          exact: true,
        },
        {
          label: t("layouts.dashboard.links.settings.children.notifications"),
          to: localePath("/settings/notifications"),
        },
        {
          label: t("layouts.dashboard.links.settings.children.cdkey"),
          to: localePath("/settings/cdkey")
        },
      ],
      tooltip: {
        text: t("layouts.dashboard.links.settings.text"),
        shortcuts: ["G", "S"],
      },
    },
  ]);

useAsyncData(
  async () => {
    user.value = (await Api.profile()).data.data;
    if (user.value.is_admin || user.value.is_reseller) {
      links.value.push(
        {
          id: 'keys',
          label: '激活码',
          to: localePath("/keys"),
            icon: "i-heroicons-key",
          tooltip: {
            text: "激活码管理",
            shortcuts: ["G", "K"]
          }
        }
      )
    }
  },
  { server: false, watch: [] }
);

import { useClipboard } from "@vueuse/core";

const toast = useToast();
const inviteMsg = ref(t("layouts.dashboard.footerLinks.inviteMsg"));

const { copy, copied, text, isSupported } = useClipboard({
  source: inviteMsg.value,
});

function legacyCopy(value: string) {
  const ta = document.createElement("textarea");
  ta.value = value ?? "";
  ta.style.position = "absolute";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  ta.remove();
}

const footerLinks = [
  {
    label: t("layouts.dashboard.footerLinks.invite"),
    icon: "i-heroicons-plus",
    click: async () => {
      if (isSupported.value) {
        await copy(inviteMsg.value);
        toast.add({
          title: t("layouts.dashboard.footerLinks.inviteMsgCopied"),
          icon: "i-heroicons-check-circle",
        });
      } else {
        try {
          legacyCopy(inviteMsg.value);
          toast.add({
            title: t("layouts.dashboard.footerLinks.inviteMsgCopied"),
            icon: "i-heroicons-check-circle",
          });
        } catch (e) {
          toast.add({
            title: t("layouts.dashboard.footerLinks.inviteMsgNotCopied"),
            icon: "i-heroicons-x-circle",
            color: "error",
          });
        }
      }
    },
  },
  {
    label: t("layouts.dashboard.footerLinks.help"),
    icon: "i-heroicons-question-mark-circle",
    click: () => (isHelpSlideoverOpen.value = true),
  },
];

const groups = [
  {
    key: "links",
    label: t("layouts.dashboard.lazyUDashboardSearch.groups.links.label"),
    commands: links.value.map((link) => ({
      ...link,
      shortcuts: link.tooltip?.shortcuts,
    })),
  },
  {
    key: "contact",
    label: t("layouts.dashboard.lazyUDashboardSearch.groups.contact.label"),
    commands: [
      {
        id: "source",
        label: t(
          "layouts.dashboard.lazyUDashboardSearch.groups.contact.commands.label"
        ),
        icon: "i-simple-icons-github",
        click: () => {
          window.open(`https://github.com/CatFosterNetwork`, "_blank");
        },
      },
      {
        id: "telegram",
        label: t(
          "layouts.dashboard.lazyUDashboardSearch.groups.telegram.commands.label"
        ),
        icon: "i-simple-icons-telegram",
        click: () => {
          window.open(`https://t.me/+kLfUSbSYh7M2ZjQ9`, "_blank");
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
  <UDashboardGroup>
    <UDashboardPanel
      :width="250"
      :resizable="{ min: 200, max: 300 }"
      collapsible
    >
      <UDashboardNavbar class="border-transparent!" :ui="{ left: 'flex-1' }">
        <template #left>
          <TeamsDropdown />
        </template>
      </UDashboardNavbar>

      <UDashboardSidebar>
        <template #header>
          <UDashboardSearchButton />
        </template>

        <UNavigationMenu :links="links" />

        <USeparator />

        <UNavigationMenu
          :links="[{ label: 'Colors', draggable: true, children: colors }]"
          @update:links="(colors) => (defaultColors = colors)"
        />

        <div class="flex-1" />

        <UNavigationMenu :links="footerLinks" />

        <USeparator class="sticky bottom-0" />

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
    <!-- <NotificationsSlideover /> -->

    <ClientOnly>
      <LazyUDashboardSearch :groups="groups" />
    </ClientOnly>
  </UDashboardGroup>
</template>

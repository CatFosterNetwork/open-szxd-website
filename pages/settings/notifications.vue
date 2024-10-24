<script setup lang="ts">
const { t } = useI18n();
const toast = useToast();

const state = reactive<{ [key: string]: boolean }>({
  email: false,
  desktop: false,
  wechat: false,
  product_updates: false,
  weekly_digest: false,
  important_updates: false,
});

await useAsyncData(
  async () => {
    const res = (await Api.profile()).data.data.notification_preference;
    state.email = res.email;
    state.desktop = res.desktop;
    state.wechat = res.wechat;
    state.product_updates = res.product_updates;
    state.weekly_digest = res.weekly_digest;
    state.important_updates = res.important_updates;
  },
  { server: false, watch: [] }
);

const sections = [
  {
    title: t("settings.notifications.sections.title"),
    description: t("settings.notifications.sections.description"),
    fields: [
      {
        name: "email",
        label: t("settings.notifications.sections.fields.email.label"),
        description: t(
          "settings.notifications.sections.fields.email.description"
        ),
        disabled: false,
      },
      {
        name: "desktop",
        label: t("settings.notifications.sections.fields.desktop.label"),
        description: t(
          "settings.notifications.sections.fields.desktop.description"
        ),
        disabled: true,
      },
      {
        name: "wechat",
        label: t("settings.notifications.sections.fields.wechat.label"),
        description: t(
          "settings.notifications.sections.fields.wechat.description"
        ),
        disabled: true,
      },
    ],
  },
  {
    title: "Account updates",
    description: "Receive news about latest updates.",
    fields: [
      // {
      //   name: "weekly_digest",
      //   label: "Weekly digest",
      //   description: "Receive a weekly digest of news.",
      // },
      // {
      //   name: "product_updates",
      //   label: "Product updates",
      //   description:
      //     "Receive a monthly email with all new features and updates.",
      // },
      {
        name: "important_updates",
        label: "Important updates",
        description:
          "Receive emails about important updates like security fixes, maintenance, etc.",
        disabled: true,
      },
    ],
  },
];

import Api from "~/api/api";

async function onChange() {
  if (state.email) {
    const email = (await Api.profile()).data.data.email;
    if (!!!email) {
      toast.add({
        title: t("settings.notifications.toast.email.failed"),
        icon: "i-heroicons-x-circle",
        color: "red",
      });
      state.email = false;
      return;
    } else {
      Api.notifications({ email: state.email });
    }
  } else {
    Api.notifications({ email: state.email });
  }
}
</script>

<template>
  <NuxtLayout name="dashboard">
    <UDashboardPanelContent
      class="p-0 pb-24 divide-y divide-gray-200 dark:divide-gray-800"
    >
      <UDashboardSection
        v-for="(section, index) in sections"
        :key="index"
        :title="section.title"
        :description="section.description"
        orientation="horizontal"
        class="px-4 py-6"
      >
        <UCard
          :ui="{
            body: {
              base: 'divide-y divide-gray-200 dark:divide-gray-800 gap-4 flex flex-col',
            },
          }"
        >
          <UFormGroup
            v-for="field in section.fields"
            :key="field.name"
            :name="field.name"
            :label="field.label"
            :description="field.description"
            class="flex items-center justify-between pt-4 first:pt-0 gap-2"
            :ui="{ container: 'flex' }"
          >
            <UToggle
              v-model="state[field.name]"
              :disabled="field.disabled"
              size="md"
              @update:model-value="onChange"
            />
          </UFormGroup>
        </UCard>
      </UDashboardSection>
    </UDashboardPanelContent>
  </NuxtLayout>
</template>

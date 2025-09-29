<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";
import Api from "~/api/api";

const { t } = useI18n();

checkLogin();

const state = reactive({
  username: "",
  email: "",
  avatar: "",
});

const { data } = await useAsyncData(
  async () => {
    const user = (await Api.profile()).data.data;
    state.username = user.username;
    state.email = user.email;
    state.avatar = user.avatar;
    return {
      username: user.username,
      avatar: user.avatar,
      email: user.email,
    };
  },
  {
    server: false,
    watch: [],
  }
);

const fileRef = ref<{ input: HTMLInputElement }>();
const isDeleteAccountModalOpen = ref(false);

const toast = useToast();

function validate(state: any): FormError[] {
  const errors = [];
  if (!state.name)
    errors.push({ name: "name", message: "Please enter your name." });
  if (!state.email)
    errors.push({ name: "email", message: "Please enter your email." });
  return errors;
}

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement;

  if (!input.files?.length) {
    return;
  }

  state.avatar = URL.createObjectURL(input.files[0]);
}

function onFileClick() {
  fileRef.value?.input.click();
}

async function onSubmit(event: FormSubmitEvent<any>) {
  const res = await Api.updateProfile(state);
  if (res.status !== 200) {
    toast.add({
      title: t("settings.general.updateProfile.failed"),
      icon: "i-heroicons-x-circle",
    });
    return;
  } else {
    toast.add({
      title: t("settings.general.updateProfile.success"),
      icon: "i-heroicons-check-circle",
    });
  }
}

const { setLocale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const { locale } = useI18n();
const languageLabel = ref<string>("");
if (locale.value === "en-US") {
  languageLabel.value = "English";
} else if (locale.value === "zh-CN") {
  languageLabel.value = "简体中文";
} else if (locale.value === "zh-TW") {
  languageLabel.value = "繁體中文";
} else if (locale.value === "ja-JP") {
  languageLabel.value = "日本語";
} else if (locale.value === "ru-RU") {
  languageLabel.value = "Русский";
}

const availableLocales = [
  [
    {
      label: "English",
      to: switchLocalePath("en-US"),
      click: () => setLocale("en-US"),
    },
  ],
  [
    {
      label: "简体中文",
      to: switchLocalePath("zh-CN"),
      click: () => setLocale("zh-CN"),
    },
  ],
  [
    {
      label: "繁體中文",
      to: switchLocalePath("zh-TW"),
      click: () => setLocale("zh-TW"),
    },
  ],
  [
    {
      label: "日本語",
      to: switchLocalePath("ja-JP"),
      click: () => setLocale("ja-JP"),
    },
  ],
  [
    {
      label: "Русский",
      to: switchLocalePath("ru-RU"),
      click: () => setLocale("ru-RU"),
    },
  ]
];
</script>

<template>
  <NuxtLayout name="dashboard">
    <template #body>
      <UPageCard
        :title="$t('settings.general.dashboardPanelContent.theme.title')"
        :description="
          $t('settings.general.dashboardPanelContent.theme.description')
        "
      >
        <template #links>
          <UColorModeSelect color="neutral" variant="subtle" />
        </template>
      </UPageCard>

      <UPageCard
        :title="$t('settings.general.dashboardPanelContent.language.title')"
        :description="
          $t('settings.general.dashboardPanelContent.language.description')
        "
      >
        <template #links>
          <UDropdownMenu
            :items="availableLocales"
            mode="hover"
            :ui="{ item: { disabled: 'cursor-text select-text' } }"
          >
          <UButton color="neutral" variant="outline" :label="languageLabel" trailing-icon="i-heroicons-chevron-down-20-solid" />
          </UDropdownMenu>
        </template>
      </UPageCard>

      <USeparator class="mb-4" />

      <UForm
        :state="state"
        :validate="validate"
        :validate-on="['submit']"
        @submit="onSubmit"
      >
        <UPageCard
          :title="$t('settings.general.dashboardPanelContent.profile.title')"
          :description="
            $t('settings.general.dashboardPanelContent.profile.description')
          "
        >
          <template #links>
            <UButton
              type="submit"
              :label="$t('settings.general.dashboardPanelContent.button')"
              color="neutral"
              @click="onSubmit"
            />
          </template>

          <UFormField
            name="username"
            :label="
              $t(
                'settings.general.dashboardPanelContent.profile.username.label'
              )
            "
            :description="
              $t(
                'settings.general.dashboardPanelContent.profile.username.description'
              )
            "
            required
            class="grid grid-cols-2 gap-2"
            :ui="{ container: '' }"
          >
            <UInput
              v-model="state.username"
              type="username"
              autocomplete="off"
              size="md"
              :disabled="true"
            />
          </UFormField>

          <UFormField
            name="avatar"
            :label="
              $t('settings.general.dashboardPanelContent.profile.avatar.label')
            "
            class="grid grid-cols-2 gap-2"
            :help="
              $t('settings.general.dashboardPanelContent.profile.avatar.help')
            "
            :ui="{
              container: 'flex flex-wrap items-center gap-3',
              help: 'mt-0',
            }"
          >
            <UAvatar :src="state.avatar" :alt="state.username" size="lg" />

            <UButton
              :label="
                $t(
                  'settings.general.dashboardPanelContent.profile.avatar.button'
                )
              "
              color="neutral"
              size="md"
              @click="onFileClick"
              :disabled="true"
            />

            <UInput
              ref="fileRef"
              type="file"
              class="hidden"
              accept=".jpg, .jpeg, .png, .gif"
              @change="onFileChange"
            />
          </UFormField>

          <UFormField
            name="email"
            :label="
              $t('settings.general.dashboardPanelContent.profile.email.label')
            "
            :description="
              $t(
                'settings.general.dashboardPanelContent.profile.email.description'
              )
            "
            required
            class="grid grid-cols-2 gap-2"
            :ui="{ container: '' }"
          >
            <UInput
              v-model="state.email"
              type="email"
              autocomplete="off"
              icon="i-heroicons-envelope"
              size="md"
            />
          </UFormField>

          <!-- <UFormField
            name="bio"
            label="Bio"
            description="Brief description for your profile. URLs are hyperlinked."
            class="grid grid-cols-2 gap-2"
            :ui="{ container: '' }"
          >
            <UTextarea v-model="state.bio" :rows="5" autoresize size="md" />
          </UFormField> -->

          <!-- <UFormField
            name="password"
            label="Password"
            description="Confirm your current password before setting a new one."
            class="grid grid-cols-2 gap-2"
            :ui="{ container: '' }"
          >
            <UInput
              id="password"
              v-model="state.password_current"
              type="password"
              placeholder="Current password"
              size="md"
              :disabled="true"
            />
            <UInput
              id="password_new"
              v-model="state.password_new"
              type="password"
              placeholder="New password"
              size="md"
              class="mt-2"
              :disabled="true"
            />
          </UFormField> -->
        </UPageCard>
      </UForm>

      <USeparator class="mb-4" />

      <UPageCard
        :title="$t('settings.general.deleteAccount.title')"
        :description="$t('settings.general.deleteAccount.description')"
      >
        <div>
          <UButton
            color="red"
            :label="$t('settings.general.deleteAccount.button')"
            size="md"
            @click="isDeleteAccountModalOpen = true"
          />
        </div>
      </UPageCard>

      <!-- ~/components/settings/DeleteAccountModal.vue -->
      <SettingsDeleteAccountModal v-model="isDeleteAccountModalOpen" />
    </template>
  </NuxtLayout>
</template>

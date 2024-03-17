<script setup lang="ts">
import Api from "~/api/api";
const { t } = useI18n();
const localePath = useLocalePath();
const model = defineModel({
  type: Boolean,
});

const toast = useToast();

const loading = ref(false);

function clearAllCookie() {
  var date = new Date();
  date.setTime(date.getTime() - 10000);
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (var i = keys.length; i--; )
      document.cookie = keys[i] + "=0; expire=" + date.toString() + "; path=/";
  }
}

function onDelete() {
  loading.value = true;

  Api.delete()
    .then(() => {
      loading.value = false;
      toast.add({ title: t("settings.deleteAccountModal.success") });
      clearAllCookie();
      navigateTo(localePath("/"));
    })
    .catch(() => {
      loading.value = false;
      toast.add({
        title: t("settings.deleteAccountModal.failed"),
        color: "red",
      });
    });
}
</script>

<template>
  <UDashboardModal
    v-model="model"
    :title="$t('settings.deleteAccountModal.dashboardModal.title')"
    :description="$t('settings.deleteAccountModal.dashboardModal.description')"
    icon="i-heroicons-exclamation-circle"
    prevent-close
    :close-button="null"
    :ui="{
      icon: {
        base: 'text-red-500 dark:text-red-400'
      } as any,
      footer: {
        base: 'ml-16'
      } as any
    }"
  >
    <template #footer>
      <UButton
        color="red"
        label="Delete"
        :loading="loading"
        @click="onDelete"
      />
      <UButton color="white" label="Cancel" @click="model = false" />
    </template>
  </UDashboardModal>
</template>

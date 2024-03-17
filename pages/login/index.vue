<template>
  <view class="body">
    <UCard class="max-w-sm w-full">
      <UAuthForm
        :fields="fields"
        :validate="validate"
        :title="$t('login.authform.title')"
        align="top"
        icon="i-heroicons-lock-closed"
        :ui="{ base: 'text-center', footer: 'text-center' }"
        @submit="onSubmit"
        :loading="loading"
      >
        <template #description>
          {{ $t("login.authform.description") }}
          <NuxtLinkLocale to="/" class="font-medium">{{
            $t("login.authform.goaway")
          }}</NuxtLinkLocale
          >.
        </template>

        <template #password-hint>
          <NuxtLink
            target="_blank"
            to="http://service2.swu.edu.cn/selfservice/module/userself/web/password_retrieve.jsf"
            class="text-primary font-medium"
          >
            {{ $t("login.authform.forgot") }}
          </NuxtLink>
        </template>

        <template #footer>
          {{ $t("login.authform.footer") }}
          <NuxtLinkLocale to="/" class="text-primary font-medium">
            {{ $t("login.authform.terms") }} </NuxtLinkLocale
          >.
        </template>
      </UAuthForm>
    </UCard>
  </view>
</template>

<script setup lang="ts">
import type { FormError } from "#ui/types";
const { t } = useI18n();
const localePath = useLocalePath();

const session_tokenCookie = useCookie("session_token", { readonly: true });
if (
  session_tokenCookie.value != "" &&
  session_tokenCookie.value != null &&
  session_tokenCookie.value != undefined
) {
  navigateTo(localePath("/dashboard"));
}

const loading = ref(false);
const toast = useToast();

const fields = [
  {
    name: "username",
    label: t("login.authform.fields.account.label"),
    type: "text",
    placeholder: t("login.authform.fields.account.placeholder"),
  },
  {
    name: "password",
    label: t("login.authform.fields.password.label"),
    type: "password",
    placeholder: t("login.authform.fields.password.placeholder"),
  },
];

const validate = (state: any) => {
  const errors: FormError[] = [];
  if (!state.username)
    errors.push({ path: "username", message: t("login.authform.validate.username") });
  if (!state.password)
    errors.push({ path: "password", message: t("login.authform.validate.password") });
  return errors;
};

import Api from "~/api/api";

const onSubmit = (data: any) => {
  loading.value = true;
  Api.register(data)
    .then((res: any) => {
      if (res.data.code === 0x0) {
        toast.add({ title: t("login.submit.success") });
        navigateTo(localePath("/dashboard"));
      } else {
        toast.add({
          title: t("login.submit.failed"),
          color: "red",
        });
      }
      loading.value = false;
    })
    .catch(() => {
      loading.value = false;
      toast.add({
        title: t("login.submit.failed"),
        color: "red",
      });
    });
};
</script>

<style lang="scss">
.body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
}
</style>

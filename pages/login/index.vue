<template>
  <view class="body">
    <UCard class="max-w-sm w-full">
      <UAuthForm
        :fields="fields"
        :validate="validate"
        title="Welcome back!"
        align="top"
        icon="i-heroicons-lock-closed"
        :ui="{ base: 'text-center', footer: 'text-center' }"
        @submit="onSubmit"
        :loading="loading"
      >
        <template #description>
          Don't have an account?
          <NuxtLink to="/" class="font-medium">Go away</NuxtLink>.
        </template>

        <template #password-hint>
          <NuxtLink
            target="_blank"
            to="http://service2.swu.edu.cn/selfservice/module/userself/web/password_retrieve.jsf"
            class="text-primary font-medium"
          >
            Forgot password?
          </NuxtLink>
        </template>

        <template #footer>
          By signing in, you agree to our
          <NuxtLink to="/" class="text-primary font-medium">
            Terms of Service </NuxtLink
          >.
        </template>
      </UAuthForm>
    </UCard>
  </view>
</template>

<script setup lang="ts">
import type { FormError } from "#ui/types";

const loading = ref(false);
const toast = useToast();

const fields = [
  {
    name: "username",
    label: "School account",
    type: "text",
    placeholder: "Enter your account",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
];

const validate = (state: any) => {
  const errors: FormError[] = [];
  if (!state.username)
    errors.push({ path: "username", message: "Account is required" });
  if (!state.password)
    errors.push({ path: "password", message: "Password is required" });
  return errors;
};

import Api from "~/api/api";

const onSubmit = (data: any) => {
  loading.value = true;
  Api.register(data)
    .then((res: any) => {
      if (res.data.code === 0x0) {
        toast.add({ title: "Welcome back!" });
        navigateTo("/dashboard");
      } else {
        toast.add({
          title: "Login failed, Please check your accout or password!",
          color: "red",
        });
      }
      loading.value = false;
    })
    .catch(() => {
      loading.value = false;
      toast.add({
        title: "Login failed, Please check your accout or password!",
        color: "red",
      });
    });
};

onMounted(() => {
  const session_tokenCookie = useCookie("session_token", { readonly: true });
  if (
    session_tokenCookie.value != "" &&
    session_tokenCookie.value != null &&
    session_tokenCookie.value != undefined
  ) {
    navigateTo("/dashboard");
  }
});
</script>

<style lang="scss">
.body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
}
</style>

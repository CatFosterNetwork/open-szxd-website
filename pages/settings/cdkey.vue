<!--
 * Every line of code is my tear
 * Every tear is you
-->
<template>
  <NuxtLayout name="dashboard">
    <UDashboardPage>
      <UDashboardPanel grow>
        <UDashboardNavbar :title="t('layouts.dashboard.links.settings.children.cdkey')">
          <template #right>
            <switchLanguage />
          </template>
        </UDashboardNavbar>
        <UDashboardPanelContent>
          <activate :data="data" />
        </UDashboardPanelContent>
      </UDashboardPanel>
    </UDashboardPage>
  </NuxtLayout>
</template>

<script setup lang="ts">
import Api from "~/api/api";
import activate from "~/components/settings/activate.vue";

definePageMeta({
  colorMode: 'dark'
})

const { t } = useI18n();
const localePath = useLocalePath();


const { data } = await useAsyncData(
  async () => {
    const user = (await Api.profile()).data.data;
    return {
      username: user.username,
      avatar: user.avatar, 
      lerun_remained: user.is_vip
        ? '2333次' : user.lerun_remained ? `${user.lerun_remained}次` : t("No Subscription"),
      expiry_date: user.is_vip
        ? '2333/3/3'
        : user.expity_date ?  new Date(user.expiry_date).toLocaleDateString() : t("No Subscription")
    };
  },
  { server: false, watch: [] }
);
</script>

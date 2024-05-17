<script lang="ts" setup>
import Api from "~/api/api";

checkLogin();

const data = ref<string>("");
const serverUrl = ref<string>("ws://open.szxd.swu.social:23333");
const isConnect = ref<boolean>(false);
let ws: WebSocket;

const disconnect = () => {
  ws.close();
};

const connect = () => {
  ws = new WebSocket(serverUrl.value);
  ws.onopen = () => {
    console.log("连接成功");
    isConnect.value = true;
  };
  ws.onmessage = (e) => {
    console.log("收到消息", e.data);
    data.value = e.data;
    disconnect();
  };
  ws.onclose = () => {
    console.log("连接关闭");
    isConnect.value = false;
  };
  ws.onerror = () => {
    console.log("连接错误");
    isConnect.value = false;
  };
};

onMounted(() => {
  connect();
});
</script>

<template>
  <NuxtLayout name="dashboard">
    <UDashboardPage>
      <UDashboardPanel grow>
        <UDashboardNavbar title="LeRun" :badge="data?.length">
          <template #right>
            <!-- <UButton
            label="New user"
            trailing-icon="i-heroicons-plus"
            color="gray"
            @click="isNewUserModalOpen = true"
          /> -->
          </template>
        </UDashboardNavbar>
        <view class="flex justify-center items-center h-full">
          <NuxtImg
            :src="`data:image/png;base64,` + data"
            alt="LeRun"
            v-if="data.length"
          />
          <view class="font-bold text-2xl" v-else>暂无数据</view>
        </view>
      </UDashboardPanel>
    </UDashboardPage>
  </NuxtLayout>
</template>

<script lang="ts" setup>
checkLogin();

const base64 = ref<string>("");
const serverUrl = ref<string>("wss://open.szxd.swu.social:23333");
const isConnect = ref<boolean>(false);
let ws: WebSocket;
const theme = useColorMode().preference

const disconnect = () => {
  if (ws) {
    ws.close();
  }
};

const connect = () => {
  ws = new WebSocket(serverUrl.value);
  ws.onopen = () => {
    isConnect.value = true;
  };
  ws.onmessage = (e) => {
    base64.value = e.data;
    if (theme !== "dark") {
      processImageData(base64.value);
    }
    disconnect();
  };
  ws.onclose = () => {
    isConnect.value = false;
  };
  ws.onerror = () => {
    isConnect.value = false;
  };
};

const processImageData = (base64Data: string) => {
  const img = new Image();
  img.src = `data:image/png;base64,` + base64Data;

  img.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);

    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      // 替换黑色（0, 0, 0）为白色（255, 255, 255）
      if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0) {
        data[i] = 255;
        data[i + 1] = 255;
        data[i + 2] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);
    const updatedBase64 = canvas.toDataURL("image/png");
    // 更新图像数据
    base64.value = updatedBase64.replace("data:image/png;base64,", "");
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
        <UDashboardNavbar title="LeRun">
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
            :src="`data:image/png;base64,` + base64"
            alt="QR Code"
            v-if="base64.length"
          />
          <view class="font-bold text-2xl" v-else>{{
            $t("lerun.index.noData")
          }}</view>
        </view>
      </UDashboardPanel>
    </UDashboardPage>
  </NuxtLayout>
</template>

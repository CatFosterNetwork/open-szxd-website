<script lang="ts" setup>
checkLogin();

const base64 = ref<string>("");
const serverUrl = ref<string>("wss://open.szxd.swu.social");
const isConnected = ref<boolean>(false);
const transport = ref("N/A");
const theme = useColorMode().preference;
import { io } from "socket.io-client";

const socket = io(serverUrl.value, {
  transports: ["websocket"],
  reconnection: false,
  autoConnect: false,
});

if (socket.connected) {
  onConnect();
}

function onConnect() {
  isConnected.value = true;
  transport.value = socket.io.engine.transport.name;

  socket.io.engine.on("upgrade", (rawTransport) => {
    transport.value = rawTransport.name;
  });
}

function onDisconnect() {
  isConnected.value = false;
  transport.value = "N/A";
}

socket.on("connect", () => {
  isConnected.value = true;
  socket.emit("requestImage");
});

socket.on("disconnect", () => {
  isConnected.value = false;
});

socket.on("connect", onConnect);
socket.on("disconnect", onDisconnect);

socket.on("qrcode", (data: string) => {
  if (theme === "dark") {
    base64.value = data;
  } else {
    processImageData(data);
  }
  socket.disconnect();
});

onBeforeUnmount(() => {
  socket.off("connect", onConnect);
  socket.off("disconnect", onDisconnect);
});

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

    // 根据颜色模式处理图像
    if (theme === "dark") {
      for (let i = 0; i < data.length; i += 4) {
        // 替换白色（255, 255, 255）为黑色（0, 0, 0）
        if (data[i] === 255 && data[i + 1] === 255 && data[i + 2] === 255) {
          data[i] = 0;
          data[i + 1] = 0;
          data[i + 2] = 0;
        }
      }
    } else {
      for (let i = 0; i < data.length; i += 4) {
        // 替换黑色（0, 0, 0）为白色（255, 255, 255）
        if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0) {
          data[i] = 255;
          data[i + 1] = 255;
          data[i + 2] = 255;
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
    const updatedBase64 = canvas.toDataURL("image/png");
    // 更新图像数据
    base64.value = updatedBase64.replace("data:image/png;base64,", "");
  };
};

const connectSocket = () => {
  socket.connect();
};

onMounted(() => {
  connectSocket();
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

<script lang="ts" setup>
import Api from "~/api/api";
checkLogin();

const base64 = ref<string>("");
const serverUrl = ref<string>("wss://open.szxd.swu.social/api");
const theme = useColorMode().preference;
const progress = ref<number | null>(null);
const { t } = useI18n();
const start = ref(false);
const steps = [
  t("lerun.index.step1"),
  t("lerun.index.step2"),
  t("lerun.index.step3"),
  t("lerun.index.step4"),
  t("lerun.index.step5"),
  t("lerun.index.step6"),
];
const isRequestSend = ref(false);
const isRequestComplete = ref(false);
const user = ref<any>({});
const status = ref();

const now = new Date();
if (now.getHours() < 6 || now.getHours() > 23) {
  status.value = -1;
}

const { pending } = await useAsyncData<void>(
  async () => {
    const res = await Api.profile();
    user.value = res.data.data;
    Api.lerunStatus().then((res) => {
      if (res.data) {
        status.value = res.data.data;
      }
    });
  },
  { server: false, watch: [] }
);

import { io } from "socket.io-client";

const socket = io(serverUrl.value, {
  transports: ["websocket"],
  path: "/api/socket.io",
  reconnection: true,
  autoConnect: true,
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

// 定义缓慢增加 progress 的函数
const simulateProgress = () => {
  const interval = setInterval(() => {
    if (progress.value !== null) {
      const target = progress.value + 0.9;
      if (progress.value < target) {
        progress.value += 0.01;
        if (progress.value > target) {
          progress.value = target;
        }
      } else {
        clearInterval(interval);
      }
    }
  }, 100); // 每 100 毫秒增加一次
};

const startLerun = () => {
  start.value = true;
  status.value = 0;
  socket.connect();
  socket.on("ping", () => {
    progress.value = 0;
    simulateProgress();
  });
  socket.on("connect", () => {
    progress.value = 1;
    simulateProgress();
    const session_tokenCookie = useCookie<string>("session_token", {
      readonly: true,
    });
    socket.emit("create", { id: user.value.id, token: session_tokenCookie.value });
  });
  socket.on("createVM", () => {
    progress.value = 2;
    simulateProgress();
  });

  socket.on("VMcreated", () => {
    progress.value = 3;
    simulateProgress();
  });

  socket.on("qrcode", (res: string) => {
    progress.value = 4;
    simulateProgress();
    base64.value = res;
    if (theme === "dark") {
      progress.value = 5;
      return;
    } else {
      processImageData(res);
    }
    progress.value = 5;
  });

  socket.on("requestSend", () => {
    isRequestSend.value = true;
  });

  socket.on("requestComplete", () => {
    isRequestComplete.value = true;
    socket.disconnect();
  });

  socket.on("error", (error: string) => {
    socket.disconnect();
  });
};
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
        <view
          v-if="status == 1"
          class="flex justify-center items-center h-full"
        >
          <view class="flex justify-center items-center h-full flex-col">
            <view class="font-bold text-4xl mb-10">
              {{ $t("lerun.index.ready") }}
            </view>
            <UButton
              color="primary"
              @click="startLerun"
              class="ml-2"
              v-if="!start"
              :disabled="start"
            >
              {{ $t("lerun.index.start") }}
            </UButton>
          </view>
        </view>
        <view
          v-else-if="status == 2"
          class="flex justify-center items-center h-full"
        >
          <view>
            <view class="font-bold text-2xl">
              {{ $t("lerun.index.inProgress") }}
            </view>
          </view>
        </view>
        <view
          v-else-if="status == 3"
          class="flex justify-center items-center h-full"
        >
          <view>
            <view class="font-bold text-2xl">
              {{ $t("lerun.index.completed") }}
            </view>
          </view>
        </view>
        <view v-else-if="status == -1">
          <view class="flex justify-center items-center h-full">
            <view class="font-bold text-2xl">
              {{ $t("lerun.index.outOfTime") }}
            </view>
          </view>
        </view>
        <view
          class="flex justify-center items-center h-full"
          v-else-if="status == 0"
        >
          <NuxtImg
            :src="`data:image/png;base64,` + base64"
            alt="QR Code"
            v-if="base64.length"
          />
          <view class="w-full mx-96" v-else>
            <view class="font-bold text-2xl">{{
              $t("lerun.index.noData")
            }}</view>
            <UProgress
              :value="progress"
              :max="steps"
              animation="carousel"
              indicator
              class="w-full mt-3"
            >
              <template #indicator="{ percent }">
                <div class="text-right" :style="{ width: `${percent}%` }">
                  <span v-if="progress == null || progress < 1">
                    <span class="text-red-500">
                      <UIcon name="i-mdi-connection" /> {{ steps[0] }}
                    </span>
                  </span>
                  <span v-else-if="progress < 2">
                    <span class="text-amber-500">
                      <UIcon name="i-mdi-ray-start" /> {{ steps[1] }}
                    </span>
                  </span>
                  <span v-else-if="progress < 3">
                    <span class="text-blue-500">
                      <UIcon name="i-mdi-progress-wrench" /> {{ steps[2] }}
                    </span>
                  </span>
                  <span v-else-if="progress < 4">
                    <span class="text-amber-500">
                      <UIcon name="i-mdi-nature-people" /> {{ steps[3] }}
                    </span>
                  </span>
                  <span v-else-if="progress < 5">
                    <span class="text-amber-500">
                      <UIcon name="i-clarity-music-note-solid" /> {{ steps[4] }}
                    </span>
                  </span>
                  <span v-else>
                    <span class="text-primary">
                      <UIcon name="i-mdi-check" /> {{ steps[5] }}
                    </span>
                  </span>
                </div>
              </template>
            </UProgress>
          </view>
        </view>
        <view
          class="flex justify-center items-center h-full content-center"
          v-else
        >
          <view class="mx-28">
            <view class="font-bold text-4xl italic">
              {{ $t("lerun.index.na") }}
            </view>
          </view>
        </view>
      </UDashboardPanel>
    </UDashboardPage>
  </NuxtLayout>
</template>

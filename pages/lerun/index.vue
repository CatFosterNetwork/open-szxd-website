<script lang="ts" setup>
import Api from "~/api/api";
checkLogin();

const base64 = ref<string>("");
const serverUrl = ref<string>("wss://open.szxd.swu.social/api");
const theme = useColorMode().value;
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
const requestComplete = ref(false);
const isRequestComplete = ref(false);
const isLoggedIn = ref(false);
const isConnected = ref(false);
const user = ref<any>({});
const status = ref();
const toast = useToast();
const WindowsError = ref<string>(t("lerun.index.loggingIn"));
const expire = ref(120);
const isMapShowed = ref(false);
const lerunData = ref<any>({});
const paceMin = ref(0);
const paceSec = ref(0);
const totalTime = ref(0);
const distance = ref(0);
const caloriesDesc = ref();
const caloriesUrl = ref("");
const isPaceShowed = ref(false);
const isDistanceShowed = ref(false);
const isCaloriesShowed = ref(false);
const isTimeShowed = ref(false);
const storedColorMode = ref("light");
const waiting = ref(1);

const socket = io(serverUrl.value, {
  transports: ["websocket"],
  path: "/api/socket.io",
  reconnection: true,
  autoConnect: false,
});

const color = computed(() => {
  switch (true) {
    case progress.value == 6:
      return "red";
    default:
      return "primary";
  }
});

const now = new Date();
if (now.getHours() < 6 || now.getHours() > 23) {
  status.value = -1;
}

const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

const showValues = async () => {
  await delay(700);
  isMapShowed.value = true;
  await delay(1000);

  isDistanceShowed.value = true;
  await delay(500);

  isTimeShowed.value = true;
  await delay(500);

  isPaceShowed.value = true;
  await delay(500);

  isCaloriesShowed.value = true;
  await delay(500);
};

const { pending } = await useAsyncData<void>(
  async () => {
    const res = await Api.profile();
    user.value = res.data.data;
    Api.lerunStatus().then((res) => {
      if (res.data) {
        if (res.data.data.status == 3) {
          status.value = 3;
          lerunData.value = res.data.data.record;
          totalTime.value = lerunData.value.time;
          distance.value = lerunData.value.distance;
          const paceInSeconds = totalTime.value / distance.value;
          paceMin.value = Math.floor(paceInSeconds / 60);
          paceSec.value = Math.floor(paceInSeconds % 60);
          caloriesDesc.value = lerunData.value.calDesc;
          caloriesUrl.value = lerunData.value.calUrl;
          showValues();
        } else {
          status.value = res.data.data;
        }
      }
    });
  },
  { server: false, watch: [] }
);

import { io } from "socket.io-client";

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
    if (theme == "dark" && storedColorMode.value == "dark") {
      for (let i = 0; i < data.length; i += 4) {
        const sum = data[i] + data[i + 1] + data[i + 2];
        if (sum < 384) {
          data[i] = 255;
          data[i + 1] = 255;
          data[i + 2] = 255;
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
    const updatedBase64 = canvas.toDataURL("image/png");
    // 更新图像数据
    base64.value = updatedBase64;
  };
};

// 定义缓慢增加 progress 的函数
const simulateProgress = () => {
  if (progress.value !== null) {
    const target = progress.value + 0.9;
    const interval = setInterval(() => {
      if (progress.value && progress.value < target) {
        progress.value += 0.00015;
      } else {
        clearInterval(interval);
      }
    }, 1);
  }
};

const startLerun = () => {
  start.value = true;
  status.value = 0;
  // socket.connect();
  if (!socket.connected) {
    socket.connect();
  } else {
    socket.disconnect();
    base64.value = "";
    progress.value = null;
    isLoggedIn.value = false;
    socket.connect();
  }
  isConnected.value = true;

  const progressTimer = setTimeout(() => {
    start.value = false;
    progress.value = 6;
    toast.add({
      title: t("lerun.index.toastError"),
      color: "red",
    });
  }, 300000);

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
    socket.emit("create", {
      id: user.value.username,
      token: session_tokenCookie.value,
    });
  });

  socket.on("createVM", () => {
    progress.value = 2;
    simulateProgress();
  });

  socket.on("VMcreated", () => {
    progress.value = 3;
    simulateProgress();
  });

  socket.on("powerOn", () => {
    progress.value = 4;
    simulateProgress();
  });

  socket.on("searched", () => {
    WindowsError.value = t("lerun.index.searched");
    simulateProgress();
  });

  socket.on("loginLerun", () => {
    progress.value = 2;
    simulateProgress();
  });

  socket.on("catchWindowsDie", () => {
    WindowsError.value = t("lerun.index.windowsDie");
    toast.add({
      title: t("lerun.index.toastError"),
      color: "red",
    });
  });

  socket.on("qrcode", (res: any) => {
    progress.value = 5;
    simulateProgress();
    base64.value = res.data;
    processImageData(res.data);
    const timer = setInterval(() => {
      if (expire.value > 0) {
        expire.value -= 1;
      } else {
        clearInterval(timer);
      }
    }, 1000);
    clearTimeout(progressTimer);
  });

  socket.on("requestComplete", (res) => {
    status.value = 3;
    socket.disconnect();
    isConnected.value = false;
    requestComplete.value = true;
    lerunData.value = res.data.record;
    totalTime.value = lerunData.value.time;
    distance.value = lerunData.value.distance;
    const paceInSeconds = totalTime.value / distance.value;
    paceMin.value = Math.floor(paceInSeconds / 60);
    paceSec.value = Math.floor(paceInSeconds % 60);
    caloriesDesc.value = lerunData.value.calDesc;
    caloriesUrl.value = lerunData.value.calUrl;
    showValues();
  });

  socket.on("loggedIn", () => {
    WindowsError.value = t("lerun.index.loggingIn");
    isLoggedIn.value = true;
  });

  socket.on("openMiniProgram", () => {
    WindowsError.value = t("lerun.index.openMiniProgram");
  });

  socket.on("loginLerun", () => {
    WindowsError.value = t("lerun.index.loginLerun");
  });

  socket.on("disconnect", () => {
    isConnected.value = false;
  });

  socket.on("error", (error: string) => {
    progress.value = 6;
    isConnected.value = false;
    toast.add({
      title: t("lerun.index.toastError"),
      color: "red",
    });
  });

  socket.on("waiting", (num: any) => {
    waiting.value = num.data.data || 1;
  });

  socket.on("catchWindowsError", () => {
    WindowsError.value = t("lerun.index.windowsError");
  });
};

onMounted(() => {
  storedColorMode.value = localStorage.getItem("nuxt-color-mode") as string;
});

onUnmounted(() => {
  socket.disconnect();
});
</script>

<template>
  <NuxtLayout name="dashboard">
    <UDashboardPage>
      <UDashboardPanel grow>
        <UDashboardNavbar title="LeRun">
          <template #right>
            <view class="flex space-x-2">
              <UButton
                icon="i-mdi-refresh"
                @click="startLerun"
                v-if="status == 0"
              />
              <UButton
                icon="i-simple-icons-telegram"
                to="https://t.me/+kLfUSbSYh7M2ZjQ9"
                target="_blank"
              />
              <view class="flex font-bold text-2xl">
                {{ $t("lerun.index.waiting", { num: waiting }) }}
              </view>
            </view>
          </template>
        </UDashboardNavbar>
        <view v-auto-animate class="flex justify-center h-full">
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
            class="flex justify-center mt-4 h-full w-full"
            v-auto-animate
          >
            <view
              class="grid justify-center items-center h-full w-full grid-rows-2 grid-cols-1 lg:grid-cols-4 lg:grid-rows-1 lg:space-x-10"
            >
              <view class="lg:flex hidden" />
              <view
                class="flex flex-col justify-center items-center h-full w-full lg:w-5/6 mr-1 mb-2"
                v-auto-animate
              >
                <view
                  class="flex justify-center items-center font-bold text-4xl mb-3 w-full"
                >
                  {{ $t("lerun.index.completed") }}
                </view>
                <view v-if="isMapShowed" class="flex justify-center mt-2">
                  <NuxtImg
                    src="https://open.szxd.swu.social/playground_2nd.PNG"
                    alt="Map"
                  />
                </view>
              </view>
              <view
                class="flex flex-col justify-center items-center space-y-4 h-full w-full lg:w-5/6 ml-1"
                v-auto-animate
              >
                <view
                  class="flex justify-center items-center font-bold text-2xl mb-2 w-full"
                  v-if="isDistanceShowed"
                >
                  {{ $t("lerun.index.distance") }}: {{ distance }} km
                </view>
                <view
                  class="flex justify-center items-center font-bold text-2xl mb-2 w-full"
                  v-if="isTimeShowed"
                >
                  {{
                    $t("lerun.index.time", {
                      min: Math.floor(totalTime / 60),
                      sec: totalTime % 60,
                    })
                  }}
                </view>
                <view
                  class="flex justify-center items-center font-bold text-2xl mb-2 w-full"
                  v-if="isPaceShowed"
                >
                  {{ $t("lerun.index.pace") }}: {{ paceMin }}'{{ paceSec }}"
                </view>
                <view
                  class="flex space-x-2 justify-center items-center mb-2 w-full"
                  v-if="isCaloriesShowed"
                >
                  <view
                    class="flex justify-center items-center font-bold text-2xl mb-2"
                  >
                    {{ $t("lerun.index.calories") }} {{ caloriesDesc }}
                  </view>
                  <NuxtImg :src="caloriesUrl" alt="Calories" class="size-20" />
                </view>
              </view>
              <view class="lg:flex hidden" />
            </view>
          </view>
          <view
            v-else-if="status == -1"
            class="flex justify-center items-center h-full"
          >
            <view>
              <view class="font-bold text-2xl">
                {{ $t("lerun.index.outOfTime") }}
              </view>
            </view>
          </view>
          <view
            class="flex justify-center items-center h-full w-full"
            v-auto-animate
            v-else-if="status == 0"
          >
            <view
              v-if="base64.length && !isLoggedIn"
              class="flex flex-col justify-center items-center"
            >
              <NuxtImg :src="base64" alt="QR Code" class="size-80 mb-4" />
              <view class="font-bold text-2xl mt-5">
                {{ $t("lerun.index.scan", { expire: expire }) }}
              </view>
            </view>

            <view
              class="w-5/6 flex space-x-2 justify-center items-center flex-col"
              v-else-if="isLoggedIn"
            >
              <view
                class="flex space-x-2 justify-center items-center font-bold text-3xl animate-pulse mb-3"
                >{{ WindowsError }}</view
              >
              <div class="flex space-x-2 justify-center items-center mt-5">
                <div
                  class="h-8 w-8 dark:bg-white bg-black rounded-full animate-bounce [animation-delay:-0.3s]"
                ></div>
                <div
                  class="h-8 w-8 dark:bg-white bg-black rounded-full animate-bounce [animation-delay:-0.15s]"
                ></div>
                <div
                  class="h-8 w-8 dark:bg-white bg-black rounded-full animate-bounce"
                ></div>
              </div>
            </view>
            <view class="w-5/6" v-auto-animate v-else>
              <view
                class="font-bold text-3xl animate-pulse mb-3"
                v-if="progress == null || progress == 0"
                >{{ $t("lerun.index.noData") }}</view
              >
              <view
                class="font-bold text-3xl animate-pulse mb-3"
                v-else-if="progress < 2"
                >{{ $t("lerun.index.connecting") }}</view
              >
              <view
                class="font-bold text-3xl mb-3 text-red-500"
                v-else-if="progress == 6"
                >{{ $t("lerun.index.error") }}</view
              >
              <view class="font-bold text-3xl animate-pulse mb-3" v-else>{{
                $t("lerun.index.loading")
              }}</view>
              <UProgress
                :value="progress"
                :max="steps"
                animation="carousel"
                indicator
                class="w-full mt-3"
                :color="color"
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
                      <span class="text-primary-500">
                        <UIcon name="i-clarity-music-note-solid" />
                        {{ steps[4] }}
                      </span>
                    </span>
                    <span v-else-if="progress === 5">
                      <span class="text-primary">
                        <UIcon name="i-mdi-check" /> {{ steps[5] }}
                      </span>
                    </span>
                    <span v-else>
                      <span class="text-red-500">
                        <UIcon name="i-mdi-close" />
                        {{ $t("lerun.index.error") }}
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
        </view>
      </UDashboardPanel>
    </UDashboardPage>
  </NuxtLayout>
</template>

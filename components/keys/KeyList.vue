<script setup lang="ts">
import Api from "~/api/api";
const { t } = useI18n();

const types = ref<any>([]);
const valid_time = computed(() => {
  if (selected1.value == "打卡") {
    return ["一学期", "一学年", "永久"]
  } else if (selected1.value == "乐跑") {
    return ["1次", "10次", "20次"]
  } else if (selected1.value == "会员") {
    return ["基础会员", "高级会员"]
  }
})

const selected1 = ref("选择辅助类型");
const selected2 = ref("选择有效期");
const number = ref();

const toast = useToast();
const keys: any = ref([]);

const balance = ref(0);
const user = ref();

import { useClipboard } from "@vueuse/core";

function legacyCopy(value: string) {
  const ta = document.createElement("textarea");
  ta.value = value ?? "";
  ta.style.position = "absolute";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  ta.remove();
}

const submitModal = ref(false);

const calculateBalance = () => {
  if (
    !selected1.value ||
    !selected2.value ||
    !number.value ||
    number.value < 1 ||
    number.value > 1000 ||
    isNaN(number.value) ||
    selected1.value === "选择辅助类型" ||
    selected2.value === "选择有效期"
  ) {
    toast.add({ title: "请填写完整信息", color: "red" });
    return;
  }
  submitModal.value = true;
  if (selected1.value === "乐跑") {
    if (selected2.value === "1次") {
      balance.value = 1;
    } else if (selected2.value === "10次") {
      balance.value = 10;
    } else if (selected2.value === "20次") {
      balance.value = 20;
    } 
  } else if (selected1.value === "打卡") {
    if (selected2.value === "一学期") {
      balance.value = 10;
    } else if (selected2.value === "一学年") {
      balance.value = 20;
    } else if (selected2.value === "永久") {
      balance.value = 40;
    } 
  } else if (selected1.value === "会员") {
    if (selected2.value === "基础会员") {
      balance.value = 30;
    } else if (selected2.value === "高级会员") {
      balance.value = 128;
    }
  } else {
    balance.value = 9999999;
  }
  balance.value *= number.value;
  balance.value = Math.round(balance.value * ((100 - user.value.discount) / 100) * 100) / 100;
};

const onSubmit = () => {
  submitModal.value = false;
  if (user.value.balance < balance.value) {
    toast.add({ title: "余额不足", color: "red" });
    return;
  }
  if (
    !selected1.value ||
    !selected2.value ||
    !number.value ||
    number.value < 1 ||
    number.value > 1000 ||
    isNaN(number.value) ||
    selected1.value === "选择辅助类型" ||
    selected2.value === "选择有效期"
  ) {
    toast.add({ title: "请填写完整信息", color: "red" });
    return;
  }
  let valid_time = 0;
  if (["1天", "1次"].includes(selected2.value)) {
    valid_time = 1;
  } else if (selected2.value == "10次") {
    valid_time = 10;
  } else if (selected2.value == "20次") {
    valid_time = 20;
  } else if (selected2.value == "一学期") {
    valid_time = 5*30;
  } else if (selected2.value == "一学年") {
    valid_time = 365;
  } else if (selected2.value == "永久") {
    valid_time = 9999;
  } else if (selected2.value == "基础会员") {
    valid_time = 31;
  } else if (selected2.value == "高级会员") {
    valid_time = 366;
  } else {
    valid_time = 1;
  }
  user.value.balance -= balance.value;
  Api.generateKeys({
    type: selected1.value,
    valid_time: valid_time,
    number: number.value,
  }).then((res: any) => {
    if (res.data.code === 0x0) {
      keys.value = [];
      toast.add({ title: "生成成功" });
      for (let i = 0; i < res.data.data.length; i++) {
        keys.value.push(res.data.data[i].token);
      }
      // 假设res.data.data是你获取的带有多个token的数组
      let allTokens = ""; // 初始化一个空字符串来存储所有token
      res.data.data.forEach((tokenData: any) => {
        allTokens += tokenData.token + "\n"; // 将每个token追加到字符串中，每个token后添加换行符
      });

      // 将所有token保存到一个txt文件
      const blob = new Blob([allTokens], {
        type: "text/plain;charset=utf-8",
      });
      const time = new Date().getTime(); // 获取当前时间的毫秒数
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${time}-${number.value}-${selected1.value}-${selected2.value}.txt`; // 使用一些变量来构建文件名
      a.click();
      window.URL.revokeObjectURL(url); // 清除由createObjectURL创建的URL
    } else {
      toast.add({ title: "生成失败", color: "red" });
    }
  });
};

const copyKey = async (key: string) => {
  const { copy, copied, text, isSupported } = useClipboard({
    source: key,
  });
  if (isSupported.value) {
    await copy(key);
    toast.add({
      title: t("layouts.dashboard.footerLinks.inviteMsgCopied"),
      icon: "i-heroicons-check-circle",
    });
  } else {
    try {
      legacyCopy(key);
      toast.add({
        title: t("layouts.dashboard.footerLinks.inviteMsgCopied"),
        icon: "i-heroicons-check-circle",
      });
    } catch (e) {
      toast.add({
        title: t("layouts.dashboard.footerLinks.inviteMsgNotCopied"),
        icon: "i-heroicons-x-circle",
        color: "red",
      });
    }
  }
};

const { pending } = await useAsyncData<void>(
  async () => {
    const res = await Api.profile();
    user.value = res.data.data;
    if (user.value) {
      if (user.value.is_admin) {
        types.value.push("打卡");
        types.value.push("乐跑");
        types.value.push("会员")
      } else if (user.value.is_reseller) {
        
      }
    }
  },
  { server: false, watch: [] }
);
</script>

<template>
  <UDashboardPanelContent class="p-0">
    <div class="flex flex-col p-5">
      <view class="flex items-center justify-between">
        <view class="text-2xl font-bold">生成密钥</view>
        <view class="flex items-center">
          <view class="text-sm text-gray-500"
            >当前余额: {{ user?.balance }}</view
          >
          <view class="text-sm text-gray-500 ml-5">
            实付款: {{ 100 - user?.discount }}%
          </view>
        </view>
      </view>
      <view
        class="grid grid-cols-2 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-2"
      >
        <USelectMenu v-model="selected1" :options="types" />
        <USelectMenu v-model="selected2" :options="valid_time" />
      </view>
      <view class="flex flex-col mt-5">
        <UInput v-model="number" type="number" placeholder="输入数量" />
      </view>
      <div class="flex justify-center mt-5">
        <UButton color="primary" size="lg" @click="calculateBalance"
          >生成</UButton
        >
      </div>
      <UModal v-model="submitModal">
        <div class="p-4">
          <h2 class="text-lg font-semibold">确认生成</h2>
          <view class="mt-2"
            >您本次将生成
            <span class="font-bold primary">{{ number }}</span>
            个
            <span class="font-bold primary">{{ selected2 }} {{ selected1 }}</span>
            ，将会消耗
            <span class="font-bold primary">{{ balance }} 点余额</span>
            ，是否确认？</view
          >
          <div class="flex justify-end mt-4">
            <UButton color="gray" @click="submitModal = false">取消</UButton>
            <UButton color="primary" @click="onSubmit" class="ml-5"
              >确认</UButton
            >
          </div>
        </div>
      </UModal>

      <view class="flex-grow my-4">
        <UDashboardCard
          title="本次生成"
          description="生成后文件会自动下载"
          icon="i-heroicons-chart-bar"
        >
          <view
            v-for="key in keys"
            :key="key"
            class="flex items-center justify-between p-2"
          >
            <view>{{ key }}</view>
            <UButton color="gray" size="sm" @click="copyKey(key)" class="ml-5"
              >复制</UButton
            >
          </view>
        </UDashboardCard>
      </view>
    </div>

    <UDivider />
  </UDashboardPanelContent>
</template>

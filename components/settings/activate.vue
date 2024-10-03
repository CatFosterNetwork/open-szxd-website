<template>
  <view
    class="info space-y-4 flex flex-col rounded-lg w-full mx-auto"
  >
    <view class="promo-activation flex flex-col w-full">
      <view class="flex flex-row items-center justify-start">
        <Icon name="material-symbols:key-vertical" size="2rem" />
        <view class="text-2xl font-bold ml-2">
          {{ $t('settings.activate.activate_title') }}
        </view>
      </view>
      <div class="text-sm text-gray-500 mt-2 ml-2">
        {{ $t('settings.activate.activate') }}
      </div>
      <UInput v-model="key" :placeholder="$t('settings.activate.input_placeholder')" class="mt-4 w-full" />
      <UInput
        v-model="inviter_username"
        :placeholder="$t('settings.activate.inviter_placeholder')"
        class="mt-4"
      />
      <UButton :label="$t('settings.activate.activate_button')" @click="activate" class="mt-4 w-[10%] text-center justify-center items-center" />
    </view>
    <UDivider />
    <view class="subscriptions flex flex-col">
      <view class="flex flex-row items-center justify-start">
        <Icon name="ph:shopping-cart-fill" size="2rem" />
        <view class="text-2xl font-bold ml-2">{{ $t('settings.activate.subscription_info') }}</view>
      </view>
      <div class="text-sm text-gray-500 mt-2 ml-2">
        几次轻触，即达卓越
      </div>
      <view class="flex flex-col mt-4">
        <view class="flex items-center justify-between">
          <NuxtImg
            src="/swuLogo.png"
            width="48"
            height="48"
            alt="Open SZXD Logo"
            format="webp"
          />
          <div class="text-sm text-gray-500">
            {{ data?.lerun_remained || "No Subscription" }}
          </div>
        </view>

        <view class="flex items-center justify-between">
          <view class="mt-2 font-blod text-lg"
            >{{$t('settings.activate.lerun')}}</view
          >
        </view>
      </view>
      <view class="flex flex-col mt-4">
        <view class="flex items-center justify-between">
          <NuxtImg
            src="/swuLogo.png"
            width="48"
            height="48"
            alt="Open SZXD Logo"
            format="webp"
          />
          <div class="text-sm text-gray-500">
            {{ data?.expiry_date || "No Subscription" }}
          </div>
        </view>
        <view class="flex items-center justify-between">
          <view class="mt-2 font-blod text-lg"
            >
            {{$t('settings.activate.dingding')}}</view
          >
        </view>
      </view>
    </view>
    <UDivider />
    <view class="about">
      <Icon name="ph:info-fill" size="2rem" />
      <view class="text-2xl font-bold ml-2">{{ $t('settings.activate.about_us') }}</view>
      <div class="text-sm text-gray-500 mt-2 ml-2">
        {{ $t('settings.activate.feature') }}
      </div>
      <view class="flex flex-col mt-4">
        <view class="flex mt-2 font-blod text-lg ml-2">Open SZXD</view>
        <div class="text-sm text-gray-500 ml-2">
          {{ $t('settings.activate.desc') }}
        </div>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import Api from "~/api/api";

const key = ref("");
const inviter_username = ref("");
const toast = useToast();
const { t } = useI18n();

const activate = () => {
  Api.activate(key.value, inviter_username.value).then((res) => {
    if (res.data.code === 0x0) {
      toast.add({ title: t('settings.activate.activated_successfully') });
    } else {
      toast.add({ title: t("settings.activate.activated_fail"), color: "red" });
    }
  });
};

defineProps({
  data: Object as any,
});
</script>
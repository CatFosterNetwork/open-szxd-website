import { createSharedComposable } from "@vueuse/core";

const localePath = useLocalePath();

const _useDashboard = () => {
  const route = useRoute();
  const router = useRouter();
  const isHelpSlideoverOpen = ref(false);
  const isNotificationsSlideoverOpen = ref(false);

  defineShortcuts({
    "g-h": () => router.push(localePath("/")),
    "g-d": () => router.push(localePath("/dashboard")),
    "g-i": () => router.push(localePath("/inbox")),
    "g-u": () => router.push(localePath("/users")),
    "g-l": () => router.push(localePath("/lerun")),
    "g-f": () => router.push(localePath("/schedule")),
    "g-s": () => router.push(localePath("/settings")),
    "?": () => (isHelpSlideoverOpen.value = true),
    n: () => (isNotificationsSlideoverOpen.value = true),
  });

  watch(
    () => route.fullPath,
    () => {
      isHelpSlideoverOpen.value = false;
      isNotificationsSlideoverOpen.value = false;
    }
  );

  return {
    isHelpSlideoverOpen,
    isNotificationsSlideoverOpen,
  };
};

export const useDashboard = createSharedComposable(_useDashboard);

import { createSharedComposable } from "@vueuse/core";

const localePath = useLocalePath();

const _checkLogin = () => {
  const toast = useToast();
  const session_tokenCookie = useCookie<string>("session_token", {
    readonly: true,
  });
  if (
    !session_tokenCookie.value ||
    session_tokenCookie.value.length == 0 ||
    session_tokenCookie.value == "" ||
    session_tokenCookie.value == null
  ) {
    toast.add({ title: "Please login first", color: "red" });
    navigateTo(localePath("/login"));
  }
};

export const checkLogin = createSharedComposable(_checkLogin);

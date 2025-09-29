<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";

const emit = defineEmits(["close"]);

const state = reactive({
  role: "member",
  email: undefined,
});

// https://ui.nuxt.com/components/form
const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.email)
    errors.push({ name: "email", message: "Please enter an email." });
  return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data);

  emit("close");
}
</script>

<template>
  <UForm
    :validate="validate"
    :validate-on="['submit']"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormField label="Email" name="email">
      <UInput
        v-model="state.email"
        type="email"
        placeholder="john.doe@example.com"
        autofocus
      />
    </UFormField>

    <UFormField label="Role" name="role">
      <USelectMenu
        v-model="state.role"
        :items="['member', 'owner']"
        :ui-menu="{ select: 'capitalize', option: { base: 'capitalize' } }"
      />
    </UFormField>

    <div class="flex justify-end gap-3">
      <UButton
        label="Cancel"
        color="neutral"
        variant="ghost"
        @click="emit('close')"
      />
      <UButton type="submit" label="Save" color="neutral" />
    </div>
  </UForm>
</template>

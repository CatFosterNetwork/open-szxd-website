<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";

const emit = defineEmits(["close"]);

const state = reactive({
  name: undefined,
  email: undefined,
});

// https://ui.nuxt.com/components/form
const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.name)
    errors.push({ name: "name", message: "Please enter a name." });
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
    <UFormField label="Name" name="name">
      <UInput v-model="state.name" placeholder="John Doe" autofocus />
    </UFormField>

    <UFormField label="Email" name="email">
      <UInput
        v-model="state.email"
        type="email"
        placeholder="john.doe@example.com"
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

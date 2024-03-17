<script lang="ts" setup>
import type { Schedule } from "~/types";
import Api from "~/api/api";

const localePath = useLocalePath();

checkLogin();
const defaultColumns = [
  {
    key: "id",
    label: "#",
  },
  {
    key: "date",
    label: "Date",
    sortable: true,
  },
  {
    key: "location",
    label: "Location",
  },
  {
    key: "address",
    label: "Address",
  },
  {
    key: "status",
    label: "Status",
    sortable: true,
  },
];

const q = ref("");
const selected = ref<Schedule[]>([]);
const selectedColumns = ref(defaultColumns);
const selectedStatuses = ref([]);
const selectedLocations = ref([]);
const sort = ref({ column: "id", direction: "asc" as const });
const input = ref<{ input: HTMLInputElement }>();
const isNewUserModalOpen = ref(false);

const columns = computed(() =>
  defaultColumns.filter((column) => selectedColumns.value.includes(column))
);

const query = {
  q: q.value,
  statuses: selectedStatuses.value,
  locations: selectedLocations.value,
  sort: sort.value.column,
  order: sort.value.direction,
};

const { data, pending } = await useAsyncData<Schedule[]>(
  async () => {
    const res = await Api.checkinList(query);
    res.data.data.forEach((item: any, index: number) => {
      item.id = index + 1;
    });
    res.data.data.forEach((item: any) => {
      item.date = new Date(item.date).toLocaleDateString();
      item.status =
        item.status === -1
          ? "Not Clocked In"
          : item.status === 0
          ? "Manually Checked In"
          : item.status === 1
          ? "Auto Checked In"
          : "No Need to Check In";
    });
    return res.data.data || [];
  },
  { server: false, watch: [q, selectedStatuses, selectedLocations, sort] }
);

const defaultLocations = data.value?.reduce((acc, user) => {
  if (!acc.includes(user.address)) {
    acc.push(user.address);
  }
  return acc;
}, [] as string[]);

const defaultStatuses = data.value?.reduce((acc, user) => {
  if (!acc.includes(user.status)) {
    acc.push(user.status);
  }
  return acc;
}, [] as string[]);

function onSelect(row: Schedule) {
  const index = selected.value.findIndex((item) => item.id === row.id);
  if (index === -1) {
    selected.value.push(row);
  } else {
    selected.value.splice(index, 1);
  }
}

defineShortcuts({
  "/": () => {
    input.value?.input?.focus();
  },
});

</script>

<template>
  <NuxtLayout name="dashboard">
    <UDashboardPage>
      <UDashboardPanel grow>
        <UDashboardNavbar title="Schedules" :badge="data?.length">
          <template #right>
            <UInput
              ref="input"
              v-model="q"
              icon="i-heroicons-funnel"
              autocomplete="off"
              placeholder="Filter schedules..."
              class="hidden lg:block"
              @keydown.esc="$event.target.blur()"
            >
              <template #trailing>
                <UKbd value="/" />
              </template>
            </UInput>

            <!-- <UButton
            label="New user"
            trailing-icon="i-heroicons-plus"
            color="gray"
            @click="isNewUserModalOpen = true"
          /> -->
          </template>
        </UDashboardNavbar>

        <UDashboardToolbar>
          <template #left>
            <USelectMenu
              v-model="selectedStatuses"
              icon="i-heroicons-check-circle"
              placeholder="Status"
              multiple
              :options="defaultStatuses"
              :ui-menu="{ option: { base: 'capitalize' } }"
            />
            <USelectMenu
              v-model="selectedLocations"
              icon="i-heroicons-map-pin"
              placeholder="Location"
              :options="defaultLocations"
              multiple
            />
          </template>

          <template #right>
            <USelectMenu
              v-model="selectedColumns"
              icon="i-heroicons-adjustments-horizontal-solid"
              :options="defaultColumns"
              multiple
              class="hidden lg:block"
            >
              <template #label> Display </template>
            </USelectMenu>
          </template>
        </UDashboardToolbar>

        <UDashboardModal
          v-model="isNewUserModalOpen"
          title="New user"
          description="Add a new user to your database"
          :ui="{ width: 'sm:max-w-md' }"
        >
          <!-- ~/components/users/UsersForm.vue -->
          <UsersForm @close="isNewUserModalOpen = false" />
        </UDashboardModal>

        <UTable
          v-model:sort="sort"
          :rows="data"
          :columns="columns"
          :loading="pending"
          sort-mode="manual"
          class="w-full"
          :ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }"
          @select="onSelect"
        >
          <template #location-data="{ row }">
            <div class="flex items-center gap-3">
              <span class="text-gray-900 dark:text-white font-medium">
                {{ row.longitude }} ,
              </span>

              <span class="text-gray-900 dark:text-white font-medium">
                {{ row.latitude }}
              </span>
            </div>
          </template>

          <template #status-data="{ row }">
            <UBadge
              :label="row.status"
              :color="
                row.status === 'No Need to Check In'
                  ? 'gray'
                  : row.status === 'Auto Checked In'
                  ? 'green'
                  : row.status === 'Manually Checked In'
                  ? 'orange'
                  : 'red'
              "
              variant="subtle"
              class="capitalize"
            />
          </template>
        </UTable>
      </UDashboardPanel>
    </UDashboardPage>
  </NuxtLayout>
</template>

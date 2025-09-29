<script setup lang="ts">
import Api from "~/api/api";
import KeyList from "~/components/keys/KeyList.vue";

checkLogin();

const { t } = useI18n();

let columns: any = [];

const selectedColumns = ref([...columns]);

const keys = ref([]);

const pageMode = ref(false);

const page = ref(1);
const pageCount = 12;

const pageKeys = computed(() => {
  return keys.value.slice((page.value - 1) * pageCount, page.value * pageCount);
});

const sort = ref<any>({
  column: "",
  direction: "",
});

const user = ref();

let resellers: any = [];
const selectedResellers = ref([...resellers]);

const selected: any = ref([]);

const q = ref("");

const toast = useToast();

const deleteKeys = async () => {
  for (let i = 0; i < selected.value.length; i++) {
    const res = await Api.deleteKeys(selected.value[i].id);
    if (res.data.code === 0x0) {
      toast.add({
        title: selected.value[i].token + "删除成功",
      });
    } else {
      toast.add({
        title: selected.value[i].token + "删除失败",
        color: "error",
      });
    }
  }
};

import { sub, format, isSameDay, type Duration } from "date-fns";

const ranges = [
  { label: "Last day", duration: { days: 1 } },
  { label: "Last 7 days", duration: { days: 7 } },
  { label: "Last 14 days", duration: { days: 14 } },
  { label: "Last 30 days", duration: { days: 30 } },
  { label: "Last 3 months", duration: { months: 3 } },
  { label: "Last 6 months", duration: { months: 6 } },
  { label: "Last year", duration: { years: 1 } },
];
const selected_date = ref({
  start: sub(new Date(), { days: 14 }),
  end: new Date(),
});

function isRangeSelected(duration: Duration) {
  return (
    isSameDay(selected_date.value.start, sub(new Date(), duration)) &&
    isSameDay(selected_date.value.end, new Date())
  );
}

function selectRange(duration: Duration) {
  selected_date.value = { start: sub(new Date(), duration), end: new Date() };
}

const { data, pending } = await useAsyncData(
  async () => {
    keys.value = [];
    columns = [];
    resellers = [];
    const res = await Api.keys();
    keys.value = res.data.data;
    keys.value.forEach((item: any) => {
      delete item.id;
      if (item.token_valid_time === 233) {
        item.token_valid_time = "小时卡";
      } else {
        item.token_valid_time += "天";
      }
      item.gmt_create = new Date(item.gmt_create).toLocaleString();
      item.gmt_modified = new Date(item.gmt_modified).toLocaleString();
    });
    columns.push(
      ...Object.keys(keys.value[0]).map((key) => ({
        key,
        label: key,
        sortable: true,
      }))
    );
    selectedColumns.value = [...columns];
    if (sort.value.column) {
      keys.value.sort((a: any, b: any) => {
        if (sort.value.direction === "asc") {
          return a[sort.value.column] > b[sort.value.column] ? 1 : -1;
        } else if (sort.value.direction === "desc") {
          return a[sort.value.column] < b[sort.value.column] ? 1 : -1;
        } else {
          return 0;
        }
      });
    }
    resellers.push(...new Set(keys.value.map((item: any) => item.reseller)));
    selectedResellers.value = [...resellers];
    const user_res = await Api.profile();
    user.value = user_res.data.data;
  },
  { server: false, watch: [sort] }
);

resellers.value = keys.value.map((item: any) => item.reseller);

const filteredRows = computed(() => {
  const usedKeys = pageMode.value ? pageKeys.value : keys.value;

  if (!q.value && !selectedResellers.value.length && !selected_date.value.start) {
    return usedKeys;
  }


  return usedKeys.filter((person: any) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase());
    });
  });

  if (!q.value) {
    qKeys = usedKeys;
  }

  let rKeys = qKeys.filter((person: any) => {
    return selectedResellers.value.includes(person.reseller);
  });

  console.log("rKeys" + rKeys);

  return rKeys.filter((time: any) => {
    return (
      time.gmt_create >= selected_date.value.start &&
      time.gmt_create <= selected_date.value.end
    );
  });
});

const changeSort = (column: any) => {
  if (sort.value.column === column) {
    sort.value.direction =
      sort.value.direction === "asc"
        ? "desc"
        : sort.value.direction === "desc"
        ? ""
        : "asc";
  } else {
    sort.value.column = column;
    sort.value.direction = "asc";
  }
};

const print = () => {
  console.log(filteredRows.value);
};
</script>

<template>
  <NuxtLayout name="dashboard">
    <UDashboardPage>
      <UDashboardPanel
        id="genKeys"
        :width="400"
        :resizable="{ min: 300, max: 500 }"
      >
        <UDashboardNavbar title="Keys">
          <template #right>
            <!-- <UTabs
              v-model="selectedTab"
              :items="tabItems"
              :ui="{
                wrapper: '',
                list: {
                  height: 'h-9',
                  tab: { height: 'h-7', size: 'text-[13px]' },
                },
              }"
            /> -->
            <UButton
              color="primary"
              @click="print"
              class="ml-5"
              >打印</UButton
            >
          </template>
        </UDashboardNavbar>

        <!-- ~/components/keys/KeysList.vue -->
        <KeyList />
      </UDashboardPanel>

      <UDashboardPanel id="keys" class="flex-1 min-w-[600px]">
        <div class="flex flex-col w-full h-full">
          <div
            class="flex items-center justify-between px-3 py-3.5 border-b border-gray-200 dark:border-gray-700"
          >
            激活码管理
          </div>
          <div
            class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700"
          >
            <UInput v-model="q" placeholder="任意匹配" />
            <div class="flex items-center mx-2">
              <div class="text-gray-500 dark:text-gray-400 mx-2">分页模式</div>
              <USwitch v-model="pageMode" :loading="pending" />
            </div>
            <USelectMenu
              v-model="selectedColumns"
              :items="columns"
              multiple
              class="ml-5 w-40"
            >
              <template #label>
                <span>选择查看</span>
              </template>
            </USelectMenu>
            <UButton
              color="primary"
              class="ml-5"
              @click="deleteKeys"
              :disabled="selected.length === 0"
              v-if="user && user.is_admin"
              >删除卡密</UButton
            >
          </div>
          <UTable
            :rows="filteredRows"
            :loading="pending"
            :columns="selectedColumns"
            v-model="selected"
            v-model:sort="sort"
            sort-mode="manual"
          >
            <template #reseller-header="{ column }">
              <view class="flex items-center space-x-2 w-full">
                <USelectMenu
                  multiple
                  :items="resellers"
                  searchable
                  searchable-placeholder="匹配查找"
                  class="w-full lg:w-48"
                  placeholder="reseller"
                  v-model="selectedResellers"
                />
                <UButton
                  v-if="column.sortable"
                  :icon="
                    !sort.column ||
                    sort.column !== column.key ||
                    (sort.direction !== 'asc' && sort.direction !== 'desc')
                      ? 'i-heroicons-sparkles-20-solid'
                      : sort.direction === 'asc'
                      ? 'i-heroicons-arrow-up-20-solid'
                      : 'i-heroicons-arrow-down-20-solid'
                  "
                  size="2xs"
                  color="neutral"
                  square
                  variant="solid"
                  @click="changeSort(column.key)"
                />
              </view>
            </template>
            <template #gmt_create-header="{ column }">
              <view class="flex items-center space-x-2 w-full">
                <UPopover :popper="{ placement: 'bottom-start' }">
                  <UButton
                    icon="i-heroicons-calendar-days-20-solid"
                    color="neutral"
                    variant="outline"
                  >
                    {{ format(selected_date.start, "d MMM, yyy") }} -
                    {{ format(selected_date.end, "d MMM, yyy") }}
                  </UButton>
                  <template #panel="{ close }">
                    <div
                      class="flex items-center sm:divide-x divide-gray-200 dark:divide-gray-800"
                    >
                      <div class="hidden sm:flex flex-col py-4">
                        <UButton
                          v-for="(range, index) in ranges"
                          :key="index"
                          :label="range.label"
                          color="neutral"
                          variant="ghost"
                          class="rounded-none px-6"
                          :class="[
                            isRangeSelected(range.duration)
                              ? 'bg-gray-100 dark:bg-gray-800'
                              : 'hover:bg-gray-50 dark:hover:bg-gray-800/50',
                          ]"
                          truncate
                          @click="selectRange(range.duration)"
                        />
                      </div>

                      <DatePicker v-model="selected_date" @close="close" />
                    </div>
                  </template>
                </UPopover>
                <UButton
                  v-if="column.sortable"
                  :icon="
                    !sort.column ||
                    sort.column !== column.key ||
                    (sort.direction !== 'asc' && sort.direction !== 'desc')
                      ? 'i-heroicons-sparkles-20-solid'
                      : sort.direction === 'asc'
                      ? 'i-heroicons-arrow-up-20-solid'
                      : 'i-heroicons-arrow-down-20-solid'
                  "
                  size="2xs"
                  color="neutral"
                  square
                  variant="solid"
                  @click="changeSort(column.key)"
                />
              </view>
            </template>
          </UTable>
          <div
            class="flex px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
            v-if="pageMode"
          >
            <UPagination
              v-model="page"
              :page-count="pageCount"
              :total="keys.length"
            />
          </div>
        </div>
      </UDashboardPanel>

      <!-- </UDashboardPanel> -->
    </UDashboardPage>
  </NuxtLayout>
</template>

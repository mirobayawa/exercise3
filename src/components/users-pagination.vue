<template>
  <div class="p-5 space-x-5">
    <button class="rounded-xl border-2 border-indigo-300 px-10 py-3">Previous</button>
    <button class="rounded-xl border-2 border-indigo-300 px-10 py-3" @click="">Next</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue';
import { useQuery, useResult } from '@vue/apollo-composable';

export default defineComponent({
  name: 'UserList',
  props: {
    searchOptions: {
      type: Object as PropType<Record<string, any>>,
      default() {
        return { query: '', limit: 10 };
      },
    },
  },
});

</script>

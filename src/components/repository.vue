<template>
  <div class="border-2 rounded-xl shadow-md w-2/4 h-1/6 p-5 flex flex-col items-start
   cursor-pointer hover:border-indigo-300 space-y-2">
      <span class="text-xl font-bold">{{ repository.name }}</span>
      <span class="text-xl font-normal text-indigo-400">{{ repository.url }}</span>
      <span class="text-xl font-normal">{{ repository.description }}</span>
  </div>
</template>

<script lang="ts">
import { Repository } from '@/generated/graphql';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'RepositoryDetails',
  props: {
    repository: {
      type: Object as PropType<Repository>,
      required: true,
    },
  },
});
</script>

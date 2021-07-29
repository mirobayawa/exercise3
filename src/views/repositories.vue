<template>
  <div class="flex flex-col space-y-5 w-full h-full">
    <span class="text-3xl font-bold mt-2">Repository List</span>
    <span class="text-2xl font-semibold mt-2">{{ user.name }}</span>
    <RepositoryList :search-options="searchOptions"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import RepositoryList from '@/components/repository-list.vue';
import { useQuery, useResult } from '@vue/apollo-composable';
import { GET_USER } from '@/composables/use-query';

export default defineComponent({
  name: 'Repositories',
  components: {
    RepositoryList,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const searchOptions = reactive({
      login: props.id,
      first: 3,
      last: null,
      after: null,
      before: null,
    });
    const { result, loading, error } = useQuery(GET_USER, searchOptions);

    const user = useResult(
      result,
      [],
      (data) => data.user,
    );

    return {
      loading,
      error,
      user,
      searchOptions,
    };
  },
});
</script>

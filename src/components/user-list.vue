<template>
  <div class="text-xl font-semibold w-full h-full flex flex-col">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    User List
    <ul class="w-full mt-5 space-y-5">
      <li v-for="user in users" :key="user.node.id" class="flex justify-center">
        <UserDetails :user="user.node"/>
      </li>
    </ul>
    <div class="p-5 space-x-5">
      <button class="rounded-xl border-2 border-indigo-300 px-10 py-3" @click="previousPage">Previous</button>
      <button class="rounded-xl border-2 border-indigo-300 px-10 py-3" @click="nextPage">Next</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue';
import { useQuery, useResult } from '@vue/apollo-composable';
import { SEARCH_USERS } from '@/composables/use-query';
import UserDetails from '@/components/user.vue';
import { SearchOptions } from '@/interfaces/search-options';
import RouteNames from '@/enums/route-names';
import router from '@/router';

export default defineComponent({
  name: 'UserList',
  components: {
    UserDetails,
  },
  props: {
    searchOptions: {
      type: Object as PropType<SearchOptions>,
      default() {
        return {
          query: '',
          limit: 3,
          after: null,
          before: null,
        };
      },
    },
  },
  setup(props: { searchOptions: Record<string, any> }) {
    const { searchOptions } = toRefs(props);
    const {
      result, loading, error, fetchMore,
    } = useQuery(SEARCH_USERS, searchOptions);

    const users = useResult(
      result,
      [],
      (data) => data.search && data.search.edges,
    );

    function nextPage() {
      router.push({ name: RouteNames.Home, query: { after: result.value.search.pageInfo.endCursor } });
      fetchMore({
        variables: {
          after: result.value.search.pageInfo.endCursor,
          before: null,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newEdges = fetchMoreResult.search.edges;
          const { pageInfo } = fetchMoreResult.search;

          return newEdges.length ? {
            ...previousResult,
            search: {
              ...previousResult.search,
              // Concat edges
              edges: [
                ...newEdges,
              ],
              // Override with new pageInfo
              pageInfo,
            },
          } : previousResult;
        },
      });
    }

    function previousPage() {
      router.push({ name: RouteNames.Home, query: { before: result.value.search.pageInfo.startCursor } });
      fetchMore({
        variables: {
          after: null,
          before: result.value.search.pageInfo.startCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newEdges = fetchMoreResult.search.edges;
          const { pageInfo } = fetchMoreResult.search;

          return newEdges.length ? {
            ...previousResult,
            search: {
              ...previousResult.search,
              // Concat edges
              edges: [
                ...newEdges,
              ],
              // Override with new pageInfo
              pageInfo,
            },
          } : previousResult;
        },
      });
    }

    return {
      loading,
      error,
      users,
      nextPage,
      previousPage,
    };
  },
});
</script>

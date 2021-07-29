<template>
  <div class="text-4xl" v-if="loading">Loading...</div>
  <div class="text-4xl" v-else-if="error">{{ error }}</div>
  <div v-else>
    <ul class="w-full mt-5 space-y-5">
      <li v-for="repository in repos" :key="repository.node.id" class="flex justify-center">
        <RepositoryDetails :repository="repository.node"/>
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
import RepositoryDetails from '@/components/repository.vue';
import { useQuery, useResult } from '@vue/apollo-composable';
import { SEARCH_REPOS } from '@/composables/use-query';
import { SearchOptionsRepo } from '@/interfaces/search-options';
import router from '@/router';
import RouteNames from '@/enums/route-names';

export default defineComponent({
  name: 'RepositoryList',
  props: {
    searchOptions: {
      type: Object as PropType<SearchOptionsRepo>,
      default() {
        return {
          login: '',
          first: 3,
          last: null,
          after: null,
          before: null,
        };
      },
    },
  },
  components: {
    RepositoryDetails,
  },
  setup(props: { searchOptions: Record<string, any> }) {
    const { searchOptions } = toRefs(props);
    const {
      result, loading, error, fetchMore,
    } = useQuery(SEARCH_REPOS, searchOptions);

    const repos = useResult(
      result,
      [],
      (data) => data.repositoryOwner && data.repositoryOwner.repositories.edges
    );

    function nextPage() {
      router.push({ name: RouteNames.Repositories, query: {
        after: result.value.repositoryOwner.repositories.pageInfo.endCursor
        }
      });
      fetchMore({
        variables: {
          first: 3,
          last: null,
          after: result.value.repositoryOwner.repositories.pageInfo.endCursor,
          before: null,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newEdges = fetchMoreResult.repositoryOwner.repositories.edges;
          const { pageInfo } = fetchMoreResult.repositoryOwner.repositories;

          console.log(newEdges, previousResult);

          return newEdges.length ? {
            ...previousResult,
            repositoryOwner: {
              ...previousResult.repositoryOwner,
              repositories: {
                ...previousResult.repositoryOwner.repositories,
                edges: [
                  ...newEdges,
                ],
                pageInfo,
              },
            },
          } : previousResult;
        },
      });
    }

    function previousPage() {
      router.push({ name: RouteNames.Repositories, query: {
        before: result.value.repositoryOwner.repositories.pageInfo.start
        }
      });
      fetchMore({
        variables: {
          after: null,
          first: null,
          last: 3,
          before: result.value.repositoryOwner.repositories.pageInfo.startCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newEdges = fetchMoreResult.repositoryOwner.repositories.edges;
          const { pageInfo } = fetchMoreResult.repositoryOwner.repositories;

          console.log(newEdges, previousResult);

          return newEdges.length ? {
            ...previousResult,
            repositoryOwner: {
              ...previousResult.repositoryOwner,
              repositories: {
                ...previousResult.repositoryOwner.repositories,
                edges: [
                  ...newEdges,
                ],
                pageInfo,
              },
            },
          } : previousResult;
        },
      });
    }

    return {
      result,
      loading,
      error,
      repos,
      nextPage,
      previousPage,
    }
  },
});
</script>

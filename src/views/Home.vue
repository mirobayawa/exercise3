<template>
  <div class="flex flex-col space-y-5 w-full h-full">
    <span class="text-3xl font-bold mt-2">Find GitHub Users</span>
    <!-- Search Component -->
    <div class="w-full flex justify-center">
      <div class="flex space-x-5 border-2 rounded-xl shadow-md px-5 py-2 w-2/6
      border-indigo-300 outline-none">
        <svg fill="none" stroke="gray" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        viewBox="0 0 24 24" class="w-6 h-6">
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <input v-model="query" class="outline-none w-full rounded-lg px-2" type="text" placeholder="Search Users">
      </div>
      <button @click="search" class="ml-3 border-2 px-5 py-2 rounded-xl shadow-sm hover:border-indigo-300
       hover:text-indigo-400">Search</button>
    </div>
    <!-- User List Component -->
    <UserList :search-options="searchOptions"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import UserList from '@/components/user-list.vue';

export default defineComponent({
  name: 'Home',
  components: {
    UserList,
  },
  setup() {
    const query = ref('');
    const searchOptions = reactive({
      query: '',
      limit: 3,
      after: null,
      before: null,
    });

    function search() {
      searchOptions.query = query.value;
      console.log(searchOptions);
    }

    return {
      searchOptions,
      query,
      search,
    };
  },
});
</script>

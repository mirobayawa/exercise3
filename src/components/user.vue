<template>
  <div class="border-2 rounded-xl shadow-md w-2/4 h-44 p-3 flex items-start cursor-pointer hover:border-indigo-300" @click="toRepos(user.login)">
    <div class="flex flex-col w-2/5 h-full items-start ml-2">
      <img class=" h-20 w-20 p-2 rounded-full ring-2 ring-white" :src="user.avatarUrl" alt="" />
      <span class="mt-3">{{ user.name }}</span>
      <span class="font-light">{{ user.login }}</span>
    </div>
    <div class="flex flex-col w-8/12 h-full items-start space-y-2 ml-2">
      <span>Repositories: {{ user.repositories.totalCount }}</span>
      <span class="font-light">{{ user.bio }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import RouteNames from '@/enums/route-names';
import { User } from '@/generated/graphql';
import router from '@/router';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'UserDetails',
  props: {
    user: {
      type: Object as PropType<User>,
      required: true,
    },
  },
  setup(props) {
    const userDetails = (props.user);

    const toRepos = (id: string) => {
      console.log(id);
      router.push({ name: RouteNames.Repositories, params: { id } });
    };

    return {
      toRepos,
      userDetails,
    };
  },
});
</script>

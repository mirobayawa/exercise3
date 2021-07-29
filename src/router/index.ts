import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import RouteNames from '@/enums/route-names';
import Home from '../views/home.vue';
import Repositories from '../views/repositories.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: RouteNames.Home,
    component: Home,
  },
  {
    path: '/repositories/:id',
    name: RouteNames.Repositories,
    props: true,
    component: Repositories,
  },
  {
    path: '/:catchAll(.*)',
    component: () => import('../views/page-not-found.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

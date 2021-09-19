import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/swap',
    name: 'home',
    // component: Home,
  },
  {
    path: '/swap',
    name: 'swap',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Swap.vue'),
  },
  {
    path: '/pool',
    name: 'pool',
    props: { id: 'pool' },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Pool.vue'),
  },
  {
    path: '/bonus',
    name: 'bonus',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Bonus.vue'),
  },
  {
    path: '/hirePranay',
    name: 'hirePranay',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/HirePranay.vue'),
  },
  {
    path: '/:id',
    redirect: (to) => {
      const { params } = to;
      if (params.id === 'swap' || params.id === 'pool' || params.id === 'bonus' || params.id === 'hirePranay') {
        return '/:id';
      }
      return '/swap';
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

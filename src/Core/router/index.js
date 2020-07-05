import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from '@/Index/views/Index.vue';

import Critterpedia from '@/Critterpedia/views/Critterpedia.vue';
import Fish from '@/Critterpedia/views/Fish.vue';
import Bugs from '@/Critterpedia/views/Bugs';
import SeaCreatures from '@/Critterpedia/views/SeaCreatures';

import Fossils from '@/Fossils/views/Fossils.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Index,
  },
  {
    path: '/critterpedia',
    name: 'Critterpedia',
    component: Critterpedia,
    children: [
      {
        path: '',
        redirect: {
          name: 'Fish',
        },
      },
      {
        path: 'fish',
        name: 'Fish',
        component: Fish,
      },
      {
        path: 'bugs',
        name: 'Bugs',
        component: Bugs,
      },
      {
        path: 'sea-creatures',
        name: 'Sea Creatures',
        component: SeaCreatures,
      },
    ],
  },
  {
    path: '/fossils',
    name: 'Fossils',
    component: Fossils,
  },
];

const router = new VueRouter({
  routes,
  linkActiveClass: 'is-active',
  linkExactActiveClass: 'is-exact-active',
});

export default router;

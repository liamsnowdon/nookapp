import Vue from 'vue';
import VueRouter from 'vue-router';

import Critterpedia from 'Core/router/critterpedia';
import Fossils from 'Core/router/fossils';
import Sync from '@/Sync/views/Sync.vue';
import Index from 'Index/views/Index.vue';
import NotFound from 'Core/views/NotFound.vue';
import Checklist from 'Checklist/views/Checklist';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Index,
  },
  { ...Critterpedia },
  { ...Fossils },
  {
    path: '/sync',
    name: 'Sync',
    component: Sync,
  },
  {
    path: '/checklist',
    name: 'Checklist',
    component: Checklist,
  },
  {
    path: '*',
    name: 'Not Found',
    component: NotFound,
  },
];

const router = new VueRouter({
  routes,
  linkActiveClass: 'is-active',
  linkExactActiveClass: 'is-exact-active',
});

export default router;

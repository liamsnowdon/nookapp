import Vue from 'vue';
import VueRouter from 'vue-router';

import critterpedia from 'Core/router/critterpedia';
import fossils from 'Core/router/fossils';

import Index from 'Index/views/Index.vue';
import NotFound from 'Core/views/NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Index,
  },
  { ...critterpedia },
  { ...fossils },
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

import Vue from 'vue';
import VueRouter from 'vue-router';
import Fish from '../views/Fish.vue';
import Bugs from '../views/Bugs.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: {
      name: 'Fish',
    },
  },
  {
    path: '/fish',
    name: 'Fish',
    component: Fish,
  },
  {
    path: '/bugs',
    name: 'Bugs',
    component: Bugs,
  },
];

const router = new VueRouter({
  routes,
});

export default router;

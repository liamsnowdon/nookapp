import Vue from 'vue';
import VueRouter from 'vue-router';
import Fish from '../views/Fish.vue';
import Bugs from '../views/Bugs.vue';
import SeaCreatures from '../views/SeaCreatures.vue';

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
  {
    path: '/sea-creatures',
    name: 'Sea Creatures',
    component: SeaCreatures,
  },
];

const router = new VueRouter({
  routes,
  linkActiveClass: 'is-active',
  linkExactActiveClass: 'is-exact-active',
});

export default router;

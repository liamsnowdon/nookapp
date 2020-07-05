/* eslint-disable */

import Vue from 'vue';
import App from './App.vue';
import store from './Core/store';
import router from './Core/router';

Vue.config.productionTip = false;

Vue.filter('capitalize', function (value) {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

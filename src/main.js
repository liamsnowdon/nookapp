import Vue from 'vue';
import Toasted from 'vue-toasted';
import VueClipboard from 'vue-clipboard2';

import App from './App.vue';
import store from 'Core/store';
import router from 'Core/router';

import { TOAST_DEFAULTS } from 'Core/constants/ui';

Vue.config.productionTip = false;

Vue.use(Toasted);
Vue.use(VueClipboard);

// Filters
Vue.filter('capitalize', function (value) {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

// Global toasts
Vue.toasted.register('success',
  (payload) => {
    if (payload.message) {
      return payload.message;
    }

    return 'Success';
  },
  {
    ...TOAST_DEFAULTS,
    type: 'success',
    icon: 'check',
  },
);

Vue.toasted.register('error',
  (payload) => {
    if (payload.message) {
      return payload.message;
    }

    return 'Error';
  },
  {
    ...TOAST_DEFAULTS,
    type: 'error',
    icon: 'times',
  },
);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

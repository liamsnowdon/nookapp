<template>
  <div id="app">
    <div class="wrapper">
      <Navigation />

      <RouterView />

      <Footer />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { storageAvailable } from 'Core/helpers';
import { MODULE, MUTATIONS } from 'Core/constants/vuex';
import Navigation from 'Core/components/Navigation.vue';
import Footer from 'Core/components/Footer.vue';
import { STORAGE } from 'Core/constants/storage';

// App styles
import 'Core/scss/app.scss';

export default {
  name: 'App',

  components: {
    Navigation,
    Footer,
  },

  created () {
    this.checkDeviceForStorageApi();

    this.setDefaultSettingsFromLocalStorage();
  },

  computed: {
    ...mapState(MODULE, {
      isStorageAvailable: state => state.isStorageAvailable,
    }),
  },

  methods: {
    ...mapMutations(MODULE, [
      MUTATIONS.SET_IS_STORAGE_AVAILABLE,
      MUTATIONS.SET_SETTINGS_HEMISPHERE,
    ]),

    checkDeviceForStorageApi () {
      if (storageAvailable('localStorage')) {
        this.setIsStorageAvailable(true);
      } else {
        this.setIsStorageAvailable(false);
      }
    },

    setDefaultSettingsFromLocalStorage () {
      if (!this.isStorageAvailable) {
        return;
      }

      const hemisphere = localStorage.getItem(STORAGE.SETTINGS_HEMISPHERE);

      this.setSettingsHemisphere(hemisphere);
    },
  },
};
</script>

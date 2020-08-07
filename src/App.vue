<template>
  <div id="app">
    <Navigation />

    <RouterView />

    <Footer />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { storageAvailable } from 'Core/helpers';
import { MODULE, MUTATIONS } from 'Core/constants/vuex';
import Navigation from 'Core/components/Navigation.vue';
import Footer from 'Core/components/Footer.vue';
import Sync from 'Core/services/Sync';
import SyncApi from 'Core/api/SyncApi';

// App styles
import 'vue-multiselect/dist/vue-multiselect.min.css';
import 'Core/scss/app.scss';

export default {
  name: 'App',

  components: {
    Navigation,
    Footer,
  },

  created () {
    this.checkDeviceForStorageApi();

    this.setAppData();
  },

  computed: {
    ...mapState(MODULE, {
      isStorageAvailable: state => state.isStorageAvailable,
    }),
  },

  methods: {
    ...mapMutations(MODULE, [
      MUTATIONS.SET_IS_STORAGE_AVAILABLE,
      MUTATIONS.SET_LOADING_SYNC_SESSION,
    ]),

    checkDeviceForStorageApi () {
      if (storageAvailable('localStorage')) {
        this.setIsStorageAvailable(true);
      } else {
        this.setIsStorageAvailable(false);
      }
    },

    async setAppData () {
      if (!this.isStorageAvailable) {
        return;
      }

      const syncId = Sync.getSyncIdFromLocalStorage();

      if (syncId) {
        this.setLoadingSyncSession(true);

        const session = await SyncApi.get(syncId);

        Sync.setAppStateFromSyncSession(session.data.data);

        this.setLoadingSyncSession(false);
      } else {
        Sync.setAppStateFromLocalStorage();
      }
    },
  },
};
</script>

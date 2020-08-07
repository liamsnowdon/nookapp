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
import { MODULE as CRITTERPEDIA_MODULE, MUTATIONS as CRITTERPEDIA_MUTATIONS } from 'Critterpedia/constants/vuex';
import { MODULE as FOSSILS_MODULE, MUTATIONS as FOSSILS_MUTATIONS } from 'Fossils/constants/vuex';
import Navigation from 'Core/components/Navigation.vue';
import Footer from 'Core/components/Footer.vue';
import Sync from 'Core/services/Sync';

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
      MUTATIONS.SET_SETTINGS_HEMISPHERE,
      MUTATIONS.SET_SYNC_ID,
    ]),

    ...mapMutations(CRITTERPEDIA_MODULE, [
      CRITTERPEDIA_MUTATIONS.SET_DONATED_FISH,
      CRITTERPEDIA_MUTATIONS.SET_DONATED_BUGS,
      CRITTERPEDIA_MUTATIONS.SET_DONATED_SEA_CREATURES,
    ]),

    ...mapMutations(FOSSILS_MODULE, [
      FOSSILS_MUTATIONS.SET_DONATED_FOSSILS,
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
        const session = await Sync.getWithId(syncId);

        Sync.setAppStateFromSyncSession(session.data.data);
      } else {
        Sync.setAppStateFromLocalStorage();
      }
    },
  },
};
</script>

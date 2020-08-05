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
import { STORAGE } from 'Core/constants/storage';
import Sync from 'Core/api/Sync';
import Storage from 'Core/services/Storage';

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

      const syncId = localStorage.getItem(STORAGE.SYNC_ID);

      if (syncId) {
        const session = await this.getSyncSession(syncId);
        this.setAppDataFromSyncSession(session.data.data);
      } else {
        this.setAppDataFromLocalStorage();
      }
    },

    async getSyncSession (id) {
      // 9358d67b-33b3-4d40-b585-8c157995dea7
      return await Sync.get(id);
    },

    setAppDataFromLocalStorage () {
      const settings = Storage.getSettings();
      const critters = Storage.getDonatedCritters();
      const fossils = Storage.getDonatedFossils();

      this.setSettingsHemisphere(settings.hemisphere);

      this.setDonatedFish(critters.donatedFish || []);
      this.setDonatedBugs(critters.donatedBugs || []);
      this.setDonatedSeaCreatures(critters.donatedSeaCreatures || []);

      this.setDonatedFossils(fossils || []);
    },

    setAppDataFromSyncSession (session) {
      this.setSyncId(session.id);

      this.setDonatedBugs(session.data.donatedBugs || []);
      this.setDonatedFish(session.data.donatedFish || []);
      this.setDonatedSeaCreatures(session.data.donatedSeaCreatures || []);

      this.setDonatedFossils(session.data.donatedFossils || []);
    },
  },
};
</script>

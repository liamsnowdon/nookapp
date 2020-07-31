<template>
  <div>
    <Navigation />
    <SettingsModal />
    <QuickAddModal />
    <div class="wrapper">
      <RouterView />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { STORAGE } from 'Critterpedia/constants/storage';
import { MODULE as CORE_MODULE } from 'Core/constants/vuex';
import { MODULE as CRITTERPEDIA_MODULE, MUTATIONS as CRITTERPEDIA_MUTATIONS } from 'Critterpedia/constants/vuex';
import Navigation from 'Critterpedia/components/Navigation';
import SettingsModal from 'Critterpedia/components/SettingsModal';
import QuickAddModal from 'Critterpedia/components/QuickAddModal';

export default {
  name: 'Critterpedia',

  components: {
    Navigation,
    SettingsModal,
    QuickAddModal,
  },

  created () {
    this.setDonatedCrittersFromLocalStorage();
    this.setDefaultSettingsFromLocalStorage();
  },

  mounted () {
    document.querySelector('body').style.backgroundColor = '#f0e6b8';
  },

  destroyed () {
    document.querySelector('body').style.backgroundColor = '';
  },

  computed: {
    ...mapState(CORE_MODULE, {
      isStorageAvailable: state => state.isStorageAvailable,
    }),
  },

  methods: {
    ...mapMutations(CRITTERPEDIA_MODULE, [
      CRITTERPEDIA_MUTATIONS.SET_DONATED_FISH,
      CRITTERPEDIA_MUTATIONS.SET_DONATED_BUGS,
      CRITTERPEDIA_MUTATIONS.SET_DONATED_SEA_CREATURES,
      CRITTERPEDIA_MUTATIONS.SET_SETTINGS_HEMISPHERE,
    ]),

    setDonatedCrittersFromLocalStorage () {
      if (!this.isStorageAvailable) {
        return;
      }

      let donatedFish = localStorage.getItem(STORAGE.DONATED_FISH);
      let donatedBugs = localStorage.getItem(STORAGE.DONATED_BUGS);
      let donatedSeaCreatures = localStorage.getItem(STORAGE.DONATED_SEA_CREATURES);

      if (donatedFish) {
        donatedFish = donatedFish.split(',');
        donatedFish = donatedFish.map(fish => Number(fish));
        donatedFish.sort((a, b) => a - b);
      }

      if (donatedBugs) {
        donatedBugs = donatedBugs.split(',');
        donatedBugs = donatedBugs.map(bugs => Number(bugs));
        donatedBugs.sort((a, b) => a - b);
      }

      if (donatedSeaCreatures) {
        donatedSeaCreatures = donatedSeaCreatures.split(',');
        donatedSeaCreatures = donatedSeaCreatures.map(seaCreatures => Number(seaCreatures));
        donatedSeaCreatures.sort((a, b) => a - b);
      }

      this.setDonatedFish(donatedFish);
      this.setDonatedBugs(donatedBugs);
      this.setDonatedSeaCreatures(donatedSeaCreatures);
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

<style lang="scss" scoped>
  @import '@/Core/scss/_abstracts.scss';

  ::v-deep {
    .wrapper {
      background-color: $brown-medium;
    }

    .spinner {
      &::after {
        border: 6px solid $brown-darkest;
        border-color: $brown-darkest transparent $brown-darkest transparent;
      }
    }
  }
</style>

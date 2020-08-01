<template>
  <div>
    <Navigation />
    <QuickAddModal />

    <RouterView />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { STORAGE } from 'Critterpedia/constants/storage';
import { MODULE as CORE_MODULE, MUTATIONS as CORE_MUTATIONS } from 'Core/constants/vuex';
import { MODULE as CRITTERPEDIA_MODULE, MUTATIONS as CRITTERPEDIA_MUTATIONS } from 'Critterpedia/constants/vuex';
import Navigation from 'Critterpedia/components/Navigation';
import QuickAddModal from 'Critterpedia/components/QuickAddModal';

export default {
  name: 'Critterpedia',

  components: {
    Navigation,
    QuickAddModal,
  },

  created () {
    this.setDonatedCrittersFromLocalStorage();
  },

  mounted () {
    document.querySelector('body').classList.add('page-critterpedia');
  },

  destroyed () {
    document.querySelector('body').classList.remove('page-critterpedia');
  },

  computed: {
    ...mapState(CORE_MODULE, {
      isStorageAvailable: state => state.isStorageAvailable,
    }),
  },

  methods: {
    ...mapMutations(CORE_MODULE, [
      CORE_MUTATIONS.SET_SETTINGS_HEMISPHERE,
    ]),

    ...mapMutations(CRITTERPEDIA_MODULE, [
      CRITTERPEDIA_MUTATIONS.SET_DONATED_FISH,
      CRITTERPEDIA_MUTATIONS.SET_DONATED_BUGS,
      CRITTERPEDIA_MUTATIONS.SET_DONATED_SEA_CREATURES,
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
  },
};
</script>

<template>
  <div>
    <navigation />
    <settings-modal />
    <div class="wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { storageAvailable } from '../../Core/helpers';
import { STORAGE, VUEX_MUTATIONS, MODULE } from '../constants';
import Navigation from '../components/Navigation.vue';
import SettingsModal from '../components/SettingsModal.vue';

const { mapState, mapMutations } = createNamespacedHelpers(MODULE);

export default {
  name: 'Critterpedia',

  components: {
    Navigation,
    SettingsModal,
  },

  created () {
    this.checkDeviceForStorageApi();
    this.setCaughtCrittersFromLocalStorage();
  },

  computed: {
    ...mapState({
      isStorageAvailable: state => state.isStorageAvailable,
    }),
  },

  methods: {
    ...mapMutations([
      VUEX_MUTATIONS.SET_IS_STORAGE_AVAILABLE,
      VUEX_MUTATIONS.SET_CAUGHT_FISH,
      VUEX_MUTATIONS.SET_CAUGHT_BUGS,
      VUEX_MUTATIONS.SET_CAUGHT_SEA_CREATURES,
    ]),

    checkDeviceForStorageApi () {
      if (storageAvailable('localStorage')) {
        this.setIsStorageAvailable(true);
      } else {
        this.setIsStorageAvailable(false);
      }
    },

    setCaughtCrittersFromLocalStorage () {
      if (!this.isStorageAvailable) {
        return;
      }

      let caughtFish = localStorage.getItem(STORAGE.CAUGHT_FISH);
      let caughtBugs = localStorage.getItem(STORAGE.CAUGHT_BUGS);
      let caughtSeaCreatures = localStorage.getItem(STORAGE.CAUGHT_SEA_CREATURES);

      if (caughtFish) {
        caughtFish = caughtFish.split(',');
        caughtFish = caughtFish.map(fish => Number(fish));
        caughtFish.sort((a, b) => a - b);
      }

      if (caughtBugs) {
        caughtBugs = caughtBugs.split(',');
        caughtBugs = caughtBugs.map(bugs => Number(bugs));
        caughtBugs.sort((a, b) => a - b);
      }

      if (caughtSeaCreatures) {
        caughtSeaCreatures = caughtSeaCreatures.split(',');
        caughtSeaCreatures = caughtSeaCreatures.map(seaCreatures => Number(seaCreatures));
        caughtSeaCreatures.sort((a, b) => a - b);
      }

      this.setCaughtFish(caughtFish);
      this.setCaughtBugs(caughtBugs);
      this.setCaughtSeaCreatures(caughtSeaCreatures);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '@/Critterpedia/scss/_variables.scss';

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

<template>
  <div id="app">
    <Navigation />
    <SettingsModal />
    <QuickAddModal />
    <div class="wrapper">
      <RouterView />
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { storageAvailable } from 'Core/helpers';
import { STORAGE } from 'Critterpedia/constants/storage';
import { MODULE, MUTATIONS } from 'Critterpedia/constants/vuex';
import Navigation from 'Critterpedia/components/Navigation.vue';
import SettingsModal from 'Critterpedia/components/SettingsModal.vue';
import QuickAddModal from 'Critterpedia/components/QuickAddModal.vue';

const { mapState, mapMutations } = createNamespacedHelpers(MODULE);

export default {
  name: 'App',

  components: {
    Navigation,
    SettingsModal,
    QuickAddModal,
  },

  created () {
    this.checkDeviceForStorageApi();
    this.setDonatedCrittersFromLocalStorage();
    this.setDefaultSettingsFromLocalStorage();
  },

  computed: {
    ...mapState({
      isStorageAvailable: state => state.isStorageAvailable,
    }),
  },

  methods: {
    ...mapMutations([
      MUTATIONS.SET_IS_STORAGE_AVAILABLE,
      MUTATIONS.SET_DONATED_FISH,
      MUTATIONS.SET_DONATED_BUGS,
      MUTATIONS.SET_DONATED_SEA_CREATURES,
      MUTATIONS.SET_SETTINGS_HEMISPHERE,
    ]),

    checkDeviceForStorageApi () {
      if (storageAvailable('localStorage')) {
        this.setIsStorageAvailable(true);
      } else {
        this.setIsStorageAvailable(false);
      }
    },

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

<style lang="scss">
  @import 'Core/scss/_abstracts.scss';

  *,
  :before,
  ::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial Rounded MT Bold', Arial, sans-serif;
    -webkit-font-smoothing: subpixel-antialiased;
  }

  img {
    max-width: 100%;
    max-height: 100%;
    height: auto;
    width: auto;
  }

  hr {
    margin: 0;
  }

  h4,
  h5 {
    margin: 0 0 15px 0;
  }

  p {
    margin: 0 0 16px 0;
  }

  .text-center {
    text-align: center;
  }

  .wrapper {
    background-color: $brown-medium;
  }

  .cross {
    @extend %button-reset;
    position: relative;
    width: 32px;
    height: 32px;

    @include breakpoint(medium) {
      opacity: 0.3;

      &:hover {
        opacity: 1;
      }
    }

    &::before,
    &::after {
      position: absolute;
      top: 0;
      left: 15px;
      content: ' ';
      height: 33px;
      width: 4px;
      background-color: #333;
    }

    &::before {
      transform: rotate(45deg);
    }

    &::after {
      transform: rotate(-45deg);
    }
  }
</style>

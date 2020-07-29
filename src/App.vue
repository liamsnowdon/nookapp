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
import { storageAvailable } from './helpers';
import { STORAGE, VUEX_MUTATIONS } from './constants';
import Navigation from './components/Navigation.vue';
import SettingsModal from './components/SettingsModal.vue';
import QuickAddModal from './components/QuickAddModal.vue';

export default {
  name: 'App',

  components: {
    Navigation,
    SettingsModal,
    QuickAddModal,
  },

  created () {
    this.setIsStorageAvailable();
    this.setDonatedCrittersFromLocalStorage();
    this.setDefaultSettingsFromLocalStorage();
  },

  methods: {
    setIsStorageAvailable () {
      if (storageAvailable('localStorage')) {
        this.$store.commit(VUEX_MUTATIONS.SET_IS_STORAGE_AVAILABLE, true);
      } else {
        this.$store.commit(VUEX_MUTATIONS.SET_IS_STORAGE_AVAILABLE, false);
      }
    },

    setDonatedCrittersFromLocalStorage () {
      if (!this.$store.state.isStorageAvailable) {
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

      this.$store.commit(VUEX_MUTATIONS.SET_DONATED_FISH, donatedFish);
      this.$store.commit(VUEX_MUTATIONS.SET_DONATED_BUGS, donatedBugs);
      this.$store.commit(VUEX_MUTATIONS.SET_DONATED_SEA_CREATURES, donatedSeaCreatures);
    },

    setDefaultSettingsFromLocalStorage () {
      if (!this.$store.state.isStorageAvailable) {
        return;
      }

      const hemisphere = localStorage.getItem(STORAGE.SETTINGS_HEMISPHERE);

      this.$store.commit(VUEX_MUTATIONS.SET_SETTINGS_HEMISPHERE, hemisphere);
    },
  },
};
</script>

<style lang="scss">
  @import '@/scss/_abstracts.scss';

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

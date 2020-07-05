<template>
  <div id="app">
    <navigation />
    <settings-modal />
    <div class="wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
import { storageAvailable } from './helpers';
import { STORAGE, VUEX_MUTATIONS } from './constants';
import Navigation from './components/Navigation';
import SettingsModal from './components/SettingsModal';

export default {
  name: 'App',

  components: {
    Navigation,
    SettingsModal,
  },

  created () {
    this.setIsStorageAvailable();
    this.setCaughtCrittersFromLocalStorage();
  },

  methods: {
    setIsStorageAvailable () {
      if (storageAvailable('localStorage')) {
        this.$store.commit(VUEX_MUTATIONS.SET_IS_STORAGE_AVAILABLE, true);
      } else {
        this.$store.commit(VUEX_MUTATIONS.SET_IS_STORAGE_AVAILABLE, false);
      }
    },

    setCaughtCrittersFromLocalStorage () {
      if (!this.$store.state.isStorageAvailable) {
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

      this.$store.commit(VUEX_MUTATIONS.SET_CAUGHT_FISH, caughtFish);
      this.$store.commit(VUEX_MUTATIONS.SET_CAUGHT_BUGS, caughtBugs);
      this.$store.commit(VUEX_MUTATIONS.SET_CAUGHT_SEA_CREATURES, caughtSeaCreatures);
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

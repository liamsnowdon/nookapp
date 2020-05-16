<template>
  <div
    id="app"
    :class="`theme-${theme}`"
  >
    <navigation />
    <settings-modal />
    <router-view />
  </div>
</template>

<script>
import { storageAvailable } from './helpers';
import { STORAGE } from './constants';
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
    this.setDefaultSettingsFromLocalStorage();
  },

  computed: {
    theme () {
      return this.$store.state.settings.theme;
    },
  },

  methods: {
    setIsStorageAvailable () {
      if (storageAvailable('localStorage')) {
        this.$store.commit('setIsStorageAvailable', true);
      } else {
        this.$store.commit('setIsStorageAvailable', false);
      }
    },

    setCaughtCrittersFromLocalStorage () {
      if (!this.$store.state.isStorageAvailable) {
        return;
      }

      let caughtFish = localStorage.getItem(STORAGE.CAUGHT_FISH);
      let caughtBugs = localStorage.getItem(STORAGE.CAUGHT_BUGS);

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

      this.$store.commit('setCaughtFish', caughtFish);
      this.$store.commit('setCaughtBugs', caughtBugs);
    },

    setDefaultSettingsFromLocalStorage () {
      if (!this.$store.state.isStorageAvailable) {
        return;
      }

      const theme = localStorage.getItem(STORAGE.SETTINGS_THEME);

      this.$store.commit('setSettingsTheme', theme);
    },
  },
};
</script>

<style lang="scss">
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
</style>

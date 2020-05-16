<template>
  <div id="app">
    <navigation />
    <router-view />
  </div>
</template>

<script>
import { storageAvailable } from './helpers';
import { STORAGE } from './constants';
import Navigation from './components/Navigation';

export default {
  name: 'App',

  components: {
    Navigation,
  },

  created () {
    this.setCaughtCrittersFromLocalStorage();
  },

  methods: {
    setCaughtCrittersFromLocalStorage () {
      if (storageAvailable('localStorage')) {
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

        this.$store.commit('setIsStorageAvailable', true);
      } else {
        this.$store.commit('setIsStorageAvailable', false);
      }
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
    -webkit-font-smoothing: antialiased;
  }

  img {
    max-width: 100%;
    max-height: 100%;
    height: auto;
    width: auto;
  }
</style>

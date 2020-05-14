<template>
  <div id="app">
    <navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from './components/Navigation';

export default {
  name: 'App',

  components: {
    Navigation,
  },
};
</script>

<style lang="scss">
  body {
    font-family: 'Arial Rounded MT Bold', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  img {
    max-width: 100%;
    height: auto;
  }
</style>

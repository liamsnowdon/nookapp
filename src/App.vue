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
import { mapState, mapMutations } from 'vuex';
import { storageAvailable } from 'Core/helpers';
import { STORAGE } from 'Critterpedia/constants/storage';
import { MODULE as CORE_MODULE, MUTATIONS as CORE_MUTATIONS } from 'Core/constants/vuex';
import { MODULE as CRITTERPEDIA_MODULE, MUTATIONS as CRITTERPEDIA_MUTATIONS } from 'Critterpedia/constants/vuex';
import Navigation from 'Critterpedia/components/Navigation.vue';
import SettingsModal from 'Critterpedia/components/SettingsModal.vue';
import QuickAddModal from 'Critterpedia/components/QuickAddModal.vue';

export default {
  name: 'App',

  components: {
    Navigation,
    SettingsModal,
    QuickAddModal,
  },

  created () {
    document.querySelector('body').style.backgroundColor = '#f0e6b8';

    this.checkDeviceForStorageApi();
    this.setDonatedCrittersFromLocalStorage();
    this.setDefaultSettingsFromLocalStorage();
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
    ...mapMutations(CORE_MODULE, [
      CORE_MUTATIONS.SET_IS_STORAGE_AVAILABLE,
    ]),

    ...mapMutations(CRITTERPEDIA_MODULE, [
      CRITTERPEDIA_MUTATIONS.SET_DONATED_FISH,
      CRITTERPEDIA_MUTATIONS.SET_DONATED_BUGS,
      CRITTERPEDIA_MUTATIONS.SET_DONATED_SEA_CREATURES,
      CRITTERPEDIA_MUTATIONS.SET_SETTINGS_HEMISPHERE,
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
    font-family: 'Montserrat', Arial, sans-serif;
    line-height: 1.5;
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

  h1 {
    @include breakpoint(medium) {
      font-size: 32px;
    }

    margin: 0 0 20px 0;
    font-size: 2.5rem;
  }

  h2 {
    @include breakpoint(medium) {
      font-size: 28px
    }

    margin: 0 0 20px 0;
  }

  h3 {
    @include breakpoint(medium) {
      font-size: 24px;
    }

    margin: 0 0 18px 0;
  }

  h4 {
    @include breakpoint(medium) {
      font-size: 18px;
    }

    margin: 0 0 16px 0;
  }

  h5 {
    @include breakpoint(medium) {
      font-size: 16px;
    }

    margin: 0 0 16px 0;
  }

  p {
    margin: 0 0 16px 0;
  }

  .text-center {
    text-align: center;
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

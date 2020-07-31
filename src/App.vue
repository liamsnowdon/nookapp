<template>
  <div id="app">
    <div class="wrapper">
      <Navigation />
      <RouterView />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { storageAvailable } from 'Core/helpers';
import { MODULE, MUTATIONS } from 'Core/constants/vuex';
import Navigation from 'Core/components/Navigation.vue';

export default {
  name: 'App',

  components: {
    Navigation,
  },

  created () {
    this.checkDeviceForStorageApi();
  },

  computed: {
    ...mapState(MODULE, {
      isStorageAvailable: state => state.isStorageAvailable,
    }),
  },

  methods: {
    ...mapMutations(MODULE, [
      MUTATIONS.SET_IS_STORAGE_AVAILABLE,
    ]),

    checkDeviceForStorageApi () {
      if (storageAvailable('localStorage')) {
        this.setIsStorageAvailable(true);
      } else {
        this.setIsStorageAvailable(false);
      }
    },
  },
};
</script>

<style lang="scss">
  // todo move these styles into a .scss file?

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

  .list-reset {
    @extend %list-reset;
  }

  .mb-0 {
    margin-bottom: 0 !important;
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

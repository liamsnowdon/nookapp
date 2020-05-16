<template>
  <transition name="fade">
    <div class="modal-wrapper" v-if="isOpen">
      <div class="modal-overlay"></div>
      <div class="modal">
        <div class="modal__header">
          <h3>Settings</h3>
          <button class="cross" @click="close"></button>
        </div>
        <div class="modal__content">
          <template v-if="isStorageAvailable">
            <h4>General</h4>

            <input type="radio" id="light" value="light" v-model="theme" @change="onThemeChange">
            <label for="light">Light theme</label>
            <br>
            <input type="radio" id="dark" value="dark" v-model="theme" @change="onThemeChange">
            <label for="dark">Dark theme</label>

            <h4>Caught Critters</h4>
            <p>
              When you set a critter as "caught" using the checkbox, it will be saved on your device so when you come back
              later, it will remember. You can reset this here.
            </p>
            <button @click="resetCaughtBugs" :disabled="!hasCaughtBugs">Reset caught bugs</button>
            <button @click="resetCaughtFish" :disabled="!hasCaughtFish">Reset caught fish</button>
          </template>

          <template v-else>
            <p>Your browser does not support local storage, so some settings are not available to you.</p>
          </template>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'SettingsModal',

  data () {
    return {
      theme: 'light',
    };
  },

  mounted () {
    this.theme = this.$store.state.settings.theme;
  },

  computed: {
    isOpen () {
      return this.$store.state.settingsModalOpen;
    },

    hasCaughtFish () {
      return this.$store.getters.hasCaughtFish;
    },

    hasCaughtBugs () {
      return this.$store.getters.hasCaughtBugs;
    },

    isStorageAvailable () {
      return this.$store.state.isStorageAvailable;
    },
  },

  methods: {
    close () {
      this.$store.commit('setSettingsModalOpen', false);
    },

    onThemeChange () {
      this.$store.commit('setSettingsTheme', this.theme);
    },

    resetCaughtBugs () {
      const confirmation = confirm('Are you sure you want to reset your bugs progress? This cannot be undone.');

      if (!confirmation) {
        return;
      }

      this.$store.commit('clearCaughtBugs');
    },

    resetCaughtFish () {
      const confirmation = confirm('Are you sure you want to reset your fish progress? This cannot be undone.');

      if (!confirmation) {
        return;
      }

      this.$store.commit('clearCaughtFish');
    },
  },
};
</script>

<style lang="scss">
  @import '@/scss/_abstracts.scss';

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .modal-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
  }

  .modal {
    width: 100%;
    background-color: $brown-light;
    border-radius: 20px;
    overflow: hidden;
    z-index: 1;

    @include breakpoint(medium) {
      width: 50%;
    }

    @include breakpoint(medium, down) {
      height: 100%;
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      background-color: $brown-dark;

      h3 {
        margin: 0;
      }
    }

    &__content {
      padding: 20px;
    }
  }
</style>

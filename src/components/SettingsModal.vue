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
            <h4 style="margin: 0 0 20px 0;">Caught Critters</h4>
            <p>
              When you set a critter as "caught" using the checkbox, it will be saved on your device so when you come back
              later, it will remember. You can reset this here.
            </p>
            <button @click="resetCaughtBugs" :disabled="!hasCaughtBugs">Reset caught bugs</button>
            <button @click="resetCaughtFish" :disabled="!hasCaughtFish">Reset caught fish</button>
            <button @click="resetCaughtSeaCreatures" :disabled="!hasCaughtSeaCreatures">Reset caught sea creatures</button>
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
import { VUEX_MUTATIONS } from '../constants';

export default {
  name: 'SettingsModal',

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

    hasCaughtSeaCreatures () {
      return this.$store.getters.hasCaughtSeaCreatures;
    },

    isStorageAvailable () {
      return this.$store.state.isStorageAvailable;
    },
  },

  methods: {
    close () {
      this.$store.commit(VUEX_MUTATIONS.SET_SETTINGS_MODAL_OPEN, false);
    },

    resetCaughtBugs () {
      const confirmation = confirm('Are you sure you want to reset your bugs progress? This cannot be undone.');

      if (!confirmation) {
        return;
      }

      this.$store.commit(VUEX_MUTATIONS.CLEAR_CAUGHT_BUGS);
    },

    resetCaughtFish () {
      const confirmation = confirm('Are you sure you want to reset your fish progress? This cannot be undone.');

      if (!confirmation) {
        return;
      }

      this.$store.commit(VUEX_MUTATIONS.CLEAR_CAUGHT_FISH);
    },

    resetCaughtSeaCreatures () {
      const confirmation = confirm('Are you sure you want to reset your sea creatures progress? This cannot be undone.');

      if (!confirmation) {
        return;
      }

      this.$store.commit(VUEX_MUTATIONS.CLEAR_CAUGHT_SEA_CREATURES);
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

      button {
        &:not(:last-child) {
          margin-right: 10px;
        }
      }
    }
  }
</style>

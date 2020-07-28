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
            <div class="modal__section">
              <h4>Preferred Hemisphere</h4>
              <p>
                With a preferred hemisphere selected, there will be only one filter called "Months" instead of having one
                for northern hemisphere and one for southern hemisphere.
              </p>
              <p>
                The "Available now" filter will show all critters available in your selected hemisphere only. If none is
                selected, it will show critters available now in either of them.
              </p>

              <multiselect
                id="hemisphere"
                v-model="hemisphere"
                :options="hemisphereOptions"
                :searchable="false"
                :close-on-select="true"
                :show-labels="false"
                track-by="value"
                label="displayValue"
                @input="onHemisphereChange"
              />
            </div>

            <div class="modal__section">
              <h4>Caught Critters</h4>
              <p>
                When you set a critter as "caught" using the checkbox, it will be saved on your device so when you come back
                later, it will remember. You can reset this here.
              </p>
              <Button
                @click="resetCaughtBugs"
                :disabled="!hasCaughtBugs"
              >
                Reset caught bugs
              </Button>

              <Button
                @click="resetCaughtFish"
                :disabled="!hasCaughtFish"
              >
                Reset caught fish
              </Button>

              <Button
                @click="resetCaughtSeaCreatures"
                :disabled="!hasCaughtSeaCreatures"
              >
                Reset caught sea creatures
              </Button>
            </div>
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
import Multiselect from 'vue-multiselect';
import { SETTINGS, VUEX_MUTATIONS } from '../constants';
import Button from './Button.vue';

export default {
  name: 'SettingsModal',

  components: {
    Button,
    Multiselect,
  },

  data () {
    return {
      hemisphere: '',
      hemisphereOptions: [
        {
          displayValue: 'Northern',
          value: SETTINGS.HEMISPHERE_NORTHERN,
        },
        {
          displayValue: 'Southern',
          value: SETTINGS.HEMISPHERE_SOUTHERN,
        },
      ],
    };
  },

  mounted () {
    this.hemisphere = this.hemisphereOptions.find(option => option.value === this.$store.state.settings.hemisphere);
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

    onHemisphereChange () {
      this.$store.commit(VUEX_MUTATIONS.SET_SETTINGS_HEMISPHERE, this.hemisphere ? this.hemisphere.value : '');

      if (this.hemisphere === SETTINGS.HEMISPHERE_NORTHERN) {
        this.$store.commit(VUEX_MUTATIONS.SET_FILTERS_SOUTHERN_MONTHS_AVAILABLE, []);
      } else if (this.hemisphere === SETTINGS.HEMISPHERE_SOUTHERN) {
        this.$store.commit(VUEX_MUTATIONS.SET_FILTERS_NORTHERN_MONTHS_AVAILABLE, []);
      }
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

    &__section {
      &:not(:last-child) {
        margin-bottom: 25px;
      }
    }
  }
</style>

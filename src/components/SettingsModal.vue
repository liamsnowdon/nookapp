<template>
  <Modal
    ref="modal"
    :is-open="isOpen"
    @close="onClose"
  >
    <template #title>
      Settings
    </template>

    <template #content>
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

          <div class="buttons">
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
        </div>
      </template>

      <template v-else>
        <p>Your browser does not support local storage, so some settings are not available to you.</p>
      </template>
    </template>
  </Modal>
</template>

<script>
import Multiselect from 'vue-multiselect';
import { SETTINGS, VUEX_MUTATIONS } from '../constants';
import Button from './Button.vue';
import Modal from './Modal.vue';

export default {
  name: 'SettingsModal',

  components: {
    Modal,
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
    onClose () {
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

<style lang="scss" scoped>
  @import '@/scss/_abstracts.scss';

  .buttons {
    @include breakpoint(medium, down) {
      button {
        width: 100%;
        margin: 0 0 15px 0;
      }
    }

    @include breakpoint(medium) {
      button {
        &:not(:last-child) {
          margin-right: 10px;
        }
      }
    }
  }
</style>

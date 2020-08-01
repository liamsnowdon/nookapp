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
          <h4>Donated Critters</h4>
          <p>
            When you set a critter as "donated" using the checkbox, it will be saved on your device so when you come back
            later, it will remember. You can reset this here.
          </p>

          <div class="buttons">
            <Button
              @click="resetDonatedBugs"
              :disabled="!hasDonatedBugs"
            >
              Reset donated bugs
            </Button>

            <Button
              @click="resetDonatedFish"
              :disabled="!hasDonatedFish"
            >
              Reset donated fish
            </Button>

            <Button
              @click="resetDonatedSeaCreatures"
              :disabled="!hasDonatedSeaCreatures"
            >
              Reset donated sea creatures
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
import { mapState, mapGetters, mapMutations } from 'vuex';
import Multiselect from 'vue-multiselect';
import { SETTINGS } from 'Core/constants/settings';
import Button from 'Core/components/Button.vue';
import Modal from 'Core/components/Modal.vue';

import {
  MODULE as CORE_MODULE,
  MUTATIONS as CORE_MUTATIONS,
} from 'Core/constants/vuex';
import {
  MODULE as CRITTERPEDIA_MODULE,
  MUTATIONS as CRITTERPEDIA_MUTATIONS,
  GETTERS as CRITTERPEDIA_GETTERS,
} from 'Critterpedia/constants/vuex';

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
    this.hemisphere = this.hemisphereOptions.find(option => option.value === this.settings.hemisphere);
  },

  computed: {
    ...mapState(CORE_MODULE, {
      isStorageAvailable: state => state.isStorageAvailable,
      isOpen: state => state.settingsModalOpen,
      settings: state => state.settings,
    }),

    ...mapGetters(CRITTERPEDIA_MODULE, [
      CRITTERPEDIA_GETTERS.HAS_DONATED_FISH,
      CRITTERPEDIA_GETTERS.HAS_DONATED_BUGS,
      CRITTERPEDIA_GETTERS.HAS_DONATED_SEA_CREATURES,
    ]),
  },

  methods: {
    ...mapMutations(CORE_MODULE, [
      CORE_MUTATIONS.SET_SETTINGS_MODAL_OPEN,
      CORE_MUTATIONS.SET_SETTINGS_HEMISPHERE,
    ]),

    ...mapMutations(CRITTERPEDIA_MODULE, [
      CRITTERPEDIA_MUTATIONS.SET_QUICK_ADD_MODAL_OPEN,
      CRITTERPEDIA_MUTATIONS.CLEAR_DONATED_BUGS,
      CRITTERPEDIA_MUTATIONS.CLEAR_DONATED_FISH,
      CRITTERPEDIA_MUTATIONS.CLEAR_DONATED_SEA_CREATURES,
      CRITTERPEDIA_MUTATIONS.SET_FILTERS_SOUTHERN_MONTHS_AVAILABLE,
      CRITTERPEDIA_MUTATIONS.SET_FILTERS_NORTHERN_MONTHS_AVAILABLE,
    ]),

    onClose () {
      this.setSettingsModalOpen(false);
    },

    resetDonatedBugs () {
      const confirmation = confirm('Are you sure you want to reset your bugs progress? This cannot be undone.');

      if (!confirmation) {
        return;
      }

      this.clearDonatedBugs();
    },

    resetDonatedFish () {
      const confirmation = confirm('Are you sure you want to reset your fish progress? This cannot be undone.');

      if (!confirmation) {
        return;
      }

      this.clearDonatedFish();
    },

    resetDonatedSeaCreatures () {
      const confirmation = confirm('Are you sure you want to reset your sea creatures progress? This cannot be undone.');

      if (!confirmation) {
        return;
      }

      this.clearDonatedSeaCreatures();
    },

    onHemisphereChange () {
      this.setSettingsHemisphere(this.hemisphere ? this.hemisphere.value : '');

      if (this.hemisphere === SETTINGS.HEMISPHERE_NORTHERN) {
        this.setFiltersSouthernMonthsAvailable([]);
      } else if (this.hemisphere === SETTINGS.HEMISPHERE_SOUTHERN) {
        this.setFiltersNorthernMonthsAvailable([]);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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

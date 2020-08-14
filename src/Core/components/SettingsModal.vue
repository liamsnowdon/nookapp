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
            With a preferred hemisphere selected, your experience across the NookApp will be improved, focusing more
            on your preference:
          </p>

          <h6>Critterpedia</h6>
          <ol>
            <li>The hemisphere months filter will be reduced down to one.</li>
            <li>
              The "Available now" filter will show all critters available in your preferred hemisphere only.
              If no preference is selected, it will show critters available now in either of them.
            </li>
          </ol>
          <p>
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
          <h4>Museum Donations</h4>
          <p>
            When you set something as "donated" to the museum using the checkbox, it will be saved on your device so
            when you come back later, it will remember. You can reset this here.
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

            <Button
              @click="resetDonatedFossils"
              :disabled="!hasDonatedFossils"
            >
              Reset donated fossils
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
import { TOAST_DEFAULTS } from 'Core/constants/ui';
import Button from 'Core/components/Button.vue';
import Modal from 'Core/components/Modal.vue';
import SyncApi from 'Core/api/SyncApi';
import PendingSync from 'Core/services/PendingSync';

import {
  MODULE as CORE_MODULE,
  MUTATIONS as CORE_MUTATIONS,
} from 'Core/constants/vuex';
import {
  MODULE as CRITTERPEDIA_MODULE,
  MUTATIONS as CRITTERPEDIA_MUTATIONS,
  GETTERS as CRITTERPEDIA_GETTERS,
} from 'Critterpedia/constants/vuex';
import {
  MODULE as FOSSILS_MODULE,
  MUTATIONS as FOSSILS_MUTATIONS,
  GETTERS as FOSSILS_GETTERS,
} from 'Fossils/constants/vuex';

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

  computed: {
    ...mapState(CORE_MODULE, {
      isStorageAvailable: state => state.isStorageAvailable,
      isOpen: state => state.settingsModalOpen,
      settings: state => state.settings,
      syncId: state => state.syncId,
    }),

    ...mapState(CRITTERPEDIA_MODULE, {
      donatedBugs: state => state.donatedBugs,
      donatedFish: state => state.donatedFish,
      donatedSeaCreatures: state => state.donatedSeaCreatures,
    }),

    ...mapState(FOSSILS_MODULE, {
      donatedFossils: state => state.donatedFossils,
    }),

    ...mapGetters(CRITTERPEDIA_MODULE, [
      CRITTERPEDIA_GETTERS.HAS_DONATED_FISH,
      CRITTERPEDIA_GETTERS.HAS_DONATED_BUGS,
      CRITTERPEDIA_GETTERS.HAS_DONATED_SEA_CREATURES,
    ]),

    ...mapGetters(FOSSILS_MODULE, [
      FOSSILS_GETTERS.HAS_DONATED_FOSSILS,
    ]),
  },

  watch: {
    isOpen (newValue) {
      if (newValue) {
        this.hemisphere = this.hemisphereOptions.find(option => option.value === this.settings.hemisphere);
      }
    },
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

    ...mapMutations(FOSSILS_MODULE, [
      FOSSILS_MUTATIONS.CLEAR_DONATED_FOSSILS,
    ]),

    onClose () {
      this.setSettingsModalOpen(false);
    },

    resetDonatedBugs () {
      const confirmation = confirm('Are you sure you want to reset your bugs progress? This cannot be undone.');

      if (!confirmation) {
        return;
      }

      const donatedBugs = [...this.donatedBugs];

      this.clearDonatedBugs();

      if (this.syncId) {
        SyncApi.delete(this.syncId, {
          donatedBugs,
        });
      }
    },

    resetDonatedFish () {
      const confirmation = confirm('Are you sure you want to reset your fish progress? This cannot be undone.');

      if (!confirmation) {
        return;
      }

      const donatedFish = [...this.donatedFish];

      this.clearDonatedFish();

      if (this.syncId) {
        SyncApi.delete(this.syncId, {
          donatedFish,
        });
      }
    },

    resetDonatedSeaCreatures () {
      const confirmation = confirm('Are you sure you want to reset your sea creatures progress? This cannot be undone.');

      if (!confirmation) {
        return;
      }

      const donatedSeaCreatures = [...this.donatedSeaCreatures];

      this.clearDonatedSeaCreatures();

      if (this.syncId) {
        SyncApi.delete(this.syncId, {
          donatedSeaCreatures: donatedSeaCreatures,
        });
      }
    },

    resetDonatedFossils () {
      const confirmation = confirm('Are you sure you want to reset your fossil progress? This cannot be undone.');

      if (!confirmation) {
        return;
      }

      const donatedFossils = [...this.donatedFossils];

      this.clearDonatedFossils();

      if (this.syncId) {
        SyncApi.delete(this.syncId, {
          donatedFossils: donatedFossils,
        });
      }
    },

    onHemisphereChange () {
      this.setSettingsHemisphere(this.hemisphere ? this.hemisphere.value : '');
      this.updateSyncSettings();

      if (this.hemisphere === SETTINGS.HEMISPHERE_NORTHERN) {
        this.setFiltersSouthernMonthsAvailable([]);
      } else if (this.hemisphere === SETTINGS.HEMISPHERE_SOUTHERN) {
        this.setFiltersNorthernMonthsAvailable([]);
      }
    },

    async updateSyncSettings () {
      if (!this.syncId) {
        return;
      }

      try {
        await SyncApi.patch(this.syncId, {
          settings: {
            hemisphere: this.hemisphere ? this.hemisphere.value : '',
          },
        });

        this.$toasted.success('<strong>NookSync:</strong>&nbsp;Settings updated.', {
          ...TOAST_DEFAULTS,
          icon: 'check',
        });
      } catch (e) {
        PendingSync.setSettings({ hemisphere: this.hemisphere ? this.hemisphere.value : '' });

        this.$toasted.error('<strong>NookSync:</strong>&nbsp;Error updating settings.', {
          ...TOAST_DEFAULTS,
          icon: 'times',
        });
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
        margin: 0 15px 15px 0;
      }
    }
  }
</style>

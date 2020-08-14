<template>
    <Modal
      ref="modal"
      :is-open="isOpen"
      size="large"
      @close="onClose"
    >
    <template #title>
      {{ critter.name['name-EUen'] | capitalize }}
    </template>

    <template #content>
      <div class="detail">
        <div class="detail__main">
          <div
            v-if="isStorageAvailable"
            class="detail__donated-checkbox"
          >
            <input
              id="critter-donated"
              v-model="isDonated"
              type="checkbox"
              class="detail__donated-checkbox-input"
              @change="onDonatedChange"
            />
            <label
              for="critter-donated"
              class="detail__donated-checkbox-label"
            >
              <span class="detail__donated-checkbox-checkbox"></span>
              <span class="detail__donated-checkbox-text">Donated</span>
            </label>
          </div>

          <div class="detail__image-desc">
            <img
              :src="`https://acnhapi.com/v1/images/${critterType}/${critter.id}`"
              :alt="critter.name['name-EUen']"
              class="detail__critter-image"
            />

            <h3 class="detail__name">{{ critter.name['name-EUen'] | capitalize }}</h3>

            <div class="text-center">
              <blockquote
                v-if="critter['museum-phrase']"
                class="detail__museum-quote"
              >
                {{ critter['museum-phrase'] }}
              </blockquote>
            </div>
          </div>
        </div>

        <div class="detail__information">
          <div class="detail__section">
            <div class="detail__two-column">
              <div
                v-if="critter.availability && critter.availability.location"
                class="detail__two-column-col"
              >
                <h4>Location</h4>
                <span>{{ critter.availability.location }}</span>
              </div>

              <div
                v-if="critter.speed"
                class="detail__two-column-col"
              >
                <h4>Speed</h4>
                <span>{{ critter.speed }}</span>
              </div>

              <div
                v-if="critter.shadow"
                class="detail__two-column-col"
              >
                <h4>Shadow</h4>
                <span>{{ critter.shadow }}</span>
              </div>

              <div class="detail__two-column-col">
                <h4>Time of day</h4>
                <span>{{ critter.availability.isAllDay ? 'All day' : critter.availability.time }}</span>
              </div>
            </div>
          </div>

          <div class="detail__section">
            <h4 class="text-left">Time of year</h4>

            <div class="detail__month-key-cont">
              <div class="detail__month-key">
                <span class="detail__month-key-box is-active" />
                <span class="detail__month-key-label">Available</span>
              </div>

              <div class="detail__month-key">
                <span class="detail__month-key-box" />
                <span class="detail__month-key-label">Not Available</span>
              </div>

              <div class="detail__month-key">
                <span class="detail__month-key-box is-current" />
                <span class="detail__month-key-label">Current Month</span>
              </div>
            </div>

            <h5>Northern Hemisphere</h5>

            <div class="detail__months with-margin">
              <span
                v-for="(month, index) in MONTHS"
                :key="`north${index}`"
                :class="[
                  {'is-inactive': !monthIncluded(month, northernMonths)},
                  {'is-current': monthIsCurrent(month)}
                ]"
                class="detail__month"
              >
                {{ month }}
              </span>
            </div>

            <h5>Southern Hemisphere</h5>

            <div class="detail__months">
              <span
                v-for="(month, index) in MONTHS"
                :key="`north${index}`"
                :class="[
                  {'is-inactive': !monthIncluded(month, southernMonths)},
                  {'is-current': monthIsCurrent(month)}
                ]"
                class="detail__month"
              >
                {{ month }}
              </span>
            </div>
          </div>

          <div class="detail__section">
            <h4>Prices</h4>

            <div class="detail__table">
              <div class="detail__table-header">
                <div class="detail__table-data">
                  Image
                </div>
                <div class="detail__table-data">
                  Name
                </div>
                <div class="detail__table-data">
                  Price
                </div>
              </div>

              <div class="detail__table-row">
                <div class="detail__table-data">
                  <img src="../assets/timmy-and-tommy.png" alt="Nook's Cranny" />
                </div>

                <div class="detail__table-data">
                  Nook's Cranny
                </div>

                <div class="detail__table-data">
                  {{ formatNumberWithCommas(critter.price) }}
                </div>
              </div>

              <div
                v-if="higherPriceValue"
                class="detail__table-row"
              >
                <div class="detail__table-data">
                  <img v-if="isFish" src="../assets/cj.png" alt="C.J." />
                  <img v-if="isBug" src="../assets/flick.png" alt="Flick" />
                </div>

                <div class="detail__table-data">
                  <template v-if="isFish">C.J.</template>
                  <template v-if="isBug">Flick</template>
                </div>

                <div class="detail__table-data">
                  {{ formatNumberWithCommas(higherPriceValue) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

import { MONTHS } from 'Core/constants/date';
import { MODULE as CORE_MODULE } from 'Core/constants/vuex';
import { TOAST_DEFAULTS } from 'Core/constants/ui';

import { CRITTER_TYPES } from 'Critterpedia/constants/critter-types';
import {
  MODULE as CRITTERPEDIA_MODULE,
  MUTATIONS as CRITTERPEDIA_MUTATIONS,
  GETTERS as CRITTERPEDIA_GETTERS,
} from 'Critterpedia/constants/vuex';

import Modal from 'Core/components/Modal.vue';

import SyncApi from 'Core/api/SyncApi';
import PendingSync from 'Core/services/PendingSync';

export default {
  name: 'DetailModal',

  props: {
    critterType: {
      type: String,
      required: true,
    },
  },

  components: {
    Modal,
  },

  data () {
    return {
      isDonated: false,
    };
  },

  created () {
    this.MONTHS = MONTHS;
  },

  computed: {
    ...mapState(CORE_MODULE, {
      isStorageAvailable: state => state.isStorageAvailable,
      syncId: state => state.syncId,
    }),

    ...mapState(CRITTERPEDIA_MODULE, {
      isOpen: state => state.detailModalOpen,
      selectedBug: state => state.selectedBug,
      selectedFish: state => state.selectedFish,
      selectedSeaCreature: state => state.selectedSeaCreature,
      donatedFish: state => state.donatedFish,
      donatedBugs: state => state.donatedBugs,
      donatedSeaCreatures: state => state.donatedSeaCreatures,
    }),

    ...mapGetters(CRITTERPEDIA_MODULE, [
      CRITTERPEDIA_GETTERS.GET_DONATED_CRITTER,
    ]),

    isBug () {
      return this.critterType === CRITTER_TYPES.BUGS;
    },

    isFish () {
      return this.critterType === CRITTER_TYPES.FISH;
    },

    isSeaCreature () {
      return this.critterType === CRITTER_TYPES.SEA_CREATURES;
    },

    higherPriceValue () {
      switch (this.critterType) {
        case CRITTER_TYPES.BUGS:
          return this.critter['price-flick'];
        case CRITTER_TYPES.FISH:
          return this.critter['price-cj'];
        default:
          return null;
      }
    },

    critter () {
      switch (this.critterType) {
        case CRITTER_TYPES.BUGS:
          return this.selectedBug;
        case CRITTER_TYPES.FISH:
          return this.selectedFish;
        default:
          return this.selectedSeaCreature;
      }
    },

    /**
     * Northern months in readable form
     *
     * @returns {array}
     */
    northernMonths () {
      return this.critter.availability['month-array-northern'].map(month => MONTHS[month - 1]);
    },

    /**
     * Southern months in readable form
     *
     * @returns {array}
     */
    southernMonths () {
      return this.critter.availability['month-array-southern'].map(month => MONTHS[month - 1]);
    },
  },

  watch: {
    critter (newCritter) {
      const properties = {
        id: newCritter.id,
        critterType: this.critterType,
      };

      this.isDonated = !!this.getDonatedCritter(properties);
    },

    donatedFish () {
      if (this.isBug || this.isSeaCreature) {
        return;
      }

      this.refreshDonatedStatus();
    },

    donatedBugs () {
      if (this.isFish || this.isSeaCreature) {
        return;
      }

      this.refreshDonatedStatus();
    },

    donatedSeaCreatures () {
      if (this.isFish || this.isBug) {
        return;
      }

      this.refreshDonatedStatus();
    },
  },

  methods: {
    ...mapMutations(CRITTERPEDIA_MODULE, [
      CRITTERPEDIA_MUTATIONS.SET_DONATED_CRITTER_STATUS,
      CRITTERPEDIA_MUTATIONS.SET_DETAIL_MODAL_OPEN,
      CRITTERPEDIA_MUTATIONS.SET_SELECTED_BUG,
      CRITTERPEDIA_MUTATIONS.SET_SELECTED_FISH,
      CRITTERPEDIA_MUTATIONS.SET_SELECTED_SEA_CREATURE,
    ]),

    onClose () {
      this.setDetailModalOpen(false);

      if (this.isBug) {
        this.setSelectedBug({});
      } else if (this.isSeaCreature) {
        this.setSelectedSeaCreature({});
      } else {
        this.setSelectedFish({});
      }
    },

    refreshDonatedStatus () {
      const properties = {
        id: this.critter.id,
        critterType: this.critterType,
      };

      this.isDonated = !!this.getDonatedCritter(properties);
    },

    onDonatedChange () {
      const payload = {
        id: this.critter.id,
        critterType: this.critterType,
        isDonated: this.isDonated,
      };

      this.setDonatedCritterStatus(payload);
      this.updateSyncDonatedCritterStatus();
    },

    async updateSyncDonatedCritterStatus () {
      if (!this.syncId) {
        return;
      }

      const method = this.isDonated ? SyncApi.patch : SyncApi.delete;

      const payload = {};
      let toastCritterTypeText;

      if (this.isBug) {
        payload.donatedBugs = [this.critter.id];
        toastCritterTypeText = 'Bug';
      } else if (this.isSeaCreature) {
        payload.donatedSeaCreatures = [this.critter.id];
        toastCritterTypeText = 'Sea Creature';
      } else {
        payload.donatedFish = [this.critter.id];
        toastCritterTypeText = 'Fish';
      }

      try {
        await method(this.syncId, payload);

        this.$toasted.success(`<strong>NookSync:</strong>&nbsp;${toastCritterTypeText} donated status updated.`, TOAST_DEFAULTS);
      } catch (e) {
        PendingSync.setCritter(this.critter, this.isDonated, this.critterType);

        this.$toasted.error(`<strong>NookSync:</strong>&nbsp;Error updating ${toastCritterTypeText} donated status.`, TOAST_DEFAULTS);
      }
    },

    formatNumberWithCommas (num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    },

    monthIncluded (month, months) {
      return months.includes(month);
    },

    monthIsCurrent (month) {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const index = MONTHS.findIndex(m => m === month);

      return index === currentMonth;
    },
  },
};
</script>

<style lang="scss">
  .detail {
    display: flex;
    text-align: center;

    @include breakpoint(medium) {
      overflow-y: auto;
      margin: 0 -16px;
    }

    @include breakpoint(medium, down) {
      height: calc(100% - 40px);
      flex-direction: column;
    }

    &--empty {
      justify-content: center;
      align-items: center;
    }

    &__main,
    &__information {
      @include breakpoint(medium) {
        flex: 0 0 50%;
        padding: 0 16px;
      }
    }

    &__image-desc {
      flex: 1 0 0;
    }

    &__month-key-cont {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
    }

    &__month-key {
      display: flex;
      align-items: center;
      margin: 0 20px 20px;
    }

    &__month-key-box {
      height: 30px;
      width: 30px;
      border: 2px dashed;
      border-radius: 10px;
      margin-right: 10px;

      &.is-active {
        background-color: var(--brown-dark);
      }

      &.is-current {
        border-color: #ce0606;
      }
    }

    &__table-header {
      display: flex;
      background-color: var(--brown-dark);
    }

    &__table-row {
      display: flex;
    }

    &__table-data {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 2 1 50%;
      padding: 10px;
      text-align: center;

      img {
        max-height: 100px;
      }
    }

    &__donated-checkbox {
      display: flex;
      justify-content: flex-end;
    }

    &__donated-checkbox-input {
      opacity: 0;
      position: absolute;

      &:checked {
        + .detail__donated-checkbox-label {
          .detail__donated-checkbox-checkbox {
            border-color: var(--brown-darkest);
            &:before,
            &:after {
              opacity: 1;
            }
          }
        }
      }
    }

    &__donated-checkbox-label {
      display: inline-flex;
      align-items: center;
      padding: 0;
      font-weight: 600;
      cursor: pointer;
      user-select: none;

      &:hover {
        .detail__donated-checkbox-checkbox {
          border-color: var(--brown-darkest);
        }
      }
    }

    &__donated-checkbox-checkbox {
      position: relative;
      display: inline-block;
      height: 40px;
      width: 40px;
      margin-right: 10px;
      border: 2px solid #a6a6a6;
      border-radius: 5px;
      background: white;

      &::before,
      &::after {
        opacity: 0;
        position: absolute;
        width: 5px;
        content: '';
        background-color: var(--brown-darkest);
      }

      &::before {
        top: 17px;
        left: 15px;
        height: 15px;
        transform: rotate(-45deg) translate(-50%, -50%);
      }

      &::after {
        top: 15px;
        left: 12px;
        height: 25px;
        transform: rotate(45deg) translate(-50%, -50%);
      }
    }

    &__blathers,
    &__empty-message {
      @include breakpoint(medium, down) {
        height: 50%;
      }
    }

    &__two-column {
      display: flex;
      justify-content: space-evenly;
    }

    &__critter-image {
      width: 100%;
      border-radius: 50%;
      margin: 20px 0;

      @include breakpoint(medium) {
        width: 80%;
      }
    }

    &__museum-quote {
      position: relative;
      margin: 16px 0 15px;
      text-align: left;
      line-height: 1.5;

      @include breakpoint(medium) {
        margin: 16px 40px 15px;
      }

      &::before,
      &::after {
        content: '"';
        position: relative;
      }
    }

    &__months {
      display: grid;
      grid-gap: 15px;
      grid-template-columns: repeat(auto-fill, minmax(125px, 1fr));

      &.with-margin {
        margin-bottom: 20px;
      }
    }

    &__month {
      padding: 10px;
      border-radius: 10px;
      border: 2px dashed;

      &:not(.is-inactive) {
        background-color: var(--brown-dark);
      }

      &.is-current {
        border-color: #ce0606;
      }
    }

    &__price-image {
      img {
        display: block;
        margin-bottom: 15px;
        height: 150px;
      }
    }

    &__price-value {
      font-size: 20px;
    }

    &__section {
      padding: 20px 0;
    }
  }
</style>

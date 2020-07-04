<template>
  <div
    v-if="critter.id"
    class="detail"
  >
    <div class="detail__main">
      <div
        v-if="isStorageAvailable"
        class="detail__caught-checkbox"
      >
        <input
          id="critter-caught"
          v-model="isCaught"
          type="checkbox"
          class="detail__caught-checkbox-input"
          @change="onCaughtChange"
        />
        <label
          for="critter-caught"
          class="detail__caught-checkbox-label"
        >
          <span class="detail__caught-checkbox-checkbox"></span>
          <span class="detail__caught-checkbox-text">Caught</span>
        </label>
      </div>

      <h3 class="detail__name">{{ critter.name['name-EUen'] | capitalize }}</h3>

      <img
        :src="`http://acnhapi.com/v1/images/${critterType}/${critter.id}`"
        :alt="critter.name['name-EUen']"
        class="detail__critter-image"
      />

      <div
        v-if="critter['museum-phrase']"
        class="detail__museum-phrase"
      >
        <blockquote class="detail__museum-quote">{{ critter['museum-phrase'] }}</blockquote>
        <div class="detail__museum-blathers">
          <img src="../assets/blathers.png" alt="Blathers" />
        </div>
      </div>

      <hr>
    </div>

    <div class="detail__information">
      <div class="detail__two-column">
        <div
          v-if="critter.availablility && critter.availablility.location"
          class="detail__two-column-col"
        >
          <h4>Location</h4>
          <p>{{ critter.availability.location }}</p>
        </div>

        <div
          v-if="critter.speed"
          class="detail__two-column-col"
        >
          <h4>Speed</h4>
          <p>{{ critter.speed }}</p>
        </div>

        <div
          v-if="critter.shadow"
          class="detail__two-column-col"
        >
          <h4>Shadow</h4>
          <p>{{ critter.shadow }}</p>
        </div>

        <div class="detail__two-column-col">
          <h4>Time of day</h4>
          <span>{{ critter.availability.isAllDay ? 'All day' : critter.availability.time }}</span>
        </div>
      </div>

      <hr>

      <h4>Time of year</h4>

      <h5>Northern Hemisphere</h5>

      <div class="detail__months">
        <span
          v-for="(month, index) in northernMonths"
          :key="`north${index}`"
          class="detail__month"
          >
          {{ month }}
        </span>
      </div>

      <h5>Southern Hemisphere</h5>

      <div class="detail__months">
        <span
          v-for="(month, index) in southernMonths"
          :key="`north${index}`"
          class="detail__month"
        >
          {{ month }}
        </span>
      </div>

      <hr>

      <h4>Prices</h4>

      <div class="detail__two-column">
        <div class="detail__two-column-col">
          <div class="detail__price">
            <div class="detail__price-image">
              <img src="../assets/timmy-and-tommy.png" alt="Timmy and Tommy" />
            </div>
            <span class="detail__price-value">{{ formatNumberWithCommas(critter.price) }}</span>
          </div>
        </div>

        <div
          v-if="higherPriceValue"
          class="detail__two-column-col"
        >
          <div class="detail__price">
            <template v-if="isFish">
              <div class="detail__price-image">
                <img src="../assets/cj.png" alt="C.J." />
              </div>
              <span class="detail__price-value">{{ formatNumberWithCommas(higherPriceValue) }}</span>
            </template>
            <template v-if="isBug">
              <div class="detail__price-image">
                <img src="../assets/flick.png" alt="Flick" />
              </div>
              <span class="detail__price-value">{{ formatNumberWithCommas(higherPriceValue) }}</span>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="detail detail--empty" v-else>
    <div class="detail__blathers">
      <img src="../assets/blathers.png" alt="Blathers" />
    </div>

    <div class="detail__empty-message">
      <img src="../assets/blathers-dialogue.png" alt="Select a critter to learn more about it. I can also tell you when and where you can catch it." />
    </div>
  </div>
</template>

<script>
import { CRITTER_TYPES, MONTHS, VUEX_MUTATIONS } from '../constants';

export default {
  name: 'Detail',

  props: {
    critterType: {
      type: String,
      required: true,
    },
  },

  data () {
    return {
      months: MONTHS,
      isCaught: false,
    };
  },

  computed: {
    isStorageAvailable () {
      return this.$store.state.isStorageAvailable;
    },

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
          return this.$store.state.selectedBug;
        case CRITTER_TYPES.FISH:
          return this.$store.state.selectedFish;
        default:
          return this.$store.state.selectedSeaCreature;
      }
    },

    caughtFish () {
      return this.$store.state.caughtFish;
    },

    caughtBugs () {
      return this.$store.state.caughtBugs;
    },

    caughtSeaCreatures () {
      return this.$store.state.caughtSeaCreatures;
    },

    /**
     * Northern months in readable form
     *
     * @returns {array}
     */
    northernMonths () {
      if (this.critter.availability.isAllYear) {
        return ['All Year'];
      }

      return this.monthsStringToArray('northern');
    },

    /**
     * Southern months in readable form
     *
     * @returns {array}
     */
    southernMonths () {
      if (this.critter.availability.isAllYear) {
        return ['All Year'];
      }

      return this.monthsStringToArray('southern');
    },
  },

  watch: {
    critter (newCritter) {
      const properties = {
        id: newCritter.id,
        critterType: this.critterType,
      };

      this.isCaught = !!this.$store.getters.getCaughtCritter(properties);
    },

    caughtFish () {
      if (this.isBug) {
        return;
      }

      this.refreshCaughtStatus();
    },

    caughtBugs () {
      if (this.isFish) {
        return;
      }

      this.refreshCaughtStatus();
    },

    caughtSeaCreatures () {
      if (this.isSeaCreature) {
        return;
      }

      this.refreshCaughtStatus();
    },
  },

  methods: {
    refreshCaughtStatus () {
      const properties = {
        id: this.critter.id,
        critterType: this.critterType,
      };

      this.isCaught = !!this.$store.getters.getCaughtCritter(properties);
    },

    onCaughtChange () {
      const payload = {
        id: this.critter.id,
        critterType: this.critterType,
        isCaught: this.isCaught,
      };

      this.$store.commit(VUEX_MUTATIONS.SET_CAUGHT_CRITTER_STATUS, payload);
    },

    formatNumberWithCommas (num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    },

    /**
     * Converts the string from the api into readable month names
     *
     * @param {string} hemisphere
     * @returns {Array}
     */
    monthsStringToArray (hemisphere) {
      let monthsString;

      switch (this.critterType) {
        case CRITTER_TYPES.BUGS:
          monthsString = this.$store.state.selectedBug.availability[`month-${hemisphere}`];
          break;
        case CRITTER_TYPES.FISH:
          monthsString = this.$store.state.selectedFish.availability[`month-${hemisphere}`];
          break;
        case CRITTER_TYPES.SEA_CREATURES:
          monthsString = this.$store.state.selectedSeaCreature.availability[`month-${hemisphere}`];
          break;
      }

      const intervals = monthsString.split(' & ');

      let months = [];

      intervals.forEach((interval) => {
        const intervalMonthsString = interval.split('-');
        const intervalStartingMonth = Number(intervalMonthsString[0]);
        const intervalEndingMonth = Number(intervalMonthsString[1]);

        const intervalMonths = [];

        if (intervalStartingMonth > intervalEndingMonth) {
          for (let i = intervalStartingMonth; i <= 12; i++) {
            intervalMonths.push(i);
          }

          for (let i = 1; i <= intervalEndingMonth; i++) {
            intervalMonths.push(i);
          }
        } else {
          for (let i = intervalStartingMonth; i <= intervalEndingMonth; i++) {
            intervalMonths.push(i);
          }
        }

        months = [...months, ...intervalMonths];
      });

      months = months.map(month => {
        return this.months[month - 1];
      });

      return months;
    },
  },
};
</script>

<style lang="scss">
  @import '@/scss/_abstracts.scss';

  .detail {
    display: flex;
    flex-direction: column;
    text-align: center;

    @include breakpoint(medium) {
      overflow-y: auto;
    }

    @include breakpoint(medium, down) {
      height: calc(100% - 40px);
    }

    &--empty {
      justify-content: center;
      align-items: center;
    }

    &__caught-checkbox {
      display: flex;
      justify-content: flex-end;
    }

    &__caught-checkbox-input {
      opacity: 0;
      position: absolute;

      &:checked {
        + .detail__caught-checkbox-label {
          .detail__caught-checkbox-checkbox {
            border-color: $brown-darkest;
            &:before,
            &:after {
              opacity: 1;
            }
          }
        }
      }
    }

    &__caught-checkbox-label {
      display: inline-flex;
      align-items: center;
      padding: 0;
      font-weight: 400;
      cursor: pointer;
      user-select: none;

      &:hover {
        .detail__caught-checkbox-checkbox {
          border-color: $brown-darkest;
        }
      }
    }

    &__caught-checkbox-checkbox {
      position: relative;
      display: inline-block;
      height: 40px;
      width: 40px;
      margin-right: 10px;
      border: 2px solid $brown-dark;
      border-radius: 5px;
      background: white;

      &::before,
      &::after {
       opacity: 0;
       position: absolute;
       width: 5px;
       content: '';
       background-color: $brown-darkest;
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
      background-color: $brown-dark;
      border-radius: 50%;

      @include breakpoint(medium) {
        width: 50%;
      }
    }

    &__museum-phrase {
      display: flex;
      align-items: center;
    }

    &__museum-blathers {
      flex: 0 0 100px;

      @include breakpoint(medium, down) {
        display: none;
      }
    }

    &__museum-quote {
      position: relative;
      margin: 16px 0;
      padding: 10px 20px;
      border: 1px dashed;
      border-radius: 20px;
      background: white;
      line-height: 1.5;
      text-align: left;

      @include breakpoint(medium) {
        margin: 16px 40px;
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
    }

    &__month {
      background-color: $brown-dark;
      padding: 15px 20px;
      border-radius: 10px;
      border: 2px dashed;

      &.is-active {
        background-color: $brown-light;
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
  }
</style>

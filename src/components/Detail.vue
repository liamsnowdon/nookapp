<template>
  <div
    v-if="critter.id"
    class="detail"
  >
    <div class="detail__main">
      <label v-if="isStorageAvailable" for="caught">
        <input
          id="caught"
          v-model="isCaught"
          type="checkbox"
          @change="onCaughtChange"
        />
        <span>Caught</span>
      </label>

      <h3 class="detail__name">{{ critter.name['name-en'] | capitalize }}</h3>

      <img
        :src="`http://acnhapi.com/images/${critterType}/${critter.id}`"
        :alt="critter.name['name-en']"
        class="detail__critter-image"
      />

      <div class="detail__museum-phrase">
        <blockquote class="detail__museum-quote">{{ critter['museum-phrase'] }}</blockquote>
        <div class="detail__museum-blathers">
          <img src="../assets/blathers.png" alt="Blathers" />
        </div>
      </div>

      <hr>
    </div>

    <div class="detail__information">
      <div class="detail__two-column">
        <div class="detail__two-column-col">
          <h4>Location</h4>
          <p>{{ critter.availability.location }}</p>
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
        <div class="detail__two-column-col">
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
import { CRITTER_TYPES } from '../constants';

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
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
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

    higherPriceValue () {
      return this.isBug ? this.critter['price-flick'] : this.critter['price-cj'];
    },

    critter () {
      return this.isBug ? this.$store.state.selectedBug : this.$store.state.selectedFish;
    },

    caughtFish () {
      return this.$store.state.caughtFish;
    },

    caughtBugs () {
      return this.$store.state.caughtBugs;
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

      this.$store.commit('setCaughtCritterStatus', payload);
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
      const monthsString = this.isBug ? this.$store.state.selectedBug.availability[`month-${hemisphere}`] : this.$store.state.selectedFish.availability[`month-${hemisphere}`];
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

    @include breakpoint(medium, down) {
      height: calc(100% - 40px);
    }

    &--empty {
      justify-content: center;
      align-items: center;
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

    &__main {
      flex: 1 0 0;
    }

    &__critter-image {
      width: 100%;
      background-color: #d8cfa6;
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

    &__information {
      flex: 1 1 auto;
      overflow-y: auto;
    }

    &__months {
      display: grid;
      grid-gap: 15px;
      grid-template-columns: repeat(auto-fill, minmax(125px, 1fr));
    }

    &__month {
      background-color: #d8cfa6;
      padding: 15px 20px;
      border-radius: 10px;
      border: 2px dashed;

      &.is-active {
        background-color: #fffcdd;
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

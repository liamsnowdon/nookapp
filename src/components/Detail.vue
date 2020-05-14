<template>
  <div class="detail">
    <template v-if="selectedCritter.id">
      <div class="detail__main">
        <label for="caught">
          <input id="caught" type="checkbox" />
          <span>Caught</span>
        </label>

        <h3>{{ selectedCritter.name['name-en'] }}</h3>

        <img
          :src="`http://acnhapi.com/images/${critterType}/${selectedCritter.id}`"
          :alt="selectedCritter.name['name-en']"
        />

        <p>{{ selectedCritter['museum-phrase'] }}</p>

        <hr>
      </div>

      <div class="detail__information">
        <h4>Location</h4>
        <p>{{ selectedCritter.availability.location }}</p>

        <hr>

        <h4>Time of year</h4>

        <h5>Northern Hemisphere</h5>

        <p>{{ selectedCritter.availability['month-northern'] }}</p>

        <span class="detail__month"
              v-for="(month, index) in months"
              :class="{'is-active': activeMonth(month, 'north')}"
              :key="`north${index}`"
        >
        {{ month }}
      </span>

        <h5>Southern Hemisphere</h5>

        <p>{{ selectedCritter.availability['month-southern'] }}</p>

        <span class="detail__month"
              v-for="(month, index) in months"
              :class="{'is-active': activeMonth(month, 'south')}"
              :key="`south${index}`"
        >
        {{ month }}
      </span>

        <hr>

        <h4>Time of day</h4>

        <span>{{ selectedCritter.timeOfDay }}</span>

        <hr>

        <h4>Prices</h4>

        <span>Normal: {{ selectedCritter.price }}</span>
        <br />
        <span>{{ higherPriceCharacter }}: {{ higherPriceValue }}</span>
      </div>

    </template>

    <template v-else>
      Select a critter to learn more about it.
    </template>
  </div>
</template>

<script>
export default {
  name: 'Detail',

  props: {
    selectedCritter: {
      type: Object,
      required: true,
    },
    critterType: {
      type: String,
      required: true,
    },
  },

  data () {
    return {
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    };
  },

  computed: {
    higherPriceCharacter () {
      return this.critterType === 'bugs' ? 'Flick' : 'C.J.';
    },

    higherPriceValue () {
      return this.critterType === 'bugs' ? this.selectedCritter['price-flick'] : this.selectedCritter['price-cj'];
    },
  },

  methods: {
    /**
     * Highlight active month if a critter is available
     * @param {string} month
     * @param {string} hemisphere - 'north' or 'south'
     * @returns {boolean}
     */
    activeMonth (month, hemisphere) {
      // return this.selectedCritter[`${hemisphere}Months`].includes(month);
      return false;
    },
  },
};
</script>

<style scoped lang="scss">
  .detail {
    display: flex;
    flex-direction: column;
    &__month {
      &.is-active {
        color: pink;
        font-weight: bold;
      }
    }

    &__main {
      flex: 1 0 0px;
    }

    &__information {
      flex: 1 1 auto;
      overflow-y: auto;
    }
  }

  img {
    width: 50%;
    height: auto;
  }
</style>

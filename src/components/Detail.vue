<template>
  <div
    v-if="critter.id"
    class="detail"
  >
    <div class="detail__main">
      <label for="caught">
        <input id="caught" type="checkbox" />
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
      <h4>Location</h4>
      <p>{{ critter.availability.location }}</p>

      <hr>

      <h4>Time of year</h4>

      <h5>Northern Hemisphere</h5>

      <p>{{ critter.availability['month-northern'] }}</p>

      <span class="detail__month"
            v-for="(month, index) in months"
            :class="{'is-active': activeMonth(month, 'north')}"
            :key="`north${index}`"
      >
        {{ month }}
      </span>

      <h5>Southern Hemisphere</h5>

      <p>{{ critter.availability['month-southern'] }}</p>

      <span class="detail__month"
            v-for="(month, index) in months"
            :class="{'is-active': activeMonth(month, 'south')}"
            :key="`south${index}`"
      >
        {{ month }}
      </span>

      <hr>

      <h4>Time of day</h4>

      <span>{{ critter.timeOfDay }}</span>

      <hr>

      <h4>Prices</h4>

      <span>Normal: {{ critter.price }}</span>
      <br />
      <span>{{ higherPriceCharacter }}: {{ higherPriceValue }}</span>
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
    };
  },

  computed: {
    higherPriceCharacter () {
      return this.critterType === 'bugs' ? 'Flick' : 'C.J.';
    },

    higherPriceValue () {
      return this.critterType === 'bugs' ? this.critter['price-flick'] : this.critter['price-cj'];
    },

    critter () {
      return this.critterType === 'bugs' ? this.$store.state.selectedBug : this.$store.state.selectedFish;
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
      // return this.critter[`${hemisphere}Months`].includes(month);
      return false;
    },
  },
};
</script>

<style scoped lang="scss">
  .detail {
    display: flex;
    flex-direction: column;
    text-align: center;

    &--empty {
      justify-content: center;
      align-items: center;
    }

    &__month {
      &.is-active {
        color: pink;
        font-weight: bold;
      }
    }

    &__main {
      flex: 1 0 0px;
    }

    &__critter-image {
      width: 50%;
      background-color: #d8cfa6;
      border-radius: 50%;
    }

    &__museum-phrase {
      display: flex;
      align-items: center;
    }

    &__museum-blathers {
      flex: 0 0 100px;
    }

    &__museum-quote {
      position: relative;
      margin: 16px 40px;
      padding: 10px 20px;
      border: 1px dashed;
      border-radius: 20px;
      background: white;
      line-height: 1.5;
      text-align: left;

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
  }
</style>

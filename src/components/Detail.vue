<template>
  <div class="detail">
    <h2>Detail</h2>

    <template v-if="selectedCritter.name">
      <h3>{{ selectedCritter.name }}</h3>

      <img
        :src="`${publicPath}critters/${critterType}/${selectedCritter.image}`"
        :alt="selectedCritter.name"
      />

      <p>{{ selectedCritter.description }}</p>

      <hr>

      <h4>Location</h4>
      <p>{{ selectedCritter.location }}</p>

      <hr>

      <h4>Time of year</h4>

      <h5>Northern Hemisphere</h5>
      <span
        v-for="(month, index) in months"
        :class="{'is-active': activeMonth(month, 'north')}"
        :key="index"
      >
        {{ month }}
      </span>

      <h5>Southern Hemisphere</h5>
      <span
        v-for="(month, index) in months"
        :class="{'is-active': activeMonth(month, 'south')}"
        :key="index"
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
      <span>{{ higherPriceCharacter }}: {{ selectedCritter.priceV2 }}</span>

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
      publicPath: process.env.BASE_URL,
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    };
  },

  computed: {
    higherPriceCharacter () {
      return this.critterType === 'bugs' ? 'Flick' : 'C.J.';
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
      return this.selectedCritter[`${hemisphere}Months`].includes(month);
    },
  },
};
</script>

<style scoped lang="scss">
  .detail {
    flex: 0 0 50%;
  }

  img {
    max-width: 100%;
    height: auto;
  }
</style>

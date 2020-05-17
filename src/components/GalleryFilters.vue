<template>
  <div class="gallery__filters">
    <!-- Sort -->
    <div class="gallery__filters-item">
      <label for="sort">Sort</label>
      <select
        id="sort"
        v-model="sort"
        @change="onSortChange"
      >
        <option v-for="option in sortOptions" :key="option.value" :value="option.value">{{ option.displayValue }}</option>
      </select>
    </div>

    <div class="gallery__filters-row">
      <div class="gallery__filters-column">
        <!-- Search term -->
        <div class="gallery__filters-item">
          <label for="searchTerm">Search by name or ID</label>
          <input
            id="searchTerm"
            v-model="searchTerm"
            @input="onSearchTermInput"
            type="search"
            :placeholder="isFish ? 'Sea Bass' : 'Common Butterfly'"
          />
        </div>
      </div>

      <div class="gallery__filters-column">
        <!-- Location -->
        <div class="gallery__filters-item">
          <template v-if="isFish">
            <label for="fish-locations">Location</label>
            <select
              id="fish-locations"
              v-model="location"
              @change="onLocationChange"
            >
              <option value="">All</option>
              <option v-for="(location, index) in fishLocations" :key="index" :value="location">{{ location }}</option>
            </select>
          </template>

          <template v-if="isBug">
            <label for="bug-locations">Location</label>
            <select
              id="bug-locations"
              v-model="location"
              @change="onLocationChange"
            >
              <option value="">Select a location</option>
              <option v-for="(location, index) in bugLocations" :key="index" :value="location">{{ location }}</option>
            </select>
          </template>
        </div>
      </div>
    </div>

    <div class="gallery__filters-row">
      <div class="gallery__filters-column">
        <!-- Min Base Price -->
        <div class="gallery__filters-item">
          <label for="min-base-price">Min Base Price</label>
          <input
            id="min-base-price"
            v-model.number="minBasePrice"
            @input="onMinBasePriceInput"
            type="number"
            placeholder="200"
          />
        </div>
      </div>

      <div class="gallery__filters-column">
        <!-- Max Base Price -->
        <div class="gallery__filters-item">
          <label for="max-base-price">Max Base Price</label>
          <input
            id="max-base-price"
            v-model.number="maxBasePrice"
            @input="onMaxBasePriceInput"
            type="number"
            placeholder="4000"
          />
        </div>
      </div>
    </div>

    <div class="gallery__filters-row">
      <div class="gallery__filters-column">
        <!-- Caught -->
        <div class="gallery__filters-item">
          <label for="caught">Caught</label>
          <select
            id="caught"
            v-model="caught"
            @change="onCaughtChange"
          >
            <option value="">All</option>
            <option value="caught">Caught</option>
            <option value="uncaught">Uncaught</option>
          </select>
        </div>
      </div>

      <div class="gallery__filters-column">
        <!-- Months -->
        <div class="gallery__filters-item">
          <label for="months-available">Months available in</label>
          <select
            id="months-available"
            v-model="months"
            multiple
          >
            <option v-for="(month, index) in monthsOptions" :key="index" :value="month">{{ month }}</option>
          </select>
        </div>
      </div>
    </div>

    <div class="gallery__filters-clear">
      <button class="gallery__filters-clear-button" @click="resetFilters">Reset filters</button>
    </div>
  </div>
</template>

<script>
import { CRITTER_TYPES, SORT_OPTIONS, VUEX_MUTATIONS } from '../constants';

export default {
  name: 'GalleryFilters',

  props: {
    critterType: {
      type: String,
      required: true,
    },
  },

  data () {
    return {
      sort: 'id',
      searchTerm: '',
      location: '',
      caught: '',
      months: [],
      monthsOptions: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      minBasePrice: null,
      maxBasePrice: null,
      sortOptions: [
        {
          displayValue: 'ID',
          value: SORT_OPTIONS.ID,
        },
        {
          displayValue: 'Alphabetical (A - Z)',
          value: SORT_OPTIONS.ALPHABETICAL_ASCENDING,
        },
        {
          displayValue: 'Alphabetical (Z - A)',
          value: SORT_OPTIONS.ALPHABETICAL_DESCENDING,
        },
        {
          displayValue: 'Price (Highest to Lowest)',
          value: SORT_OPTIONS.PRICE_DESCENDING,
        },
        {
          displayValue: 'Price (Smallest to Lowest)',
          value: SORT_OPTIONS.PRICE_ASCENDING,
        },
      ],
      fishLocations: [
        'Pond',
        'River',
        'River (Clifftop)',
        'River (Mouth)',
        'River (Clifftop) & Pond',
        'Sea',
        'Sea (when raining or snowing)',
        'Pier',
      ],
      bugLocations: [
        'Flying',
        'Flying near hybrid flowers',
        'Flying by light',
        'On trees',
        'On the ground',
        'On flowers',
        'On white flowers',
        'Shaking trees',
        'Underground',
        'On ponds and rivers',
        'On tree stumps',
        'On palm trees',
        'Under trees',
        'Near trash',
        'On beach rocks',
        'On the beach',
        'On rotten food',
        'On villagers',
        'On rocks (when raining)',
        'Hitting rocks',
      ],
    };
  },

  computed: {
    isBug () {
      return this.critterType === CRITTER_TYPES.BUGS;
    },

    isFish () {
      return this.critterType === CRITTER_TYPES.FISH;
    },
  },

  methods: {
    onSearchTermInput () {
      this.$store.commit(VUEX_MUTATIONS.SET_FILTERS_SEARCH_TERM, this.searchTerm);
    },

    onLocationChange () {
      this.$store.commit(VUEX_MUTATIONS.SET_FILTERS_LOCATION, this.location);
    },

    onMinBasePriceInput () {
      this.$store.commit(VUEX_MUTATIONS.SET_FILTERS_MIN_BASE_PRICE, this.minBasePrice);
    },

    onMaxBasePriceInput () {
      this.$store.commit(VUEX_MUTATIONS.SET_FILTERS_MAX_BASE_PRICE, this.maxBasePrice);
    },

    onSortChange () {
      this.$store.commit(VUEX_MUTATIONS.SET_FILTERS_SORT, this.sort);
    },

    onCaughtChange () {
      this.$store.commit(VUEX_MUTATIONS.SET_FILTERS_CAUGHT, this.caught);
    },

    resetFilters () {
      this.sort = 'id';
      this.searchTerm = '';
      this.location = '';
      this.caught = '';
      this.minBasePrice = '';
      this.maxBasePrice = '';

      this.$store.commit(VUEX_MUTATIONS.CLEAR_FILTERS);
    },
  },
};
</script>

<style lang="scss">
  @import '@/scss/_abstracts.scss';

  .gallery {
    &__filters {
      @include breakpoint(medium, down) {
        padding: 20px;
      }
    }

    &__filters-row {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -8px;
    }

    &__filters-column {
      flex: 0 0 100%;
      padding: 0 8px;

      @include breakpoint(medium) {
        flex: 0 0 50%;
      }
    }

    &__filters-item {
      margin-bottom: 20px;

      label {
        display: block;
        margin-bottom: 10px;
      }

      select,
      [type="text"],
      [type="number"],
      [type="search"] {
        width: 100%;
        height: 40px;
        background-color: white;
        padding: 0 10px;
        border-radius: 5px;
        border: 1px solid #a6a6a6;
        font-size: 16px;
        appearance: none;
      }
    }

    &__filters-clear {
      margin-top: 10px;
      text-align: center;
    }

    &__filters-clear-button {
      @extend %button-reset;
      text-decoration: underline;
    }
  }
</style>

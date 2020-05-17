<template>
  <div class="gallery__filters">
    <div class="gallery__filters-row">
      <div class="gallery__filters-column">
        <!-- Sort -->
        <div class="gallery__filters-item">
          <label for="sort">Sort</label>
          <multiselect
            id="sort"
            v-model="sort"
            :options="sortOptions"
            :searchable="false"
            :close-on-select="true"
            :show-labels="false"
            track-by="value"
            label="displayValue"
            :preselect-first="true"
            :allow-empty="false"
            @input="onSortChange"
          />
        </div>
      </div>

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
    </div>

    <div class="gallery__filters-row">
      <div class="gallery__filters-column">
        <!-- Location -->
        <div class="gallery__filters-item">
          <template v-if="isFish">
            <label for="fish-locations">Location</label>
            <multiselect
              id="fish-locations"
              v-model="location"
              :options="fishLocations"
              :searchable="false"
              :close-on-select="true"
              :show-labels="false"
              @input="onLocationChange"
            />
          </template>

          <template v-if="isBug">
            <label for="bug-locations">Location</label>
            <multiselect
              id="bug-locations"
              v-model="location"
              :options="bugLocations"
              :searchable="false"
              :close-on-select="true"
              :show-labels="false"
              @input="onLocationChange"
            />
          </template>
        </div>
      </div>

      <div class="gallery__filters-column">
        <!-- Caught -->
        <div class="gallery__filters-item">
          <label for="caught">Caught</label>
          <multiselect
            id="caught"
            v-model="caught"
            :options="caughtOptions"
            :searchable="false"
            :close-on-select="true"
            :show-labels="false"
            track-by="value"
            label="displayValue"
            @input="onCaughtChange"
          />
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
        <!-- Northern months available in -->
        <div class="gallery__filters-item">
          <label for="northern-months-available">Northern months available in</label>
          <multiselect
            id="northern-months-available"
            v-model="northernMonthsAvailable"
            :options="monthsOptions"
            :multiple="true"
            :show-labels="false"
            :searchable="false"
            :close-on-select="false"
            @input="onNorthernMonthsAvailableChange"
          />
        </div>
      </div>

      <div class="gallery__filters-column">
        <!-- Southern months available in -->
        <div class="gallery__filters-item">
          <label for="southern-months-available">Southern months available in</label>
          <multiselect
            id="southern-months-available"
            v-model="southernMonthsAvailable"
            :options="monthsOptions"
            :multiple="true"
            :show-labels="false"
            :searchable="false"
            :close-on-select="false"
            @input="onSouthernMonthsAvailableChange"
          />
        </div>
      </div>
    </div>

    <div class="gallery__filters-clear">
      <button class="gallery__filters-clear-button" @click="resetFilters">Reset filters</button>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import { CRITTER_TYPES, MONTHS, SORT_OPTIONS, VUEX_MUTATIONS } from '../constants';

export default {
  name: 'GalleryFilters',

  props: {
    critterType: {
      type: String,
      required: true,
    },
  },

  components: {
    Multiselect,
  },

  data () {
    return {
      sort: '',
      searchTerm: '',
      location: '',
      caught: '',
      northernMonthsAvailable: [],
      southernMonthsAvailable: [],
      monthsOptions: MONTHS,
      minBasePrice: null,
      maxBasePrice: null,
      caughtOptions: [
        {
          displayValue: 'Caught',
          value: 'caught',
        },
        {
          displayValue: 'Uncaught',
          value: 'uncaught',
        },
      ],
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
      this.$store.commit(VUEX_MUTATIONS.SET_FILTERS_SORT, this.sort.value);
    },

    onCaughtChange () {
      this.$store.commit(VUEX_MUTATIONS.SET_FILTERS_CAUGHT, this.caught ? this.caught.value : '');
    },

    onNorthernMonthsAvailableChange () {
      this.$store.commit(VUEX_MUTATIONS.SET_FILTERS_NORTHERN_MONTHS_AVAILABLE, this.northernMonthsAvailable);
    },

    onSouthernMonthsAvailableChange () {
      this.$store.commit(VUEX_MUTATIONS.SET_FILTERS_SOUTHERN_MONTHS_AVAILABLE, this.southernMonthsAvailable);
    },

    resetFilters () {
      this.sort = 'id';
      this.searchTerm = '';
      this.location = '';
      this.caught = '';
      this.minBasePrice = '';
      this.maxBasePrice = '';
      this.northernMonthsAvailable = [];
      this.southernMonthsAvailable = [];

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
        max-height: calc(100% - 72px);
        padding: 20px;
        margin-bottom: 20px;
        overflow-y: auto;
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

  .multiselect__tags {
    cursor: pointer;
    border: 1px solid #a6a6a6;

    @include breakpoint(medium) {
      height: 40px;
      overflow-y: auto;
    }
  }

  .multiselect__placeholder {
    display: none;
  }

  .multiselect__tag {
    background: $brown-darkest;
  }

  .multiselect__content-wrapper {
    z-index: 100000;
  }

  .multiselect__option {
    color: black;

    &--highlight {
      background: $brown-darkest;
      color: white;
    }

    &--selected {
      background: $brown-darkest;
      color: white;
      &.multiselect__option--highlight {
        background: $brown-darkest;
        color: white;
      }
    }
  }

  .multiselect__tag-icon {
    &:hover {
      background: $brown-darkest;
    }

    &::after {
      color: white;
    }
  }
</style>

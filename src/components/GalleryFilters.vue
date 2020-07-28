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
            :disabled="isDisabled"
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
            :placeholder="searchPlaceholder"
            :disabled="isDisabled"
            type="search"
          />
        </div>
      </div>
    </div>

    <div class="gallery__filters-row">
      <div
        v-if="isFish || isBug"
        class="gallery__filters-column"
      >
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
              :disabled="isDisabled"
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
              :disabled="isDisabled"
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
            :disabled="isDisabled"
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
            :disabled="isDisabled"
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
            :disabled="isDisabled"
            @input="onMaxBasePriceInput"
            type="number"
            placeholder="4000"
          />
        </div>
      </div>

      <div class="gallery__filters-column">
        <!-- Available Now -->
        <div class="gallery__filters-item">
          <div class="detail__caught-checkbox">
            <input
              id="available-now"
              v-model="availableNow"
              type="checkbox"
              class="detail__caught-checkbox-input"
              @change="onAvailableNowChange"
            />
            <label
              for="available-now"
              class="detail__caught-checkbox-label"
            >
              <span class="detail__caught-checkbox-checkbox"></span>
              <span class="detail__caught-checkbox-text">Available now</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="gallery__filters-row">
      <div
        v-if="hemispherePreference === HEMISPHERE_NORTHERN || hemispherePreference === ''"
        class="gallery__filters-column"
      >
        <!-- Northern months available in -->
        <div class="gallery__filters-item">
          <label for="northern-months-available">
            <template v-if="hemispherePreference === HEMISPHERE_NORTHERN">Months available in</template>
            <template v-if="hemispherePreference === ''">Northern hemisphere months available in</template>
          </label>
          <multiselect
            id="northern-months-available"
            v-model="northernMonthsAvailable"
            :options="monthsOptions"
            :multiple="true"
            :show-labels="false"
            :searchable="false"
            :close-on-select="false"
            :disabled="isDisabled"
            @input="onNorthernMonthsAvailableChange"
          />
        </div>
      </div>

      <div
        v-if="hemispherePreference === HEMISPHERE_SOUTHERN || hemispherePreference === ''"
        class="gallery__filters-column"
      >
        <!-- Southern months available in -->
        <div class="gallery__filters-item">
          <label for="southern-months-available">
            <template v-if="hemispherePreference === HEMISPHERE_SOUTHERN">Months available in</template>
            <template v-if="hemispherePreference === ''">Southern hemisphere months available in</template>
          </label>
          <multiselect
            id="southern-months-available"
            v-model="southernMonthsAvailable"
            :options="monthsOptions"
            :multiple="true"
            :show-labels="false"
            :searchable="false"
            :close-on-select="false"
            :disabled="isDisabled"
            @input="onSouthernMonthsAvailableChange"
          />
        </div>
      </div>
    </div>

    <div class="gallery__filters-clear">
      <button
        @click="resetFilters"
        :disabled="isDisabled"
        class="gallery__filters-clear-button"
      >
        Reset filters
      </button>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import { CRITTER_TYPES, MONTHS, SETTINGS, SORT_OPTIONS, VUEX_MUTATIONS } from '../constants';

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
      availableNow: false,
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

  created () {
    this.HEMISPHERE_NORTHERN = SETTINGS.HEMISPHERE_NORTHERN;
    this.HEMISPHERE_SOUTHERN = SETTINGS.HEMISPHERE_SOUTHERN;
  },

  computed: {
    isBug () {
      return this.critterType === CRITTER_TYPES.BUGS;
    },

    isFish () {
      return this.critterType === CRITTER_TYPES.FISH;
    },

    isSeaCreature () {
      return this.critterType === CRITTER_TYPES.SEA_CREATURES;
    },

    isDisabled () {
      switch (this.critterType) {
        case CRITTER_TYPES.BUGS:
          return this.$store.state.errorLoadingBugs;
        case CRITTER_TYPES.FISH:
          return this.$store.state.errorLoadingFish;
        default:
          return this.$store.state.errorLoadingSeaCreatures;
      }
    },

    searchPlaceholder () {
      switch (this.critterType) {
        case CRITTER_TYPES.BUGS:
          return 'Common Butterfly';
        case CRITTER_TYPES.FISH:
          return 'Sea Bass';
        default:
          return 'Octopus';
      }
    },

    hemispherePreference () {
      return this.$store.state.settings.hemisphere;
    },
  },

  watch: {
    hemispherePreference (newValue) {
      if (newValue === SETTINGS.HEMISPHERE_NORTHERN) {
        this.southernMonthsAvailable = [];
      } else if (newValue === SETTINGS.HEMISPHERE_SOUTHERN) {
        this.northernMonthsAvailable = [];
      }
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

    onAvailableNowChange () {
      this.$store.commit(VUEX_MUTATIONS.SET_FILTERS_AVAILABLE_NOW, this.availableNow);
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
      this.availableNow = false;

      this.$store.commit(VUEX_MUTATIONS.CLEAR_FILTERS);
    },
  },
};
</script>

<style lang="scss">
  @import '@/scss/_abstracts.scss';

  .gallery {
    &__filters {
      position: relative;
      z-index: 1;

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
        flex: 1 0 0;
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

        &:disabled {
          cursor: not-allowed;
          opacity: .6;
        }
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

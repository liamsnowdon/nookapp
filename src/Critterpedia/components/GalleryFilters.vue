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
        <!-- Donated -->
        <div class="gallery__filters-item">
          <label for="donated">Donated</label>
          <multiselect
            id="donated"
            v-model="donated"
            :options="donatedOptions"
            :searchable="false"
            :close-on-select="true"
            :show-labels="false"
            :disabled="isDisabled"
            track-by="value"
            label="displayValue"
            @input="onDonatedChange"
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
        <div class="gallery__filters-item gallery__filters-item--checkbox">
          <div class="c-checkbox">
            <input
              id="available-now"
              v-model="availableNow"
              type="checkbox"
              class="c-checkbox__input"
              @change="onAvailableNowChange"
            />
            <label
              for="available-now"
              class="c-checkbox__label"
            >
              <span class="c-checkbox__checkbox"></span>
              <span class="c-checkbox__checkbox-text">Available now</span>
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
import { createNamespacedHelpers } from 'vuex';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import { CRITTER_TYPES } from 'Critterpedia/constants/critter-types';
import { MONTHS } from 'Core/constants/date';
import { SETTINGS } from 'Critterpedia/constants/settings';
import { SORT_OPTIONS } from 'Critterpedia/constants/sort-options';
import { MODULE, MUTATIONS } from 'Critterpedia/constants/vuex';

const { mapState, mapMutations } = createNamespacedHelpers(MODULE);

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
      donated: '',
      northernMonthsAvailable: [],
      southernMonthsAvailable: [],
      monthsOptions: MONTHS,
      minBasePrice: null,
      maxBasePrice: null,
      availableNow: false,
      donatedOptions: [
        {
          displayValue: 'Donated',
          value: 'donated',
        },
        {
          displayValue: 'Not Donated',
          value: 'not_donated',
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
    ...mapState({
      errorLoadingFish: state => state.errorLoadingFish,
      errorLoadingBugs: state => state.errorLoadingBugs,
      errorLoadingSeaCreatures: state => state.errorLoadingSeaCreatures,
      hemispherePreference: state => state.settings.hemisphere,
    }),

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
          return this.errorLoadingBugs;
        case CRITTER_TYPES.FISH:
          return this.errorLoadingFish;
        default:
          return this.errorLoadingSeaCreatures;
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
    ...mapMutations([
      MUTATIONS.SET_FILTERS_SEARCH_TERM,
      MUTATIONS.SET_FILTERS_LOCATION,
      MUTATIONS.SET_FILTERS_MIN_BASE_PRICE,
      MUTATIONS.SET_FILTERS_MAX_BASE_PRICE,
      MUTATIONS.SET_FILTERS_SORT,
      MUTATIONS.SET_FILTERS_DONATED,
      MUTATIONS.SET_FILTERS_NORTHERN_MONTHS_AVAILABLE,
      MUTATIONS.SET_FILTERS_SOUTHERN_MONTHS_AVAILABLE,
      MUTATIONS.SET_FILTERS_AVAILABLE_NOW,
      MUTATIONS.CLEAR_FILTERS,
    ]),

    onSearchTermInput () {
      this.setFiltersSearchTerm(this.searchTerm);
    },

    onLocationChange () {
      this.setFiltersLocation(this.location);
    },

    onMinBasePriceInput () {
      this.setFiltersMinBasePrice(this.minBasePrice);
    },

    onMaxBasePriceInput () {
      this.setFiltersMaxBasePrice(this.maxBasePrice);
    },

    onSortChange () {
      this.setFiltersSort(this.sort.value);
    },

    onDonatedChange () {
      this.setFiltersDonated(this.donated ? this.donated.value : '');
    },

    onNorthernMonthsAvailableChange () {
      this.setFiltersNorthernMonthsAvailable(this.northernMonthsAvailable);
    },

    onSouthernMonthsAvailableChange () {
      this.setFiltersSouthernMonthsAvailable(this.southernMonthsAvailable);
    },

    onAvailableNowChange () {
      this.setFiltersAvailableNow(this.availableNow);
    },

    resetFilters () {
      this.sort = 'id';
      this.searchTerm = '';
      this.location = '';
      this.donated = '';
      this.minBasePrice = '';
      this.maxBasePrice = '';
      this.northernMonthsAvailable = [];
      this.southernMonthsAvailable = [];
      this.availableNow = false;

      this.clearFilters();
    },
  },
};
</script>

<style lang="scss">
  @import 'Core/scss/_abstracts.scss';

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
      height: calc(100% - 20px);

      > label {
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

      &--checkbox {
        display: flex;
        align-items: flex-end;

        @include breakpoint(medium) {
          justify-content: center;
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

  .c-checkbox {
    display: flex;
    justify-content: flex-end;

    &__input {
      opacity: 0;
      position: absolute;

      &:checked {
        + .c-checkbox__label {
          .c-checkbox__checkbox {
            border-color: $brown-darkest;

            &:before,
            &:after {
              opacity: 1;
            }
          }
        }
      }
    }

    &__label {
      display: inline-flex;
      align-items: center;
      padding: 0;
      font-weight: 400;
      cursor: pointer;
      user-select: none;
    }

    &__checkbox {
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
  }

  // Multiselect

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

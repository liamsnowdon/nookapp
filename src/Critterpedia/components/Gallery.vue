<template>
  <div class="gallery">
    <div class="gallery__mobile-buttons">
      <button class="gallery__mobile-button" @click="openFiltersSlider">Sort/Filters</button>
      <button class="gallery__mobile-button" @click="openQuickAddModal">Quick Add</button>
      <button class="gallery__mobile-button" @click="openSettingsModal">Settings</button>
    </div>

    <div
      :class="{'is-active': filtersSliderOpen }"
      class="gallery__filters-mobile-overlay"
    />
    <div
      :class="{'is-active': filtersSliderOpen }"
      class="gallery__filters-container"
    >
      <div class="gallery__filters-mobile-header">
        <h2>Sort/Filters</h2>
        <button class="cross" @click="closeFiltersSlider"></button>
      </div>
      <gallery-filters :critter-type="critterType" />
    </div>

    <template v-if="loading">
      <div class="gallery__loading">
        <spinner />
      </div>
    </template>

    <template v-else-if="error">
      <div class="text-center">{{ errorMessage }}</div>
    </template>

    <template v-else>
      <h2 class="gallery__title">{{ title }}</h2>

      <div v-show="filteredCritters.length" class="gallery__grid">
        <button
          v-for="critter in filteredCritters"
          :key="critter.id"
          @click="setSelectedCritter(critter)"
          :style="{backgroundImage: `url(https://acnhapi.com/v1/icons/${critterType}/${critter.id}`}"
          :class="{'is-active': isActiveCritter(critter.id)}"
          class="gallery__item"
        >
        <span class="gallery__item-hover">
          {{ critter.name['name-EUen'] }}
        </span>
        </button>
      </div>

      <div v-show="!filteredCritters.length" class="text-center">
        No critters match your filters.
      </div>
    </template>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { CRITTER_TYPES } from 'Critterpedia/constants/critter-types';
import { MONTHS } from 'Core/constants/date';
import { SORT_OPTIONS } from 'Critterpedia/constants/sort-options';
import { MODULE, MUTATIONS, GETTERS } from 'Critterpedia/constants/vuex';
import { MESSAGES } from 'Critterpedia/constants/messages';
import { SETTINGS } from 'Critterpedia/constants/settings';
import GalleryFilters from 'Critterpedia/components/GalleryFilters.vue';
import Spinner from 'Core/components/Spinner.vue';

const { mapState, mapGetters, mapMutations } = createNamespacedHelpers(MODULE);

export default {
  name: 'Gallery',

  props: {
    critters: {
      type: Array,
      required: true,
    },
    critterType: {
      type: String,
      required: true,
    },
  },

  components: {
    GalleryFilters,
    Spinner,
  },

  data () {
    return {
      filtersSliderOpen: false,
      months: MONTHS,
    };
  },

  created () {
    this.MONTHS = MONTHS;
  },

  computed: {
    ...mapState({
      loading: state => state.loading,
      errorLoadingFish: state => state.errorLoadingFish,
      errorLoadingBugs: state => state.errorLoadingBugs,
      errorLoadingSeaCreatures: state => state.errorLoadingSeaCreatures,
      filters: state => state.filters,
      donatedBugs: state => state.donatedBugs,
      donatedFish: state => state.donatedFish,
      donatedSeaCreatures: state => state.donatedSeaCreatures,
      selectedBug: state => state.selectedBug,
      selectedFish: state => state.selectedFish,
      selectedSeaCreature: state => state.selectedSeaCreature,
      hemispherePreference: state => state.hemispherePreference,
    }),

    ...mapGetters({
      hasSelectedNorthernMonthsInFilter: GETTERS.HAS_SELECTED_NORTHERN_MONTHS_IN_FILTER,
      hasSelectedSouthernMonthsInFilter: GETTERS.HAS_SELECTED_SOUTHERN_MONTHS_IN_FILTER,
    }),

    title () {
      let title;

      switch (this.critterType) {
        case CRITTER_TYPES.FISH:
          title = 'Fish';
          break;
        case CRITTER_TYPES.BUGS:
          title = 'Bugs';
          break;
        case CRITTER_TYPES.SEA_CREATURES:
          title = 'Sea Creatures';
          break;
        default:
          break;
      }

      return title;
    },

    error () {
      switch (this.critterType) {
        case CRITTER_TYPES.FISH:
          return this.errorLoadingFish;
        case CRITTER_TYPES.BUGS:
          return this.errorLoadingBugs;
        default:
          return this.errorLoadingSeaCreatures;
      }
    },

    errorMessage () {
      return MESSAGES.API_ERROR;
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

    filteredCritters () {
      let critters = this.critters;

      // -------------------------------------- //
      //                FILTERS                 //
      // -------------------------------------- //

      // Search term
      critters = this.filterByTerm(critters, this.filters.searchTerm);

      // Location
      critters = this.filterByLocation(critters, this.filters.location);

      // Min base price
      critters = this.filterByMinBasePrice(critters, this.filters.minBasePrice);

      // Max base price
      critters = this.filterByMaxBasePrice(critters, this.filters.maxBasePrice);

      // Donated
      critters = this.filterByDonatedStatus(critters, this.filters.donated);

      // Northern months available in
      critters = this.filterByNorthernMonthsAvailableIn(critters, this.filters.northernMonthsAvailable);

      // Southern months available in
      critters = this.filterBySouthernMonthsAvailableIn(critters, this.filters.southernMonthsAvailable);

      // Available now
      critters = this.filterByAvailableNow(critters, this.filters.availableNow);

      // --------------------------------------- //
      //                  SORT                   //
      // --------------------------------------- //

      critters = this.sortBy(critters, this.filters.sort);

      return critters;
    },
  },

  methods: {
    ...mapMutations([
      MUTATIONS.SET_SELECTED_BUG,
      MUTATIONS.SET_SELECTED_SEA_CREATURE,
      MUTATIONS.SET_SELECTED_FISH,
      MUTATIONS.SET_SETTINGS_MODAL_OPEN,
      MUTATIONS.SET_QUICK_ADD_MODAL_OPEN,
      MUTATIONS.SET_DETAIL_MODAL_OPEN,
    ]),

    setSelectedCritter (critter) {
      if (this.isBug) {
        if (this.selectedBug.id === critter.id) {
          return;
        }

        this.setSelectedBug(critter);
      } else if (this.isSeaCreature) {
        if (this.selectedSeaCreature.id === critter.id) {
          return;
        }

        this.setSelectedSeaCreature(critter);
      } else {
        if (this.selectedFish.id === critter.id) {
          return;
        }

        this.setSelectedFish(critter);
      }

      this.setDetailModalOpen(true);
    },

    isActiveCritter (id) {
      if (this.isBug) {
        return this.selectedBug.id === id;
      } else if (this.isSeaCreature) {
        return this.selectedSeaCreature.id === id;
      } else {
        return this.selectedFish.id === id;
      }
    },

    openFiltersSlider () {
      this.filtersSliderOpen = true;
    },

    closeFiltersSlider () {
      this.filtersSliderOpen = false;
    },

    openQuickAddModal () {
      this.setQuickAddModalOpen(true);
    },

    openSettingsModal () {
      this.setSettingsModalOpen(true);
    },

    monthsStringToArray (critter, hemisphere) {
      const monthsString = critter.availability[`month-${hemisphere}`];
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
        return this.MONTHS[month - 1];
      });

      return months;
    },

    /**
     * Filter by term
     * Term can filter against name or ID
     *
     * @param {Array} critters
     * @param {string} term
     * @returns {Array}
     */
    filterByTerm (critters, term) {
      if (!term) {
        return critters;
      }

      return critters.filter((critter) => {
        return critter.name['name-EUen'].toLowerCase().includes(term.toLowerCase()) ||
          critter.id === Number(term);
      });
    },

    /**
     * Filter by location
     *
     * @param {Array} critters
     * @param {string} location
     * @returns {Array}
     */
    filterByLocation (critters, location) {
      if (!location) {
        return critters;
      }

      return critters.filter((critter) => {
        return critter.availability.location === location;
      });
    },

    /**
     * Filter by min base price
     *
     * @param {Array} critters
     * @param {number} minBasePrice
     * @returns {Array}
     */
    filterByMinBasePrice (critters, minBasePrice) {
      if (!minBasePrice) {
        return critters;
      }

      return critters.filter((critter) => {
        return critter.price >= minBasePrice;
      });
    },

    /**
     * Filter by max base price
     *
     * @param {Array }critters
     * @param {string} maxBasePrice
     * @returns {Array}
     */
    filterByMaxBasePrice (critters, maxBasePrice) {
      if (!maxBasePrice) {
        return critters;
      }

      return critters.filter((critter) => {
        return critter.price <= maxBasePrice;
      });
    },

    /**
     * Filter by donated status
     *
     * @param {Array} critters
     * @param {string} donated
     * @returns {Array}
     */
    filterByDonatedStatus (critters, donated) {
      if (!donated) {
        return critters;
      }

      if (donated === 'donated') {
        return critters.filter((critter) => {
          if (this.isBug) {
            return this.donatedBugs.includes(critter.id);
          } else if (this.isSeaCreature) {
            return this.donatedSeaCreatures.includes(critter.id);
          } else {
            return this.donatedFish.includes(critter.id);
          }
        });
      } else if (donated === 'not_donated') {
        return critters.filter((critter) => {
          if (this.isBug) {
            return !this.donatedBugs.includes(critter.id);
          } else if (this.isSeaCreature) {
            return !this.donatedSeaCreatures.includes(critter.id);
          } else {
            return !this.donatedFish.includes(critter.id);
          }
        });
      }
    },

    /**
     * Filter by northern months selected in multiselect
     *
     * @param {Array} critters
     * @param {Array} northernMonths
     * @returns {Array}
     */
    filterByNorthernMonthsAvailableIn (critters, northernMonths) {
      if (!this.hasSelectedNorthernMonthsInFilter || this.filters.northernMonthsAvailable.length === 12) {
        return critters;
      }

      return critters.filter((critter) => {
        if (critter.availability.isAllYear) {
          return true;
        }

        const months = this.monthsStringToArray(critter, 'northern');

        return months.some(month => northernMonths.indexOf(month) !== -1);
      });
    },

    /**
     * Filter by southern months selected in multiselect
     *
     * @param {Array} critters
     * @param {Array} southernMonths
     * @returns {Array}
     */
    filterBySouthernMonthsAvailableIn (critters, southernMonths) {
      if (!this.hasSelectedSouthernMonthsInFilter || this.filters.southernMonthsAvailable.length === 12) {
        return critters;
      }

      return critters.filter((critter) => {
        if (critter.availability.isAllYear) {
          return true;
        }

        const months = this.monthsStringToArray(critter, 'southern');

        return months.some(month => southernMonths.indexOf(month) !== -1);
      });
    },

    /**
     * Filter by available now
     *
     * @param {Array} critters
     * @param {boolean} availableNow
     * @returns {Array}
     */
    filterByAvailableNow (critters, availableNow) {
      if (!availableNow) {
        return critters;
      }

      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentHour = currentDate.getHours();

      switch (this.hemispherePreference) {
        case SETTINGS.HEMISPHERE_NORTHERN:
        case SETTINGS.HEMISPHERE_SOUTHERN:
          return critters.filter((critter) => {
            return critter.availability[`month-array-${this.hemispherePreference}`].includes(currentMonth + 1) &&
              critter.availability['time-array'].includes(currentHour);
          });
        default:
          return critters.filter((critter) => {
            return (critter.availability['month-array-northern'].includes(currentMonth + 1) ||
              critter.availability['month-array-southern'].includes(currentMonth + 1)) &&
              critter.availability['time-array'].includes(currentHour);
          });
      }
    },

    /**
     * Sort
     *
     * @param {Array} critters
     * @param {string} sort
     * @returns {Array}
     */
    sortBy (critters, sort) {
      switch (sort) {
        case SORT_OPTIONS.ALPHABETICAL_ASCENDING:
        case SORT_OPTIONS.ALPHABETICAL_DESCENDING:
          return critters.slice().sort((a, b) => {
            const nameA = a.name['name-EUen'].toLowerCase();
            const nameB = b.name['name-EUen'].toLowerCase();

            if (sort === SORT_OPTIONS.ALPHABETICAL_ASCENDING) {
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
            } else {
              if (nameA > nameB) {
                return -1;
              }
              if (nameA < nameB) {
                return 1;
              }
            }

            return 0;
          });
        case SORT_OPTIONS.PRICE_ASCENDING:
          return critters.slice().sort((a, b) => a.price - b.price);
        case SORT_OPTIONS.PRICE_DESCENDING:
          return critters.slice().sort((a, b) => b.price - a.price);
        default:
          return critters.slice().sort((a, b) => a.id - b.id);
      }
    },
  },
};
</script>

<style lang="scss">
  @import 'Core/scss/_abstracts.scss';

  .gallery {
    $block: &;

    max-width: $global-width;
    margin: 0 auto;
    padding: 20px;

    @include breakpoint(medium) {
      display: flex;
      flex-direction: column;
      padding: 40px;
    }

    &__title {
      margin: 0 0 30px 0;
      text-align: center;
    }

    &__mobile-buttons {
      @include breakpoint(medium) {
        display: none;
      }

      display: flex;
      justify-content: space-evenly;
      margin-bottom: 50px;
    }

    &__mobile-button {
      @extend %button-reset;
      text-decoration: underline;
    }

    &__filters-container {
      @include breakpoint(medium, down) {
        position: fixed;
        left: -100%;
        top: 0;
        bottom: 0;
        width: calc(100% - 60px);
        @include z-index(slider);
        background-color: $brown-light;
        transition: left 0.5s ease-in-out;

        &.is-active {
          left: 0;
        }
      }
    }

    &__filters-mobile-overlay {
      @include breakpoint(medium) {
        display: none;
      }

      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      @include z-index(sliderOverlay);
      background: rgba(0, 0, 0, 0.7);
      opacity: 0;
      visibility: hidden;
      transition: opacity .5s ease-in-out, visibility .5s ease-in-out;

      &.is-active {
        opacity: 1;
        visibility: visible;
      }
    }

    &__filters-mobile-header {
      @include breakpoint(medium) {
        display: none;
      }

      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px;
      background-color: $brown-dark;

      h2 {
        margin: 0;
      }
    }

    &__loading {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    &__grid {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      padding: 20px;
      margin: -20px;

      @include breakpoint(medium, down) {
        flex-direction: column;
        height: 480px;
        overflow-x: auto;
      }
    }

    &__item {
      position: relative;
      height: 90px;
      width: 90px;
      padding: 0;
      margin: 10px;
      border: 1px solid black;
      border-radius: 50%;
      background: center / contain no-repeat $brown-light;
      appearance: none;
      overflow: hidden;

      @include breakpoint(medium) {
        height: 120px;
        width: 120px;
      }

      img {
        max-width: 100%;
        height: auto;
      }

      &:hover,
      &:focus {
        #{$block}__item-hover {
          opacity: 1;
          visibility: visible;
        }
      }

      &:focus {
        outline: 0;
      }

      &.is-active {
        box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.75);
      }
    }

    &__item-hover {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      padding: 10px;
      border-radius: 50%;
      opacity: 0;
      visibility: hidden;
      background: rgba(0, 0, 0, 0.6);
      color: white;
      font-size: 16px;
      font-weight: bold;
      line-height: 1.5;
      text-transform: capitalize;
      transition: opacity .5s ease-in-out, visibility .5s ease-in-out;
      cursor: pointer;
    }
  }
</style>

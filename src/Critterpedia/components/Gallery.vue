<template>
  <div class="gallery">
    <div class="gallery__mobile-buttons">
      <button class="gallery__mobile-button" @click="openFiltersSlider">Sort/Filters</button>
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
      <div v-show="filteredCritters.length" class="gallery__grid">
        <button
          v-for="critter in filteredCritters"
          :key="critter.id"
          @click="setSelectedCritter(critter)"
          :style="{backgroundImage: `url(http://acnhapi.com/v1/icons/${critterType}/${critter.id}`}"
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
import { CRITTER_TYPES, MONTHS, SORT_OPTIONS, VUEX_MUTATIONS, MESSAGES, MODULE } from '../constants';
import GalleryFilters from './GalleryFilters';
import Spinner from '@/Core/components/Spinner.vue';

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

  computed: {
    ...mapState({
      loading: state => state.loading,
      errorLoadingFish: state => state.errorLoadingFish,
      errorLoadingBugs: state => state.errorLoadingBugs,
      errorLoadingSeaCreatures: state => state.errorLoadingSeaCreatures,
      filters: state => state.filters,
      caughtBugs: state => state.caughtBugs,
      caughtFish: state => state.caughtFish,
      caughtSeaCreatures: state => state.caughtSeaCreatures,
      selectedBug: state => state.selectedBug,
      selectedFish: state => state.selectedFish,
      selectedSeaCreature: state => state.selectedSeaCreature,
    }),

    ...mapGetters({
      hasSelectedNorthernMonthsInFilter: 'hasSelectedNorthernMonthsInFilter',
      hasSelectedSouthernMonthsInFilter: 'hasSelectedSouthernMonthsInFilter',
    }),

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

    hasNorthernMonthsInFilter () {
      return this.hasSelectedNorthernMonthsInFilter;
    },

    hasSouthernMonthsInFilter () {
      return this.hasSelectedSouthernMonthsInFilter;
    },

    filteredCritters () {
      let critters = this.critters;

      // --------------------------------------- //
      //                  SORT                   //
      // --------------------------------------- //

      switch (this.filters.sort) {
        case SORT_OPTIONS.ALPHABETICAL_ASCENDING:
        case SORT_OPTIONS.ALPHABETICAL_DESCENDING:
          critters.sort((a, b) => {
            const nameA = a.name['name-EUen'].toLowerCase();
            const nameB = b.name['name-EUen'].toLowerCase();

            if (this.filters.sort === SORT_OPTIONS.ALPHABETICAL_ASCENDING) {
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
          break;
        case SORT_OPTIONS.PRICE_ASCENDING:
          critters.sort((a, b) => a.price - b.price);
          break;
        case SORT_OPTIONS.PRICE_DESCENDING:
          critters.sort((a, b) => b.price - a.price);
          break;
        default:
          critters.sort((a, b) => a.id - b.id);
      }

      // -------------------------------------- //
      //                FILTERS                 //
      // -------------------------------------- //

      /*
       * Search by:
       *
       * 1. Name
       * 2. ID
       */
      if (this.filters.searchTerm) {
        critters = critters.filter((critter) => {
          return critter.name['name-EUen'].toLowerCase().includes(this.filters.searchTerm.toLowerCase()) ||
             critter.id === Number(this.filters.searchTerm);
        });
      }

      // Location
      if (this.filters.location) {
        critters = critters.filter((critter) => {
          return critter.availability.location === this.filters.location;
        });
      }

      // Min base price
      if (this.filters.minBasePrice) {
        critters = critters.filter((critter) => {
          return critter.price >= this.filters.minBasePrice;
        });
      }

      // Max base price
      if (this.filters.maxBasePrice) {
        critters = critters.filter((critter) => {
          return critter.price <= this.filters.maxBasePrice;
        });
      }

      // Caught
      if (this.filters.caught) {
        if (this.filters.caught === 'caught') {
          critters = critters.filter((critter) => {
            if (this.isBug) {
              return this.caughtBugs.includes(critter.id);
            } else if (this.isSeaCreature) {
              return this.caughtSeaCreatures.includes(critter.id);
            } else {
              return this.caughtFish.includes(critter.id);
            }
          });
        } else if (this.filters.caught === 'uncaught') {
          critters = critters.filter((critter) => {
            if (this.isBug) {
              return !this.caughtBugs.includes(critter.id);
            } else if (this.isSeaCreature) {
              return !this.caughtSeaCreatures.includes(critter.id);
            } else {
              return !this.caughtFish.includes(critter.id);
            }
          });
        }
      }

      // Northern months available in
      if (this.hasNorthernMonthsInFilter && this.filters.northernMonthsAvailable.length !== 12) {
        critters = critters.filter((critter) => {
          if (critter.availability.isAllYear) {
            return true;
          }

          const months = this.monthsStringToArray(critter, 'northern');

          return months.some(month => this.filters.northernMonthsAvailable.indexOf(month) !== -1);
        });
      }

      // Southern months available in
      if (this.hasSouthernMonthsInFilter && this.filters.southernMonthsAvailable.length !== 12) {
        critters = critters.filter((critter) => {
          if (critter.availability.isAllYear) {
            return true;
          }

          const months = this.monthsStringToArray(critter, 'southern');

          return months.some(month => this.filters.southernMonthsAvailable.indexOf(month) !== -1);
        });
      }

      return critters;
    },
  },

  methods: {
    ...mapMutations([
      VUEX_MUTATIONS.SET_SELECTED_BUG,
      VUEX_MUTATIONS.SET_SELECTED_SEA_CREATURE,
      VUEX_MUTATIONS.SET_SELECTED_FISH,
      VUEX_MUTATIONS.SET_SETTINGS_MODAL_OPEN,
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
        return this.months[month - 1];
      });

      return months;
    },
  },
};
</script>

<style lang="scss">
  @import '@/Core/scss/_abstracts.scss';
  @import '@/Critterpedia/scss/_variables.scss';

  .gallery {
    $block: &;

    @include breakpoint(medium) {
      display: flex;
      flex-direction: column;
    }

    &__mobile-buttons {
      @include breakpoint(medium) {
        display: none;
      }

      display: flex;
      justify-content: space-evenly;
      margin-bottom: 20px;
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

    &__filters {
      @include breakpoint(medium) {
        margin-bottom: 40px;
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
      flex-flow: column wrap;
      overflow-x: auto;
      max-height: 100%;
      padding: 20px;
      margin: -20px;

      @include breakpoint(medium) {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 20px;
        overflow-y: auto;
      }

      @include breakpoint(medium, down) {
        height: 260px;
        border-bottom: 1px solid $brown-border;
      }
    }

    &__item {
      position: relative;
      height: 150px;
      padding: 0;
      border: 1px solid black;
      border-radius: 50%;
      background: center / contain no-repeat $brown-light;
      appearance: none;
      overflow: hidden;

      @include breakpoint(medium, down) {
        width: 90px;
        height: 90px;
        margin: 5px;
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

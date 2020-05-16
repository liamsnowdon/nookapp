<template>
  <div class="gallery">
    <gallery-filters :critter-type="critterType" />

    <template v-if="loading">
      Loading...
    </template>

    <template v-else>
      <div v-show="filteredCritters.length" class="gallery__grid">
        <button
          v-for="critter in filteredCritters"
          :key="critter.id"
          @click="setSelectedCritter(critter)"
          :style="{backgroundImage: `url(http://acnhapi.com/icons/${critterType}/${critter.id}`}"
          :class="{'is-active': isActiveCritter(critter.id)}"
          class="gallery__item"
        >
        <span class="gallery__item-hover">
          {{ critter.name['name-en'] }}
        </span>
        </button>
      </div>

      <div v-show="!filteredCritters.length">
        No critters match your filters.
      </div>
    </template>
  </div>
</template>

<script>
import { SORT_OPTIONS } from '../constants';
import GalleryFilters from './GalleryFilters';

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
  },

  data () {
    return {

    };
  },

  computed: {
    loading () {
      return this.$store.state.loading;
    },

    isBug () {
      return this.critterType === 'bugs';
    },

    isFish () {
      return this.critterType === 'fish';
    },

    filteredCritters () {
      let critters = this.critters;

      // --------------------------------------- //
      //                  SORT                   //
      // --------------------------------------- //

      switch (this.$store.state.filters.sort) {
        case SORT_OPTIONS.ALPHABETICAL_ASCENDING:
        case SORT_OPTIONS.ALPHABETICAL_DESCENDING:
          critters.sort((a, b) => {
            const nameA = a.name['name-en'].toLowerCase();
            const nameB = b.name['name-en'].toLowerCase();

            if (this.$store.state.filters.sort === SORT_OPTIONS.ALPHABETICAL_ASCENDING) {
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
      if (this.$store.state.filters.searchTerm) {
        critters = critters.filter((critter) => {
          return critter.name['name-en'].toLowerCase().includes(this.$store.state.filters.searchTerm.toLowerCase()) ||
             critter.id === Number(this.$store.state.filters.searchTerm);
        });
      }

      // Location
      if (this.$store.state.filters.location) {
        critters = critters.filter((critter) => {
          return critter.availability.location === this.$store.state.filters.location;
        });
      }

      // Min base price
      if (this.$store.state.filters.minBasePrice) {
        critters = critters.filter((critter) => {
          return critter.price >= this.$store.state.filters.minBasePrice;
        });
      }

      // Max base price
      if (this.$store.state.filters.maxBasePrice) {
        critters = critters.filter((critter) => {
          return critter.price <= this.$store.state.filters.maxBasePrice;
        });
      }

      return critters;
    },
  },

  methods: {
    setSelectedCritter (critter) {
      if (this.critterType === 'bugs') {
        if (this.$store.state.selectedBug.id === critter.id) {
          return;
        }

        this.$store.commit('setSelectedBug', critter);
      } else {
        if (this.$store.state.selectedFish.id === critter.id) {
          return;
        }

        this.$store.commit('setSelectedFish', critter);
      }
    },

    isActiveCritter (id) {
      if (this.critterType === 'bugs') {
        return this.$store.state.selectedBug.id === id;
      } else {
        return this.$store.state.selectedFish.id === id;
      }
    },
  },
};
</script>

<style lang="scss">
  @import '@/scss/_abstracts.scss';

  .gallery {
    $block: &;

    &__grid {
      display: flex;
      flex-flow: column wrap;
      overflow-x: auto;
      max-height: 100%;

      @include breakpoint(medium) {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 20px;
        overflow-y: auto;
      }

      @include breakpoint(medium, down) {
        height: 200px;
      }
    }

    &__item {
      position: relative;
      height: 150px;
      padding: 0;
      border: 1px solid black;
      border-radius: 50%;
      background: center / contain no-repeat #fffcdd;
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

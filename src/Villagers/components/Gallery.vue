<template>
  <div class="gallery">
    <div class="gallery__mobile-buttons">
      <button class="gallery__mobile-button" @click="openFiltersSlider">Sort/Filters</button>
    </div>

    <div
      :class="{'is-active': filtersSliderOpen }"
      class="gallery__filters-mobile-overlay"
    />
    <div class="gallery__filters-dream-team">
      <div
        :class="{'is-active': filtersSliderOpen }"
        class="gallery__filters-container"
      >
        <div class="gallery__filters-mobile-header">
          <h2>Sort/Filters</h2>
          <button class="cross" @click="closeFiltersSlider"></button>
        </div>

        <GalleryFilters />
      </div>

      <div class="gallery__dream-team">
        <DreamTeam />
      </div>
    </div>

    <template v-if="loading">
      <div class="gallery__loading">
        <Spinner />
      </div>
    </template>

    <template v-else-if="errorLoadingVillagers">
      <div class="text-center">{{ errorMessage }}</div>
    </template>

    <template v-else>
      <div v-show="filteredVillagers.length" class="gallery__grid">
        <button
          v-for="villager in filteredVillagers"
          :key="villager.id"
          @click="setSelectedItem(villager)"
          :style="{backgroundImage: `url(https://acnhapi.com/v1/icons/villagers/${villager.id}`}"
          :class="{'is-active': isActiveVillager(villager.id)}"
          class="gallery__item"
        >
        <span class="gallery__item-hover">
          {{ villager.name['name-EUen'] }}
        </span>
        </button>
      </div>

      <div v-show="!filteredVillagers.length" class="text-center">
        No villagers match your filters.
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { MODULE, MUTATIONS } from 'Villagers/constants/vuex';
import { MESSAGES } from 'Villagers/constants/messages';

import GalleryFilters from 'Villagers/components/GalleryFilters.vue';
import DreamTeam from 'Villagers/components/DreamTeam.vue';
import Spinner from 'Core/components/Spinner.vue';

export default {
  name: 'Gallery',

  components: {
    GalleryFilters,
    DreamTeam,
    Spinner,
  },

  data () {
    return {
      filtersSliderOpen: false,
    };
  },

  computed: {
    ...mapState(MODULE, {
      loading: state => state.loading,
      villagers: state => state.villagers,
      errorLoadingVillagers: state => state.errorLoadingVillagers,
      filters: state => state.filters,
      selectedVillager: state => state.selectedVillager,
    }),

    errorMessage () {
      return MESSAGES.API_ERROR;
    },

    filteredVillagers () {
      let villagers = this.villagers;

      villagers = this.filterByTerm(villagers, this.filters.searchTerm);
      villagers = this.filterByPersonality(villagers, this.filters.personality);
      villagers = this.filterBySpecies(villagers, this.filters.species);
      villagers = this.filterByGender(villagers, this.filters.gender);

      return villagers;
    },
  },

  methods: {
    ...mapMutations(MODULE, [
      MUTATIONS.SET_SELECTED_VILLAGER,
      MUTATIONS.SET_DETAIL_MODAL_OPEN,
    ]),

    setSelectedItem (villager) {
      if (this.selectedVillager.id === villager.id) {
        return;
      }

      this.setSelectedVillager(villager);

      this.setDetailModalOpen(true);
    },

    openFiltersSlider () {
      this.filtersSliderOpen = true;
    },

    closeFiltersSlider () {
      this.filtersSliderOpen = false;
    },

    /**
     * Filter by term
     * Term can filter against name
     *
     * @param {Array} villagers
     * @param {string} term
     * @returns {Array}
     */
    filterByTerm (villagers, term) {
      if (!term) {
        return villagers;
      }

      return villagers.filter((villager) => {
        return villager.name['name-EUen'].toLowerCase().includes(term.toLowerCase());
      });
    },

    /**
     * Filter by species
     *
     * @param {Array} villagers
     * @param {string} species
     * @returns {Array}
     */
    filterBySpecies (villagers, species) {
      if (!species) {
        return villagers;
      }

      return villagers.filter((villager) => {
        return villager.species === species;
      });
    },

    /**
     * Filter by species
     *
     * @param {Array} villagers
     * @param {string} personality
     * @returns {Array}
     */
    filterByPersonality (villagers, personality) {
      if (!personality) {
        return villagers;
      }

      return villagers.filter((villager) => {
        return villager.personality === personality;
      });
    },

    /**
     * Filter by species
     *
     * @param {Array} villagers
     * @param {string} gender
     * @returns {Array}
     */
    filterByGender (villagers, gender) {
      if (!gender) {
        return villagers;
      }

      return villagers.filter((villager) => {
        return villager.gender === gender;
      });
    },

    isActiveVillager (id) {
      return this.selectedVillager.id === id;
    },
  },
};
</script>

<style lang="scss" scoped>
  .gallery__filters-dream-team {
    display: flex;
  }

  .gallery__filters-container {
    flex: 1 1 0;
  }

  .gallery__dream-team {
    flex: 1 1 0;
  }
</style>

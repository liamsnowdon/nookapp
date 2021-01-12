<template>
  <div class="gallery__filters">
    <div class="gallery__filters-items">
      <!-- Search term -->
      <div class="gallery__filters-item">
        <label for="searchTerm">Search by name</label>
        <input
          id="searchTerm"
          v-model="searchTerm"
          @input="onSearchTermInput"
          placeholder="Alice"
          :disabled="errorLoadingVillagers"
          type="search"
        />
      </div>

      <!-- Species -->
      <div class="gallery__filters-item">
        <label for="species">Species</label>
        <multiselect
          id="species"
          v-model="species"
          :options="speciesOptions"
          :searchable="false"
          :close-on-select="true"
          :show-labels="false"
          :disabled="errorLoadingVillagers"
          @input="onSpeciesChange"
        />
      </div>

      <!-- Personality -->
      <div class="gallery__filters-item">
        <label for="personality">Personality</label>
        <multiselect
          id="personality"
          v-model="personality"
          :options="personalityOptions"
          :searchable="false"
          :close-on-select="true"
          :show-labels="false"
          :disabled="errorLoadingVillagers"
          @input="onPersonalityChange"
        />
      </div>

      <!-- Gender -->
      <div class="gallery__filters-item">
        <label for="gender">Gender</label>
        <multiselect
          id="gender"
          v-model="gender"
          :options="genderOptions"
          :searchable="false"
          :close-on-select="true"
          :show-labels="false"
          :disabled="errorLoadingVillagers"
          @input="onGenderChange"
        />
      </div>
    </div>

    <div class="gallery__filters-clear">
      <button
        @click="resetFilters"
        :disabled="errorLoadingVillagers"
        class="gallery__filters-clear-button"
      >
        Reset filters
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import Multiselect from 'vue-multiselect';
import { MODULE, GETTERS, MUTATIONS } from 'Villagers/constants/vuex';

export default {
  name: 'GalleryFilters',

  components: {
    Multiselect,
  },

  data () {
    return {
      searchTerm: '',
      species: '',
      personality: '',
      gender: '',
      genderOptions: [
        'Male',
        'Female',
      ],
    };
  },

  computed: {
    ...mapState(MODULE, {
      errorLoadingVillagers: state => state.errorLoadingVillagers,
    }),

    ...mapGetters(MODULE, [
      GETTERS.SPECIES_OPTIONS,
      GETTERS.PERSONALITY_OPTIONS,
    ]),
  },

  methods: {
    ...mapMutations(MODULE, [
      MUTATIONS.SET_FILTERS_SEARCH_TERM,
      MUTATIONS.SET_FILTERS_SPECIES,
      MUTATIONS.SET_FILTERS_PERSONALITY,
      MUTATIONS.SET_FILTERS_GENDER,
      MUTATIONS.CLEAR_FILTERS,
    ]),

    onSearchTermInput () {
      this.setFiltersSearchTerm(this.searchTerm);
    },

    onSpeciesChange () {
      this.setFiltersSpecies(this.species);
    },

    onPersonalityChange () {
      this.setFiltersPersonality(this.personality);
    },

    onGenderChange () {
      this.setFiltersGender(this.gender);
    },

    resetFilters () {
      this.searchTerm = '';
      this.species = '';
      this.personality = '';
      this.gender = '';

      this.clearFilters();
    },
  },
};
</script>

<style lang="scss" scoped>
  .gallery__filters-item {
    @include breakpoint(medium) {
      flex: 0 0 50%;
    }
  }
</style>

export default {
  setLoading (state, loading = true) {
    state.loading = loading;
  },

  setVillagers (state, villagers) {
    state.villagers = villagers;
  },

  setErrorLoadingVillagers (state, error) {
    state.errorLoadingVillagers = error;
  },

  setSelectedVillager (state, villager) {
    state.selectedVillager = villager;
  },

  setDetailModalOpen (state, open) {
    state.detailModalOpen = open;
  },

  setDreamTeamVillagers (state, villagers) {
    state.dreamTeamVillagers = villagers;
  },

  setFiltersSearchTerm (state, term) {
    state.filters.searchTerm = term;
  },

  setFiltersSpecies (state, species) {
    state.filters.species = species;
  },

  setFiltersPersonality (state, personality) {
    state.filters.personality = personality;
  },

  setFiltersGender (state, gender) {
    state.filters.gender = gender;
  },

  clearFilters (state) {
    state.filters.searchTerm = '';
    state.filters.species = '';
    state.filters.personality = '';
    state.filters.gender = '';
  },
};

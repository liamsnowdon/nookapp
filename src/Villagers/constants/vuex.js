export const MODULE = 'villagers';

export const MUTATIONS = {
  SET_LOADING: 'setLoading',

  SET_VILLAGERS: 'setVillagers',
  SET_ERROR_LOADING_VILLAGERS: 'setErrorLoadingVillagers',
  SET_SELECTED_VILLAGER: 'setSelectedVillager',

  SET_DETAIL_MODAL_OPEN: 'setDetailModalOpen',

  SET_FILTERS_SEARCH_TERM: 'setFiltersSearchTerm',
  SET_FILTERS_SPECIES: 'setFiltersSpecies',
  SET_FILTERS_PERSONALITY: 'setFiltersPersonality',
  SET_FILTERS_GENDER: 'setFiltersGender',
  CLEAR_FILTERS: 'clearFilters',
};

export const ACTIONS = {
  GET_VILLAGERS: 'getVillagers',
};

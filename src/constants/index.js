export const CRITTER_TYPES = {
  BUGS: 'bugs',
  FISH: 'fish',
};

export const STORAGE = {
  CAUGHT_BUGS: 'caughtBugs',
  CAUGHT_FISH: 'caughtFish',
  SETTINGS_THEME: 'settingsTheme',
};

export const SORT_OPTIONS = {
  ID: 'id',
  ALPHABETICAL_ASCENDING: 'alphabeticalAscending',
  ALPHABETICAL_DESCENDING: 'alphabeticalDescending',
  PRICE_ASCENDING: 'priceAscending',
  PRICE_DESCENDING: 'priceDescending',
};

export const API = {
  BASE: 'https://acnhapi.com',
  FISH: '/fish',
  BUGS: '/bugs',
};

export const VUEX_MUTATIONS = {
  SET_LOADING: 'setLoading',
  SET_IS_STORAGE_AVAILABLE: 'setIsStorageAvailable',

  SET_SETTINGS_THEME: 'setSettingsTheme',
  SET_SETTINGS_MODAL_OPEN: 'setSettingsModalOpen',

  SET_FISH: 'setFish',
  SET_BUGS: 'setBugs',
  SET_SELECTED_FISH: 'setSelectedFish',
  SET_SELECTED_BUG: 'setSelectedBug',

  CLEAR_CAUGHT_FISH: 'clearCaughtFish',
  CLEAR_CAUGHT_BUGS: 'clearCaughtBugs',
  SET_CAUGHT_FISH: 'setCaughtFish',
  SET_CAUGHT_BUGS: 'setCaughtBugs',
  SET_CAUGHT_CRITTER_STATUS: 'setCaughtCritterStatus',

  SET_FILTERS_SORT: 'setFiltersSort',
  SET_FILTERS_SEARCH_TERM: 'setFiltersSearchTerm',
  SET_FILTERS_LOCATION: 'setFiltersLocation',
  SET_FILTERS_MIN_BASE_PRICE: 'setFiltersMinBasePrice',
  SET_FILTERS_MAX_BASE_PRICE: 'setFiltersMaxBasePrice',
  SET_FILTERS_CAUGHT: 'setFiltersCaught',
  CLEAR_FILTERS: 'clearFilters',
};

export const VUEX_ACTIONS = {
  CATCH_FISH: 'catchFish',
  CATCH_BUGS: 'catchBugs',
};

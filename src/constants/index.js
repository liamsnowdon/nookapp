export const CRITTER_TYPES = {
  BUGS: 'bugs',
  FISH: 'fish',
  SEA_CREATURES: 'sea',
};

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const MESSAGES = {
  API_ERROR: 'Error fetching critter data. Please try again later.',
};

export const STORAGE = {
  SETTINGS_HEMISPHERE: 'settingsHemisphere',
  CAUGHT_BUGS: 'caughtBugs',
  CAUGHT_FISH: 'caughtFish',
  CAUGHT_SEA_CREATURES: 'caughtSeaCreatures',
};

export const SORT_OPTIONS = {
  ID: 'id',
  ALPHABETICAL_ASCENDING: 'alphabeticalAscending',
  ALPHABETICAL_DESCENDING: 'alphabeticalDescending',
  PRICE_ASCENDING: 'priceAscending',
  PRICE_DESCENDING: 'priceDescending',
};

export const SETTINGS = {
  HEMISPHERE_NORTHERN: 'northern',
  HEMISPHERE_SOUTHERN: 'southern',
};

export const API = {
  BASE: 'https://acnhapi.com/v1',
  FISH: '/fish',
  BUGS: '/bugs',
  SEA_CREATURES: '/sea',
};

export const VUEX_MUTATIONS = {
  SET_LOADING: 'setLoading',
  SET_ERROR_LOADING_FISH: 'setErrorLoadingFish',
  SET_ERROR_LOADING_BUGS: 'setErrorLoadingBugs',
  SET_ERROR_LOADING_SEA_CREATURES: 'setErrorLoadingSeaCreatures',
  SET_IS_STORAGE_AVAILABLE: 'setIsStorageAvailable',

  SET_SETTINGS_MODAL_OPEN: 'setSettingsModalOpen',
  SET_SETTINGS_HEMISPHERE: 'setSettingsHemisphere',

  SET_QUICK_ADD_MODAL_OPEN: 'setQuickAddModalOpen',

  SET_FISH: 'setFish',
  SET_BUGS: 'setBugs',
  SET_SEA_CREATURES: 'setSeaCreatures',
  SET_SELECTED_FISH: 'setSelectedFish',
  SET_SELECTED_BUG: 'setSelectedBug',
  SET_SELECTED_SEA_CREATURE: 'setSelectedSeaCreature',

  CLEAR_CAUGHT_FISH: 'clearCaughtFish',
  CLEAR_CAUGHT_BUGS: 'clearCaughtBugs',
  CLEAR_CAUGHT_SEA_CREATURES: 'clearCaughtSeaCreatures',
  SET_CAUGHT_FISH: 'setCaughtFish',
  SET_CAUGHT_BUGS: 'setCaughtBugs',
  SET_CAUGHT_SEA_CREATURES: 'setCaughtSeaCreatures',
  SET_CAUGHT_CRITTER_STATUS: 'setCaughtCritterStatus',

  SET_FILTERS_SORT: 'setFiltersSort',
  SET_FILTERS_SEARCH_TERM: 'setFiltersSearchTerm',
  SET_FILTERS_LOCATION: 'setFiltersLocation',
  SET_FILTERS_MIN_BASE_PRICE: 'setFiltersMinBasePrice',
  SET_FILTERS_MAX_BASE_PRICE: 'setFiltersMaxBasePrice',
  SET_FILTERS_CAUGHT: 'setFiltersCaught',
  SET_FILTERS_NORTHERN_MONTHS_AVAILABLE: 'setFiltersNorthernMonthsAvailable',
  SET_FILTERS_SOUTHERN_MONTHS_AVAILABLE: 'setFiltersSouthernMonthsAvailable',
  SET_FILTERS_AVAILABLE_NOW: 'setFiltersAvailableNow',
  CLEAR_FILTERS: 'clearFilters',
};

export const VUEX_ACTIONS = {
  CATCH_FISH: 'catchFish',
  CATCH_BUGS: 'catchBugs',
  CATCH_SEA_CREATURES: 'catchSeaCreatures',
};

export const MODULE = 'critterpedia';

export const MUTATIONS = {
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

  CLEAR_DONATED_FISH: 'clearDonatedFish',
  CLEAR_DONATED_BUGS: 'clearDonatedBugs',
  CLEAR_DONATED_SEA_CREATURES: 'clearDonatedSeaCreatures',
  SET_DONATED_FISH: 'setDonatedFish',
  SET_DONATED_BUGS: 'setDonatedBugs',
  SET_DONATED_SEA_CREATURES: 'setDonatedSeaCreatures',
  SET_DONATED_CRITTER_STATUS: 'setDonatedCritterStatus',

  SET_FILTERS_SORT: 'setFiltersSort',
  SET_FILTERS_SEARCH_TERM: 'setFiltersSearchTerm',
  SET_FILTERS_LOCATION: 'setFiltersLocation',
  SET_FILTERS_MIN_BASE_PRICE: 'setFiltersMinBasePrice',
  SET_FILTERS_MAX_BASE_PRICE: 'setFiltersMaxBasePrice',
  SET_FILTERS_DONATED: 'setFiltersDonated',
  SET_FILTERS_NORTHERN_MONTHS_AVAILABLE: 'setFiltersNorthernMonthsAvailable',
  SET_FILTERS_SOUTHERN_MONTHS_AVAILABLE: 'setFiltersSouthernMonthsAvailable',
  SET_FILTERS_AVAILABLE_NOW: 'setFiltersAvailableNow',
  CLEAR_FILTERS: 'clearFilters',
};

export const ACTIONS = {
  CATCH_FISH: 'catchFish',
  CATCH_BUGS: 'catchBugs',
  CATCH_SEA_CREATURES: 'catchSeaCreatures',
};

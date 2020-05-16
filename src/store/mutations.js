import { SORT_OPTIONS } from '../constants';

export default {
  setLoading (state, loading = true) {
    state.loading = loading;
  },

  setFish (state, fish) {
    state.fish = fish;
  },

  setBugs (state, bugs) {
    state.bugs = bugs;
  },

  setSelectedFish (state, fish) {
    state.selectedFish = fish;
  },

  setSelectedBug (state, bug) {
    state.selectedBug = bug;
  },

  setFiltersSort (state, sort) {
    state.filters.sort = sort;
  },

  setFiltersSearchTerm (state, term) {
    state.filters.searchTerm = term;
  },

  setFiltersLocation (state, location) {
    state.filters.location = location;
  },

  setFiltersMinBasePrice (state, price) {
    state.filters.minBasePrice = price;
  },

  setFiltersMaxBasePrice (state, price) {
    state.filters.maxBasePrice = price;
  },

  clearFilters (state) {
    state.filters.sort = SORT_OPTIONS.ID;
    state.filters.searchTerm = '';
    state.filters.location = '';
    state.filters.minBasePrice = null;
    state.filters.maxBasePrice = null;
  },
};

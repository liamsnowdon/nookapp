import { CRITTER_TYPES, STORAGE, SORT_OPTIONS } from '../constants';

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

  setIsStorageAvailable (state, available) {
    state.isStorageAvailable = available;
  },

  setCaughtFish (state, caughtFish) {
    state.caughtFish = caughtFish || [];
  },

  setCaughtBugs (state, caughtBugs) {
    state.caughtBugs = caughtBugs || [];
  },

  setCaughtCritterStatus (state, payload) {
    const isCaught = payload.isCaught;
    const id = payload.id;
    const critterType = payload.critterType;

    const currentCaughtCritters = critterType === CRITTER_TYPES.BUGS ? [...state.caughtBugs] : [...state.caughtFish];
    const currentCaughtCritterIndex = currentCaughtCritters.findIndex(critter => critter === id);

    if (isCaught) {
      if (currentCaughtCritterIndex !== -1) {
        return;
      }

      currentCaughtCritters.push(id);
    } else {
      if (currentCaughtCritterIndex === -1) {
        return;
      }

      currentCaughtCritters.splice(currentCaughtCritterIndex, 1);
    }

    // Reorder numerically
    currentCaughtCritters.sort((a, b) => a - b);

    if (critterType === CRITTER_TYPES.BUGS) {
      state.caughtBugs = currentCaughtCritters;
      localStorage.setItem(STORAGE.CAUGHT_BUGS, state.caughtBugs.toString());
    } else {
      state.caughtFish = currentCaughtCritters;
      localStorage.setItem(STORAGE.CAUGHT_FISH, state.caughtFish.toString());
    }
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

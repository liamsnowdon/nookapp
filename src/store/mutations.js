import { CRITTER_TYPES, STORAGE, SORT_OPTIONS } from '../constants';

export default {
  setLoading (state, loading = true) {
    state.loading = loading;
  },

  setErrorLoadingFish (state, error) {
    state.errorLoadingFish = error;
  },

  setErrorLoadingBugs (state, error) {
    state.errorLoadingBugs = error;
  },

  setErrorLoadingSeaCreatures (state, error) {
    state.setErrorLoadingSeaCreatures = error;
  },

  setSettingsModalOpen (state, open) {
    state.settingsModalOpen = open;
  },

  setFish (state, fish) {
    state.fish = fish;
  },

  setBugs (state, bugs) {
    state.bugs = bugs;
  },

  setSeaCreatures (state, seaCreatures) {
    state.seaCreatures = seaCreatures;
  },

  setSelectedFish (state, fish) {
    state.selectedFish = fish;
  },

  setSelectedBug (state, bug) {
    state.selectedBug = bug;
  },

  setSelectedSeaCreature (state, seaCreature) {
    state.selectedSeaCreature = seaCreature;
  },

  setIsStorageAvailable (state, available) {
    state.isStorageAvailable = available;
  },

  clearCaughtFish (state) {
    state.caughtFish = [];
    localStorage.removeItem(STORAGE.CAUGHT_FISH);
  },

  clearCaughtBugs (state) {
    state.caughtBugs = [];
    localStorage.removeItem(STORAGE.CAUGHT_BUGS);
  },

  clearCaughtSeaCreatures (state) {
    state.caughtSeaCreatures = [];
    localStorage.removeItem(STORAGE.CAUGHT_SEA_CREATURES);
  },

  setCaughtFish (state, caughtFish) {
    state.caughtFish = caughtFish || [];
  },

  setCaughtBugs (state, caughtBugs) {
    state.caughtBugs = caughtBugs || [];
  },

  setCaughtSeaCreatures (state, caughtSeaCreatures) {
    state.caughtSeaCreatures = caughtSeaCreatures || [];
  },

  setCaughtCritterStatus (state, payload) {
    const isCaught = payload.isCaught;
    const id = payload.id;
    const critterType = payload.critterType;

    let currentCaughtCritters;

    switch (critterType) {
      case CRITTER_TYPES.BUGS:
        currentCaughtCritters = [...state.caughtBugs];
        break;
      case CRITTER_TYPES.FISH:
        currentCaughtCritters = [...state.caughtFish];
        break;
      default:
        currentCaughtCritters = [...state.caughtSeaCreatures];
    }

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

    switch (critterType) {
      case CRITTER_TYPES.BUGS:
        state.caughtBugs = currentCaughtCritters;
        localStorage.setItem(STORAGE.CAUGHT_BUGS, state.caughtBugs.toString());
        break;
      case CRITTER_TYPES.FISH:
        state.caughtFish = currentCaughtCritters;
        localStorage.setItem(STORAGE.CAUGHT_FISH, state.caughtFish.toString());
        break;
      default:
        state.caughtSeaCreatures = currentCaughtCritters;
        localStorage.setItem(STORAGE.CAUGHT_SEA_CREATURES, state.caughtSeaCreatures.toString());
    }
  },

  setFiltersSort (state, sort) {
    state.filters.sort = sort;
  },

  setFiltersSearchTerm (state, term) {
    state.filters.searchTerm = term;
  },

  setFiltersLocation (state, location) {
    state.filters.location = location || '';
  },

  setFiltersMinBasePrice (state, price) {
    state.filters.minBasePrice = price;
  },

  setFiltersMaxBasePrice (state, price) {
    state.filters.maxBasePrice = price;
  },

  setFiltersCaught (state, caught) {
    state.filters.caught = caught;
  },

  setFiltersNorthernMonthsAvailable (state, monthsAvailable) {
    state.filters.northernMonthsAvailable = monthsAvailable;
  },

  setFiltersSouthernMonthsAvailable (state, monthsAvailable) {
    state.filters.southernMonthsAvailable = monthsAvailable;
  },

  clearFilters (state) {
    state.filters.sort = SORT_OPTIONS.ID;
    state.filters.searchTerm = '';
    state.filters.location = '';
    state.filters.minBasePrice = '';
    state.filters.maxBasePrice = '';
    state.filters.caught = '';
    state.filters.northernMonthsAvailable = [];
    state.filters.southernMonthsAvailable = [];
  },
};

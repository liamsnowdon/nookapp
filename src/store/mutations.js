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

  setQuickAddModalOpen (state, open) {
    state.quickAddModalOpen = open;
  },

  setSettingsHemisphere (state, hemisphere) {
    hemisphere = hemisphere || '';

    state.settings.hemisphere = hemisphere;
    localStorage.setItem(STORAGE.SETTINGS_HEMISPHERE, hemisphere);
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

  clearDonatedFish (state) {
    state.donatedFish = [];
    localStorage.removeItem(STORAGE.DONATED_FISH);
  },

  clearDonatedBugs (state) {
    state.donatedBugs = [];
    localStorage.removeItem(STORAGE.DONATED_BUGS);
  },

  clearDonatedSeaCreatures (state) {
    state.donatedSeaCreatures = [];
    localStorage.removeItem(STORAGE.DONATED_SEA_CREATURES);
  },

  setDonatedFish (state, donatedFish) {
    state.donatedFish = donatedFish || [];
  },

  setDonatedBugs (state, donatedBugs) {
    state.donatedBugs = donatedBugs || [];
  },

  setDonatedSeaCreatures (state, donatedSeaCreatures) {
    state.donatedSeaCreatures = donatedSeaCreatures || [];
  },

  setDonatedCritterStatus (state, payload) {
    const isDonated = payload.isDonated;
    const id = payload.id;
    const critterType = payload.critterType;

    let currentDonatedCritters;

    switch (critterType) {
      case CRITTER_TYPES.BUGS:
        currentDonatedCritters = [...state.donatedBugs];
        break;
      case CRITTER_TYPES.FISH:
        currentDonatedCritters = [...state.donatedFish];
        break;
      default:
        currentDonatedCritters = [...state.donatedSeaCreatures];
    }

    const currentDonatedCritterIndex = currentDonatedCritters.findIndex(critter => critter === id);

    if (isDonated) {
      if (currentDonatedCritterIndex !== -1) {
        return;
      }

      currentDonatedCritters.push(id);
    } else {
      if (currentDonatedCritterIndex === -1) {
        return;
      }

      currentDonatedCritters.splice(currentDonatedCritterIndex, 1);
    }

    // Reorder numerically
    currentDonatedCritters.sort((a, b) => a - b);

    switch (critterType) {
      case CRITTER_TYPES.BUGS:
        state.donatedBugs = currentDonatedCritters;
        localStorage.setItem(STORAGE.DONATED_BUGS, state.donatedBugs.toString());
        break;
      case CRITTER_TYPES.FISH:
        state.donatedFish = currentDonatedCritters;
        localStorage.setItem(STORAGE.DONATED_FISH, state.donatedFish.toString());
        break;
      default:
        state.donatedSeaCreatures = currentDonatedCritters;
        localStorage.setItem(STORAGE.DONATED_SEA_CREATURES, state.donatedSeaCreatures.toString());
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

  setFiltersDonated (state, donated) {
    state.filters.donated = donated;
  },

  setFiltersNorthernMonthsAvailable (state, monthsAvailable) {
    state.filters.northernMonthsAvailable = monthsAvailable;
  },

  setFiltersSouthernMonthsAvailable (state, monthsAvailable) {
    state.filters.southernMonthsAvailable = monthsAvailable;
  },

  setFiltersAvailableNow (state, availableNow) {
    state.filters.availableNow = availableNow;
  },

  clearFilters (state) {
    state.filters.sort = SORT_OPTIONS.ID;
    state.filters.searchTerm = '';
    state.filters.location = '';
    state.filters.minBasePrice = '';
    state.filters.maxBasePrice = '';
    state.filters.donated = '';
    state.filters.northernMonthsAvailable = [];
    state.filters.southernMonthsAvailable = [];
    state.filters.availableNow = false;
  },
};

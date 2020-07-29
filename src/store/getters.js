import { CRITTER_TYPES } from '../constants';

export default {
  hasDonatedFish (state) {
    return !!state.donatedFish.length;
  },

  hasDonatedBugs (state) {
    return !!state.donatedBugs.length;
  },

  hasDonatedSeaCreatures (state) {
    return !!state.donatedSeaCreatures.length;
  },

  getDonatedCritter: (state) => (properties) => {
    switch (properties.critterType) {
      case CRITTER_TYPES.BUGS:
        return state.donatedBugs.find(bug => bug === properties.id);
      case CRITTER_TYPES.FISH:
        return state.donatedFish.find(fish => fish === properties.id);
      default:
        return state.donatedSeaCreatures.find(seaCreature => seaCreature === properties.id);
    }
  },

  hasSelectedNorthernMonthsInFilter (state) {
    return !!state.filters.northernMonthsAvailable.length;
  },

  hasSelectedSouthernMonthsInFilter (state) {
    return !!state.filters.southernMonthsAvailable.length;
  },
};

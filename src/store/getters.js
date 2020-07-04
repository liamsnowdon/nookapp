import { CRITTER_TYPES } from '../constants';

export default {
  hasCaughtFish (state) {
    return !!state.caughtFish.length;
  },

  hasCaughtBugs (state) {
    return !!state.caughtBugs.length;
  },

  hasCaughtSeaCreatures (state) {
    return !!state.caughtSeaCreatures.length;
  },

  getCaughtCritter: (state) => (properties) => {
    switch (properties.critterType) {
      case CRITTER_TYPES.BUGS:
        return state.caughtBugs.find(bug => bug === properties.id);
      case CRITTER_TYPES.FISH:
        return state.caughtFish.find(fish => fish === properties.id);
      default:
        return state.caughtSeaCreatures.find(seaCreature => seaCreature === properties.id);
    }
  },

  hasSelectedNorthernMonthsInFilter (state) {
    return !!state.filters.northernMonthsAvailable.length;
  },

  hasSelectedSouthernMonthsInFilter (state) {
    return !!state.filters.southernMonthsAvailable.length;
  },
};

import { CRITTER_TYPES } from '../constants';

export default {
  hasCaughtFish (state) {
    return !!state.caughtFish.length;
  },

  hasCaughtBugs (state) {
    return !!state.caughtBugs.length;
  },

  getCaughtCritter: (state) => (properties) => {
    if (properties.critterType === CRITTER_TYPES.BUGS) {
      return state.caughtBugs.find(bug => bug === properties.id);
    } else {
      return state.caughtFish.find(bug => bug === properties.id);
    }
  },

  hasSelectedNorthernMonthsInFilter (state) {
    return !!state.filters.northernMonthsAvailable.length;
  },

  hasSelectedSouthernMonthsInFilter (state) {
    return !!state.filters.southernMonthsAvailable.length;
  },
};

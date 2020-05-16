import { CRITTER_TYPES } from '../constants';

export default {
  getCaughtCritter: (state) => (properties) => {
    if (properties.critterType === CRITTER_TYPES.BUGS) {
      return state.caughtBugs.find(bug => bug === properties.id);
    } else {
      return state.caughtFish.find(bug => bug === properties.id);
    }
  },
};

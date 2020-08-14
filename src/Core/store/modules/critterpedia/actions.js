import AcnhApi from 'Core/api/AcnhApi';

import { MUTATIONS } from 'Critterpedia/constants/vuex';
import { MESSAGES } from 'Critterpedia/constants/messages';

export default {
  async catchFish ({ commit }) {
    commit(MUTATIONS.SET_LOADING, true);

    try {
      const fish = await AcnhApi.getFish();

      commit(MUTATIONS.SET_FISH, fish);
      commit(MUTATIONS.SET_ERROR_LOADING_FISH, false);
    } catch {
      commit(MUTATIONS.SET_ERROR_LOADING_FISH, true);
      console.error(MESSAGES.API_ERROR);
    }

    commit(MUTATIONS.SET_LOADING, false);
  },

  async catchBugs ({ commit }) {
    commit(MUTATIONS.SET_LOADING, true);

    try {
      const bugs = await AcnhApi.getBugs();

      commit(MUTATIONS.SET_BUGS, bugs);
      commit(MUTATIONS.SET_ERROR_LOADING_BUGS, false);
    } catch {
      commit(MUTATIONS.SET_ERROR_LOADING_BUGS, true);
      console.error(MESSAGES.API_ERROR);
    }

    commit(MUTATIONS.SET_LOADING, false);
  },

  async catchSeaCreatures ({ commit }) {
    commit(MUTATIONS.SET_LOADING, true);

    try {
      const seaCreatures = await AcnhApi.getSeaCreatures();

      commit(MUTATIONS.SET_SEA_CREATURES, seaCreatures);
      commit(MUTATIONS.SET_ERROR_LOADING_SEA_CREATURES, false);
    } catch {
      commit(MUTATIONS.SET_ERROR_LOADING_SEA_CREATURES, true);
      console.error(MESSAGES.API_ERROR);
    }

    commit(MUTATIONS.SET_LOADING, false);
  },
};

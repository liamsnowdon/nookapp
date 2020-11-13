import AcnhApi from 'Core/api/AcnhApi';

import { MUTATIONS } from 'Villagers/constants/vuex';
import { MESSAGES } from 'Villagers/constants/messages';

export default {
  async getVillagers ({ commit }) {
    commit(MUTATIONS.SET_LOADING, true);

    try {
      const villagers = await AcnhApi.getVillagers();

      commit(MUTATIONS.SET_VILLAGERS, villagers);
      commit(MUTATIONS.SET_ERROR_LOADING_VILLAGERS, false);
    } catch {
      commit(MUTATIONS.SET_ERROR_LOADING_VILLAGERS, true);
      console.error(MESSAGES.API_ERROR);
    }

    commit(MUTATIONS.SET_LOADING, false);
  },
};

import AcnhApi from 'Core/api/AcnhApi';

import { MUTATIONS } from 'Fossils/constants/vuex';
import { MESSAGES } from 'Fossils/constants/messages';

export default {
  async digFossils ({ commit }) {
    commit(MUTATIONS.SET_LOADING, true);

    try {
      const fossils = await AcnhApi.getFossils();

      commit(MUTATIONS.SET_FOSSILS, fossils);
      commit(MUTATIONS.SET_ERROR_LOADING_FOSSILS, false);
    } catch {
      commit(MUTATIONS.SET_ERROR_LOADING_FOSSILS, true);
      console.error(MESSAGES.API_ERROR);
    }

    commit(MUTATIONS.SET_LOADING, false);
  },
};

import axios from 'axios';
import { ACNHAPI } from 'Core/constants/api';
import { MUTATIONS } from 'Fossils/constants/vuex';
import { MESSAGES } from 'Fossils/constants/messages';

export default {
  async digFossils ({ commit }) {
    let response, fossils;
    commit(MUTATIONS.SET_LOADING, true);

    try {
      response = await axios.get(`${ACNHAPI.BASE}${ACNHAPI.FOSSILS}`);
      fossils = Object.values(response.data);

      commit(MUTATIONS.SET_FOSSILS, fossils);
      commit(MUTATIONS.SET_ERROR_LOADING_FOSSILS, false);
    } catch {
      commit(MUTATIONS.SET_ERROR_LOADING_FOSSILS, true);
      console.error(MESSAGES.API_ERROR);
    }

    commit(MUTATIONS.SET_LOADING, false);
  },
};

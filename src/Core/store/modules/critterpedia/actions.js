import axios from 'axios';
import { API, VUEX_MUTATIONS, MESSAGES } from '@/Critterpedia/constants';

export default {
  async catchFish ({ commit }) {
    let response, fish;
    commit(VUEX_MUTATIONS.SET_LOADING, true);

    try {
      response = await axios.get(`${API.BASE}${API.FISH}`);
      fish = Object.values(response.data);

      commit(VUEX_MUTATIONS.SET_FISH, fish);
      commit(VUEX_MUTATIONS.SET_ERROR_LOADING_FISH, false);
    } catch {
      commit(VUEX_MUTATIONS.SET_ERROR_LOADING_FISH, true);
      console.error(MESSAGES.API_ERROR);
    }

    commit(VUEX_MUTATIONS.SET_LOADING, false);
  },

  async catchBugs ({ commit }) {
    let response, bugs;
    commit(VUEX_MUTATIONS.SET_LOADING, true);

    try {
      response = await axios.get(`${API.BASE}${API.BUGS}`);

      bugs = Object.values(response.data);
      bugs = setCorrectBugsData(bugs);

      commit(VUEX_MUTATIONS.SET_BUGS, bugs);
      commit(VUEX_MUTATIONS.SET_ERROR_LOADING_BUGS, false);
    } catch {
      commit(VUEX_MUTATIONS.SET_ERROR_LOADING_BUGS, true);
      console.error(MESSAGES.API_ERROR);
    }

    commit(VUEX_MUTATIONS.SET_LOADING, false);
  },

  async catchSeaCreatures ({ commit }) {
    let response, seaCreatures;
    commit(VUEX_MUTATIONS.SET_LOADING, true);

    try {
      response = await axios.get(`${API.BASE}${API.SEA_CREATURES}`);
      seaCreatures = Object.values(response.data);

      commit(VUEX_MUTATIONS.SET_SEA_CREATURES, seaCreatures);
      commit(VUEX_MUTATIONS.SET_ERROR_LOADING_SEA_CREATURES, false);
    } catch {
      commit(VUEX_MUTATIONS.SET_ERROR_LOADING_SEA_CREATURES, true);
      console.error(MESSAGES.API_ERROR);
    }

    commit(VUEX_MUTATIONS.SET_LOADING, false);
  },
};

/**
 * Set any data from API that is incorrect here since we have no control over it.
 *
 * @param {array} bugs
 * @returns {array}
 */
function setCorrectBugsData (bugs) {
  const spiderIndex = bugs.findIndex(bug => bug.name['name-EUen'] === 'spider');

  if (!bugs[spiderIndex].availability.location) {
    bugs[spiderIndex].availability.location = 'Shaking trees';
  }

  return bugs;
}

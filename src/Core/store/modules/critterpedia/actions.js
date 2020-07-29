import axios from 'axios';
import { ACNHAPI } from 'Core/constants/api';
import { MUTATIONS } from 'Critterpedia/constants/vuex';
import { MESSAGES } from 'Critterpedia/constants/messages';

export default {
  async catchFish ({ commit }) {
    let response, fish;
    commit(MUTATIONS.SET_LOADING, true);

    try {
      response = await axios.get(`${ACNHAPI.BASE}${ACNHAPI.FISH}`);
      fish = Object.values(response.data);

      commit(MUTATIONS.SET_FISH, fish);
      commit(MUTATIONS.SET_ERROR_LOADING_FISH, false);
    } catch {
      commit(MUTATIONS.SET_ERROR_LOADING_FISH, true);
      console.error(MESSAGES.API_ERROR);
    }

    commit(MUTATIONS.SET_LOADING, false);
  },

  async catchBugs ({ commit }) {
    let response, bugs;
    commit(MUTATIONS.SET_LOADING, true);

    try {
      response = await axios.get(`${ACNHAPI.BASE}${ACNHAPI.BUGS}`);

      bugs = Object.values(response.data);
      bugs = setCorrectBugsData(bugs);

      commit(MUTATIONS.SET_BUGS, bugs);
      commit(MUTATIONS.SET_ERROR_LOADING_BUGS, false);
    } catch {
      commit(MUTATIONS.SET_ERROR_LOADING_BUGS, true);
      console.error(MESSAGES.API_ERROR);
    }

    commit(MUTATIONS.SET_LOADING, false);
  },

  async catchSeaCreatures ({ commit }) {
    let response, seaCreatures;
    commit(MUTATIONS.SET_LOADING, true);

    try {
      response = await axios.get(`${ACNHAPI.BASE}${ACNHAPI.SEA_CREATURES}`);
      seaCreatures = Object.values(response.data);

      commit(MUTATIONS.SET_SEA_CREATURES, seaCreatures);
      commit(MUTATIONS.SET_ERROR_LOADING_SEA_CREATURES, false);
    } catch {
      commit(MUTATIONS.SET_ERROR_LOADING_SEA_CREATURES, true);
      console.error(MESSAGES.API_ERROR);
    }

    commit(MUTATIONS.SET_LOADING, false);
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

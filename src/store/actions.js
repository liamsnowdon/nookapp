import axios from 'axios';
import { API, VUEX_MUTATIONS } from '../constants';

export default {
  async catchFish ({ commit }) {
    commit(VUEX_MUTATIONS.SET_LOADING, true);

    const response = await axios.get(`${API.BASE}${API.FISH}`);
    const fish = Object.values(response.data);

    commit(VUEX_MUTATIONS.SET_FISH, fish);
    commit(VUEX_MUTATIONS.SET_LOADING, false);
  },

  async catchBugs ({ commit }) {
    commit(VUEX_MUTATIONS.SET_LOADING, true);

    const response = await axios.get(`${API.BASE}${API.BUGS}`);
    let bugs = Object.values(response.data);

    bugs = setCorrectBugsData(bugs);

    commit(VUEX_MUTATIONS.SET_BUGS, bugs);

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
  const spiderIndex = bugs.findIndex(bug => bug.name['name-en'] === 'spider');

  if (!bugs[spiderIndex].availability.location) {
    bugs[spiderIndex].availability.location = 'Shaking trees';
  }

  return bugs;
}

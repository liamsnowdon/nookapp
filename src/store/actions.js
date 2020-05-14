import axios from 'axios';

export default {
  async catchFish ({ commit }) {
    commit('setLoading', true);

    const response = await axios.get('https://acnhapi.com/fish');

    commit('setFish', response.data);
    commit('setLoading', false);
  },

  async catchBugs ({ commit }) {
    commit('setLoading', true);

    const response = await axios.get('https://acnhapi.com/bugs');

    commit('setBugs', response.data);

    commit('setLoading', false);
  },
};

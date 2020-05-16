import axios from 'axios';
import { API } from '../constants';

export default {
  async catchFish ({ commit }) {
    commit('setLoading', true);

    const response = await axios.get(`${API.BASE}${API.FISH}`);
    const fish = Object.values(response.data);

    commit('setFish', fish);
    commit('setLoading', false);
  },

  async catchBugs ({ commit }) {
    commit('setLoading', true);

    const response = await axios.get(`${API.BASE}${API.BUGS}`);
    const bugs = Object.values(response.data);

    commit('setBugs', bugs);

    commit('setLoading', false);
  },
};

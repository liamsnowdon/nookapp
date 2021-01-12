import groupBy from 'lodash/groupBy';

export default {
  hasDreamTeamCreated (state) {
    return !!state.dreamTeam.length;
  },

  canHaveMoreDreamTeamVillagers (state) {
    return state.dreamTeam.length < 10;
  },

  speciesOptions (state) {
    return Object.keys(groupBy(state.villagers, 'species'));
  },

  personalityOptions (state) {
    return Object.keys(groupBy(state.villagers, 'personality'));
  },
};

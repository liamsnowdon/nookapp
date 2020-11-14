import groupBy from 'lodash/groupBy';

export default {
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

export default {
  setLoading (state, loading = true) {
    state.loading = loading;
  },

  setFish (state, fish) {
    state.fish = fish;
  },

  setBugs (state, bugs) {
    state.bugs = bugs;
  },

  setSelectedFish (state, fish) {
    state.selectedFish = fish;
  },

  setSelectedBug (state, bug) {
    state.selectedBug = bug;
  },
};

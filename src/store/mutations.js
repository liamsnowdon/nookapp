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
};

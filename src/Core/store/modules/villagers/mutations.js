export default {
  setLoading (state, loading = true) {
    state.loading = loading;
  },

  setVillagers (state, villagers) {
    state.villagers = villagers;
  },

  setErrorLoadingVillagers (state, error) {
    state.errorLoadingVillagers = error;
  },

  setSelectedVillager (state, villager) {
    state.selectedVillager = villager;
  },

  setDetailModalOpen (state, open) {
    state.detailModalOpen = open;
  },
};

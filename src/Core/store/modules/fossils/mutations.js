export default {
  setLoading (state, loading = true) {
    state.loading = loading;
  },

  setFossils (state, fossils) {
    state.fossils = fossils;
  },

  setErrorLoadingFossils (state, error) {
    state.errorLoadingFossils = error;
  },

  setSelectedFossil (state, fossil) {
    state.selectedFossil = fossil;
  },

  setDetailModalOpen (state, open) {
    state.detailModalOpen = open;
  },
};

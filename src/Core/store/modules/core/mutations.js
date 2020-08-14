export default {
  setIsStorageAvailable (state, available) {
    state.isStorageAvailable = available;
  },

  setSettingsModalOpen (state, open) {
    state.settingsModalOpen = open;
  },

  setSettingsHemisphere (state, hemisphere) {
    hemisphere = hemisphere || '';

    state.settings.hemisphere = hemisphere;
  },

  setSyncId (state, id) {
    state.syncId = id;
  },

  setLoadingSyncSession (state, loading) {
    state.loadingSyncSession = loading;
  },
};

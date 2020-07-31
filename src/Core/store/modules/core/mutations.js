import { STORAGE } from 'Core/constants/storage';

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
    localStorage.setItem(STORAGE.SETTINGS_HEMISPHERE, hemisphere);
  },
};

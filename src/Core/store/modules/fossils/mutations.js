import { STORAGE } from 'Fossils/constants/storage';

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

  setDonatedFossils (state, donatedFossils) {
    state.donatedFossils = donatedFossils || [];
  },

  setDonatedFossilStatus (state, payload) {
    const isDonated = payload.isDonated;
    const id = payload.id;

    const currentDonatedFossils = [...state.donatedFossils];

    const currentDonatedFossilIndex = currentDonatedFossils.findIndex(fossil => fossil === id);

    if (isDonated) {
      if (currentDonatedFossilIndex !== -1) {
        return;
      }

      currentDonatedFossils.push(id);
    } else {
      if (currentDonatedFossilIndex === -1) {
        return;
      }

      currentDonatedFossils.splice(currentDonatedFossilIndex, 1);
    }

    state.donatedFossils = currentDonatedFossils;
    localStorage.setItem(STORAGE.DONATED_FOSSILS, state.donatedFossils.toString());
  },
};

export const MODULE = 'fossils';

export const GETTERS = {
  GET_DONATED_FOSSIL: 'getDonatedFossil',
  HAS_DONATED_FOSSILS: 'hasDonatedFossils',
};

export const MUTATIONS = {
  SET_LOADING: 'setLoading',

  SET_FOSSILS: 'setFossils',
  SET_ERROR_LOADING_FOSSILS: 'setErrorLoadingFossils',
  SET_SELECTED_FOSSIL: 'setSelectedFossil',

  SET_DETAIL_MODAL_OPEN: 'setDetailModalOpen',

  SET_DONATED_FOSSILS: 'setDonatedFossils',
  SET_DONATED_FOSSIL_STATUS: 'setDonatedFossilStatus',

  CLEAR_DONATED_FOSSILS: 'clearDonatedFossils',
};

export const ACTIONS = {
  DIG_FOSSILS: 'digFossils',
};

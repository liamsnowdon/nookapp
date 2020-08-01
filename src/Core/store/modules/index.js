import core from './core';
import critterpedia from './critterpedia';
import fossils from './fossils';

export default {
  core: {
    namespaced: true,
    ...core,
  },

  critterpedia: {
    namespaced: true,
    ...critterpedia,
  },

  fossils: {
    namespaced: true,
    ...fossils,
  },
};

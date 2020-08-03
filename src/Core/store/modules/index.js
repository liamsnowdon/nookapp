import core from './core';
import critterpedia from './critterpedia';
import fossils from './fossils';
import checklist from './checklist';

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

  checklist: {
    namespaced: true,
    ...checklist,
  },
};

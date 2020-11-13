import core from './core';
import critterpedia from './critterpedia';
import fossils from './fossils';
import checklist from './checklist';
import villagers from './villagers';

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

  villagers: {
    namespaced: true,
    ...villagers,
  },

  checklist: {
    namespaced: true,
    ...checklist,
  },
};

import core from './core';
import critterpedia from './critterpedia';

export default {
  core: {
    namespaced: true,
    ...core,
  },

  critterpedia: {
    namespaced: true,
    ...critterpedia,
  },
};

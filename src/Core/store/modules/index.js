import critterpedia from './critterpedia';
import fossils from './fossils';

export default {
  critterpedia: {
    namespaced: true,
    ...critterpedia,
  },

  fossils: {
    namespaced: true,
    ...fossils,
  },
};

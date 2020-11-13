import { STORAGE } from 'Checklist/constants/storage';
import CHECKLIST_TYPE from 'Checklist/constants/checklist-type';

export default {
  /**
   * Sets checklist items in state and localStorage
   *
   * @param {Object} state
   * @param {Object} payload
   * @param {Array} payload.items
   * @param {'default' | 'custom'} payload.type
   * @param {string} payload.date
   */
  setChecklist (state, payload) {
    payload.items = payload.items || [];
    payload.type = payload.type || CHECKLIST_TYPE.DEFAULT;
    payload.date = payload.date || null;

    state.items = payload.items;
    state.type = payload.type;
    state.date = payload.date;

    if (payload.items.length) {
      localStorage.setItem(STORAGE.CHECKLIST, JSON.stringify({
        items: payload.items,
        type: payload.type,
        date: payload.date,
      }));
    } else {
      localStorage.removeItem(STORAGE.CHECKLIST);
    }
  },
};

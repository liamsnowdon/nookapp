import { STORAGE } from 'Checklist/constants/storage';

export default {
  /**
   * Sets checklist items in state and localStorage
   *
   * @param {Object} state
   * @param {Object} payload
   * @param {Array} payload.items
   * @param {boolean} payload.setDate
   */
  setItems (state, payload) {
    payload.items = payload.items || [];

    state.items = payload.items;

    if (payload.items.length) {
      localStorage.setItem(STORAGE.CHECKLIST_ITEMS, JSON.stringify(payload.items));

      if (payload.setDate) {
        localStorage.setItem(STORAGE.CHECKLIST_DATE, JSON.stringify(new Date()));
      }
    } else {
      localStorage.removeItem(STORAGE.CHECKLIST_ITEMS);
      localStorage.removeItem(STORAGE.CHECKLIST_DATE);
    }
  },

  resetItems (state) {
    state.items = state.items.map(item => {
      item.completed = false;

      return item;
    });

    localStorage.setItem(STORAGE.CHECKLIST_ITEMS, JSON.stringify(state.items));
  },

  setItem (state, item) {
    const index = state.items.findIndex(i => i.id === item.id);

    if (index === -1) {
      return;
    }

    state.items.splice(index, 1, item);
    localStorage.setItem(STORAGE.CHECKLIST_ITEMS, JSON.stringify(state.items));
  },
};

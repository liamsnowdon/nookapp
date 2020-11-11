import { STORAGE } from 'Checklist/constants/storage';
import CHECKLIST_TYPE from 'Checklist/constants/checklist-type';
import DEFAULT_CHECKLIST from 'Checklist/constants/default-checklist';

export default {
  /**
   * Sets checklist items in state and localStorage
   *
   * @param {Object} state
   * @param {Object} payload
   * @param {Array} payload.items
   * @param {'default' | 'custom'} payload.type
   * @param {boolean} payload.setDate
   */
  setItems (state, payload) {
    payload.items = payload.items || [];
    payload.type = payload.type || CHECKLIST_TYPE.DEFAULT;

    state.items = payload.items;
    state.type = payload.type;

    if (payload.items.length) {
      localStorage.setItem(STORAGE.CHECKLIST, JSON.stringify({
        items: payload.items,
        type: payload.type,
      }));

      if (payload.setDate) {
        localStorage.setItem(STORAGE.CHECKLIST_DATE, JSON.stringify(new Date()));
      }
    } else {
      localStorage.removeItem(STORAGE.CHECKLIST);
      localStorage.removeItem(STORAGE.CHECKLIST_DATE);
    }
  },

  resetItems (state) {
    const checklist = JSON.parse(localStorage.getItem(STORAGE.CHECKLIST));

    // If it is a default checklist, get the default again in case it changed.
    if (checklist.type === CHECKLIST_TYPE.DEFAULT) {
      state.items = DEFAULT_CHECKLIST.map((item, index) => {
        return {
          id: index + 1,
          name: item,
          completed: false,
        };
      });
    } else {
      state.items = state.items.map(item => {
        item.completed = false;

        return item;
      });
    }

    localStorage.setItem(STORAGE.CHECKLIST, JSON.stringify({
      items: state.items,
      type: checklist.type,
    }));
  },

  setItem (state, item) {
    const checklist = JSON.parse(localStorage.getItem(STORAGE.CHECKLIST));
    const index = state.items.findIndex(i => i.id === item.id);

    if (index === -1) {
      return;
    }

    state.items.splice(index, 1, item);

    localStorage.setItem(STORAGE.CHECKLIST, JSON.stringify({
      items: state.items,
      type: checklist.type,
    }));
  },
};

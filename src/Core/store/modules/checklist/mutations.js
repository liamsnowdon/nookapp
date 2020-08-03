import { STORAGE } from 'Checklist/constants/storage';

export default {
  setItems (state, items) {
    items = items || [];

    state.items = items;

    if (items.length) {
      localStorage.setItem(STORAGE.CHECKLIST_ITEMS, JSON.stringify(items));
    }
  },

  setItem (state, item) {
    const index = state.items.findIndex(i => i.id === item.id);

    if (index === -1) {
      return;
    }

    state.items[index] = item;
    localStorage.setItem(STORAGE.CHECKLIST_ITEMS, JSON.stringify(state.items));
  }
};

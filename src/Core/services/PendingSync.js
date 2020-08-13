import { storageAvailable } from 'Core/helpers';
import { STORAGE } from 'Core/constants/storage';
import { STORAGE as FOSSILS_STORAGE } from 'Fossils/constants/storage';

/**
 * PendingSync
 *
 * These are items that have not yet been saved to the Sync session but are in localStorage.
 * This can happen when the Sync API fails, but we still want to keep track of donated items, settings, etc.
 *
 * On page load, and on an interval, we try to PATCH the Sync session with the items in the pendingSync item
 * in localStorage. If it succeeds, we can then remove the pendingSync item.
 */
export default class PendingSync {
  /**
   * Gets pending syncs.
   *
   * @returns {Object|null}
   */
  static get () {
    if (!storageAvailable('localStorage')) {
      return null;
    }

    return JSON.parse(localStorage.getItem(STORAGE.PENDING_SYNC));
  }

  /**
   * Sets pending syncs.
   *
   * @param {Object} data
   */
  static set (data) {
    if (!storageAvailable('localStorage')) {
      return;
    }

    localStorage.setItem(STORAGE.PENDING_SYNC, JSON.stringify(data));
  }

  /**
   * Sets a fossil in PendingSync
   *
   * @param {Object} fossil
   * @param {boolean} donated
   */
  static setFossil (fossil, donated) {
    let pendingSyncs = this.get();

    if (!pendingSyncs) {
      pendingSyncs = {};
    }

    if (!pendingSyncs[FOSSILS_STORAGE.DONATED_FOSSILS]) {
      pendingSyncs[FOSSILS_STORAGE.DONATED_FOSSILS] = [];
    }

    const index = pendingSyncs[FOSSILS_STORAGE.DONATED_FOSSILS].findIndex(f => f.id === fossil['file-name']);

    if (index === -1) {
      pendingSyncs[FOSSILS_STORAGE.DONATED_FOSSILS].push({
        id: fossil['file-name'],
        donated,
      });
    } else {
      pendingSyncs[FOSSILS_STORAGE.DONATED_FOSSILS][index] = {
        id: fossil['file-name'],
        donated,
      };
    }

    this.set(pendingSyncs);
  }
};

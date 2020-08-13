import { storageAvailable } from 'Core/helpers';

import { STORAGE } from 'Core/constants/storage';
import { STORAGE as FOSSILS_STORAGE } from 'Fossils/constants/storage';
import { STORAGE as CRITTERPEDIA_STORAGE } from 'Critterpedia/constants/storage';

import { CRITTER_TYPES } from 'Critterpedia/constants/critter-types';

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
   * Gets pending sync.
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
   * Sets pending sync.
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
   * Sets a fossil in pending sync
   *
   * @param {Object} fossil
   * @param {boolean} isDonated
   */
  static setFossil (fossil, isDonated) {
    let pendingSync = this.get();

    if (!pendingSync) {
      pendingSync = {};
    }

    if (!pendingSync[FOSSILS_STORAGE.DONATED_FOSSILS]) {
      pendingSync[FOSSILS_STORAGE.DONATED_FOSSILS] = [];
    }

    const index = pendingSync[FOSSILS_STORAGE.DONATED_FOSSILS].findIndex(f => f.id === fossil['file-name']);

    if (index === -1) {
      pendingSync[FOSSILS_STORAGE.DONATED_FOSSILS].push({
        id: fossil['file-name'],
        isDonated,
      });
    } else {
      pendingSync[FOSSILS_STORAGE.DONATED_FOSSILS][index] = {
        id: fossil['file-name'],
        isDonated,
      };
    }

    this.set(pendingSync);
  }

  /**
   * Sets a critter in pending sync
   *
   * @param {Object} critter
   * @param {boolean} isDonated
   * @param {string} critterType
   */
  static setCritter (critter, isDonated, critterType) {
    let storageString;
    let pendingSync = this.get();

    if (!pendingSync) {
      pendingSync = {};
    }

    switch (critterType) {
      case CRITTER_TYPES.FISH:
        storageString = CRITTERPEDIA_STORAGE.DONATED_FISH;
        break;
      case CRITTER_TYPES.BUGS:
        storageString = CRITTERPEDIA_STORAGE.DONATED_BUGS;
        break;
      case CRITTER_TYPES.SEA_CREATURES:
        storageString = CRITTERPEDIA_STORAGE.DONATED_SEA_CREATURES;
        break;
      default:
        break;
    }

    if (!pendingSync[storageString]) {
      pendingSync[storageString] = [];
    }

    const index = pendingSync[storageString].findIndex(item => item.id === critter.id);

    if (index === -1) {
      pendingSync[storageString].push({
        id: critter.id,
        isDonated,
      });
    } else {
      pendingSync[storageString][index] = {
        id: critter.id,
        isDonated,
      };
    }

    this.set(pendingSync);
  }
};

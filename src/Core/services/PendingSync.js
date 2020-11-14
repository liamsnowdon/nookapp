import groupBy from 'lodash/groupBy';
import isArray from 'lodash/isArray';

import SyncApi from 'Core/api/SyncApi';

import store from 'Core/store';
import { CRITTER_TYPES } from 'Critterpedia/constants/critter-types';
import { MODULE } from 'Core/constants/vuex';

import { STORAGE } from 'Core/constants/storage';
import { STORAGE as FOSSILS_STORAGE } from 'Fossils/constants/storage';
import { STORAGE as CRITTERPEDIA_STORAGE } from 'Critterpedia/constants/storage';
import { STORAGE as CHECKLIST_STORAGE } from 'Checklist/constants/storage';
import { STORAGE as VILLAGERS_STORAGE } from 'Villagers/constants/storage';

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
    if (!store.state[MODULE].isStorageAvailable) {
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
    if (!store.state[MODULE].isStorageAvailable) {
      return;
    }

    localStorage.setItem(STORAGE.PENDING_SYNC, JSON.stringify(data));
  }

  /**
   * Removes the pending sync item from localStorage
   */
  static clear () {
    if (!store.state[MODULE].isStorageAvailable) {
      return;
    }

    localStorage.removeItem(STORAGE.PENDING_SYNC);
  }

  /**
   * Try to update the Sync session with the current pending sync items from localStorage.
   *
   * @param {string} syncId
   * @returns {Promise}
   */
  static async attemptSyncUpdateFromPendingSync (syncId) {
    const pendingSync = this.get();

    const items = {};

    /*
     * Prepare data for request.
     * Split out true and false values so we know what to PATCH and DELETE
     */
    Object.keys(pendingSync).forEach(item => {
      if (isArray(pendingSync[item])) {
        items[item] = groupBy(pendingSync[item], 'value');
      } else {
        items[item] = pendingSync[item];
      }
    });

    for (const item of Object.keys(items)) {
      // On true values we PATCH, on false values we DELETE
      if (items[item].true || items[item].false) {
        const deleteItems = items[item].false ? items[item].false.map(i => i.id) : [];
        const patchItems = items[item].true ? items[item].true.map(i => i.id) : [];

        if (deleteItems.length > 0) {
          const payload = {};

          payload[item] = deleteItems;

          await SyncApi.delete(syncId, payload);
        }

        if (patchItems.length > 0) {
          const payload = {};

          payload[item] = patchItems;

          await SyncApi.patch(syncId, payload);
        }
      } else {
        // This is an object instead of an array so we just override the entire thing with PATCH

        const payload = {};

        payload[item] = items[item];

        await SyncApi.patch(syncId, payload);
      }
    }
  }

  static setBasicProperty (key, value) {
    let pendingSync = this.get();

    if (!pendingSync) {
      pendingSync = {};
    }

    pendingSync[key] = value;

    this.set(pendingSync);
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
        value: isDonated,
      });
    } else {
      pendingSync[FOSSILS_STORAGE.DONATED_FOSSILS][index] = {
        id: fossil['file-name'],
        value: isDonated,
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
        value: isDonated,
      });
    } else {
      pendingSync[storageString][index] = {
        id: critter.id,
        value: isDonated,
      };
    }

    this.set(pendingSync);
  }

  /**
   * Set settings
   *
   * @param {Object} settings
   */
  static setSettings (settings) {
    this.setBasicProperty(STORAGE.SETTINGS, settings);
  }

  /**
   * Set checklist
   *
   * @param {Object} checklist
   */
  static setChecklist (checklist) {
    this.setBasicProperty(CHECKLIST_STORAGE.CHECKLIST, checklist);
  }

  /**
   * Set a dream team villager
   *
   * @param {Object} villager
   * @param {boolean} isAdded
   */
  static setDreamTeamVillager (villager, isAdded) {
    let pendingSync = this.get();

    if (!pendingSync) {
      pendingSync = {};
    }

    if (!pendingSync[VILLAGERS_STORAGE.DREAM_TEAM]) {
      pendingSync[VILLAGERS_STORAGE.DREAM_TEAM] = [];
    }

    const index = pendingSync[VILLAGERS_STORAGE.DREAM_TEAM].findIndex(v => v.id === villager.id);

    if (index === -1) {
      pendingSync[VILLAGERS_STORAGE.DREAM_TEAM].push({
        id: villager.id,
        value: isAdded,
      });
    } else {
      pendingSync[VILLAGERS_STORAGE.DREAM_TEAM][index] = {
        id: villager.id,
        value: isAdded,
      };
    }

    this.set(pendingSync);
  }
};

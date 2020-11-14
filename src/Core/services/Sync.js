import store from 'Core/store';
import Storage from 'Core/services/Storage';
import { MODULE, MUTATIONS } from 'Core/constants/vuex';
import { STORAGE } from 'Core/constants/storage';
import { STORAGE as CRITTERPEDIA_STORAGE } from 'Critterpedia/constants/storage';
import { STORAGE as FOSSILS_STORAGE } from 'Fossils/constants/storage';
import { STORAGE as CHECKLIST_STORAGE } from 'Checklist/constants/storage';
import { STORAGE as VILLAGERS_STORAGE } from 'Villagers/constants/storage';

import {
  MODULE as CRITTERPEDIA_MODULE,
  MUTATIONS as CRITTERPEDIA_MUTATIONS,
} from 'Critterpedia/constants/vuex';

import {
  MODULE as FOSSILS_MODULE,
  MUTATIONS as FOSSILS_MUTATIONS,
} from 'Fossils/constants/vuex';

import {
  MODULE as CHECKLIST_MODULE,
  MUTATIONS as CHECKLIST_MUTATIONS,
} from 'Checklist/constants/vuex';

import {
  MODULE as VILLAGERS_MODULE,
  MUTATIONS as VILLAGERS_MUTATIONS,
} from 'Villagers/constants/vuex';

export default class Sync {
  /**
   * Gets the Sync ID from local storage
   *
   * @returns {string|null}
   */
  static getSyncIdFromLocalStorage () {
    return localStorage.getItem(STORAGE.SYNC_ID);
  }

  /**
   * Sets the Sync ID in local storage
   *
   * @param {string} id
   */
  static setSyncIdInLocalStorage (id) {
    localStorage.setItem(STORAGE.SYNC_ID, id);
  }

  /**
   * Removes the Sync ID from local storage
   */
  static removeSyncIdInLocalStorage () {
    localStorage.removeItem(STORAGE.SYNC_ID);
  }

  /**
   * @param {Array} data
   * @param {string} storageItem
   */
  static setLocalStorageItemArray (data, storageItem) {
    if (data && data.length > 0) {
      localStorage.setItem(storageItem, data);
    } else {
      localStorage.removeItem(storageItem);
    }
  }

  /**
   * Sets core Vuex state from Sync session
   *
   * @param {Object} session
   */
  static setAppStateFromSyncSession (session) {
    store.commit(`${MODULE}/${MUTATIONS.SET_SYNC_ID}`, session.id);

    store.commit(`${MODULE}/${MUTATIONS.SET_SETTINGS_HEMISPHERE}`, session.data.settings && session.data.settings.hemisphere ? session.data.settings.hemisphere : '');

    store.commit(`${CRITTERPEDIA_MODULE}/${CRITTERPEDIA_MUTATIONS.SET_DONATED_BUGS}`, session.data.donatedBugs || []);
    store.commit(`${CRITTERPEDIA_MODULE}/${CRITTERPEDIA_MUTATIONS.SET_DONATED_FISH}`, session.data.donatedFish || []);
    store.commit(`${CRITTERPEDIA_MODULE}/${CRITTERPEDIA_MUTATIONS.SET_DONATED_SEA_CREATURES}`, session.data.donatedSeaCreatures || []);

    store.commit(`${FOSSILS_MODULE}/${FOSSILS_MUTATIONS.SET_DONATED_FOSSILS}`, session.data.donatedFossils || []);

    store.commit(`${CHECKLIST_MODULE}/${CHECKLIST_MUTATIONS.SET_CHECKLIST}`, session.data.checklist || {});

    store.commit(`${VILLAGERS_MODULE}/${VILLAGERS_MUTATIONS.SET_DREAM_TEAM}`, session.data.dreamTeam || []);
  }

  /**
   * Sets the local storage items from a Sync session's data
   *
   * @param {Object} session
   */
  static setLocalStorageFromSyncSession (session) {
    localStorage.setItem(STORAGE.SYNC_ID, session.id);

    this.setLocalStorageItemArray(session.data.donatedBugs, CRITTERPEDIA_STORAGE.DONATED_BUGS);
    this.setLocalStorageItemArray(session.data.donatedFish, CRITTERPEDIA_STORAGE.DONATED_FISH);
    this.setLocalStorageItemArray(session.data.donatedSeaCreatures, CRITTERPEDIA_STORAGE.DONATED_SEA_CREATURES);
    this.setLocalStorageItemArray(session.data.donatedFossils, FOSSILS_STORAGE.DONATED_FOSSILS);
    this.setLocalStorageItemArray(session.data.dreamTeam, VILLAGERS_STORAGE.DREAM_TEAM);

    if (session.data.settings && session.data.settings.hemisphere) {
      localStorage.setItem(STORAGE.SETTINGS_HEMISPHERE, session.data.settings.hemisphere);
    }

    if (session.data.checklist) {
      localStorage.setItem(CHECKLIST_STORAGE.CHECKLIST, JSON.stringify(session.data.checklist));
    }
  }

  /**
   * Sets core Vuex state from localStorage
   */
  static setAppStateFromLocalStorage () {
    const settings = Storage.getSettings();
    const critters = Storage.getDonatedCritters();
    const fossils = Storage.getDonatedFossils();
    const checklist = Storage.getChecklist();
    const dreamTeam = Storage.getDreamTeam();

    store.commit(`${MODULE}/${MUTATIONS.SET_SETTINGS_HEMISPHERE}`, settings.hemisphere);

    store.commit(`${CRITTERPEDIA_MODULE}/${CRITTERPEDIA_MUTATIONS.SET_DONATED_BUGS}`, critters.donatedBugs || []);
    store.commit(`${CRITTERPEDIA_MODULE}/${CRITTERPEDIA_MUTATIONS.SET_DONATED_FISH}`, critters.donatedFish || []);
    store.commit(`${CRITTERPEDIA_MODULE}/${CRITTERPEDIA_MUTATIONS.SET_DONATED_SEA_CREATURES}`, critters.donatedSeaCreatures || []);

    store.commit(`${FOSSILS_MODULE}/${FOSSILS_MUTATIONS.SET_DONATED_FOSSILS}`, fossils || []);

    store.commit(`${CHECKLIST_MODULE}/${CHECKLIST_MUTATIONS.SET_CHECKLIST}`, checklist || {});

    store.commit(`${VILLAGERS_MODULE}/${VILLAGERS_MUTATIONS.SET_DREAM_TEAM}`, dreamTeam || []);
  }
}

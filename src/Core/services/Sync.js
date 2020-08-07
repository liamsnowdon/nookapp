import store from 'Core/store';
import Storage from 'Core/services/Storage';
import SyncApi from 'Core/api/SyncApi';
import { MODULE, MUTATIONS } from 'Core/constants/vuex';
import { STORAGE } from 'Core/constants/storage';

import {
  MODULE as CRITTERPEDIA_MODULE,
  MUTATIONS as CRITTERPEDIA_MUTATIONS,
} from 'Critterpedia/constants/vuex';

import {
  MODULE as FOSSILS_MODULE,
  MUTATIONS as FOSSILS_MUTATIONS,
} from 'Fossils/constants/vuex';

export default class Sync {
  /**
   * Gets the Sync session
   *
   * @param {string} id
   * @returns {Promise}
   */
  static async getWithId (id) {
    // 9358d67b-33b3-4d40-b585-8c157995dea7
    return await SyncApi.get(id);
  }

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
   * Sets core Vuex state from Sync session
   *
   * @param {Object} session
   */
  static setAppStateFromSyncSession (session) {
    store.commit(`${MODULE}/${MUTATIONS.SET_SYNC_ID}`, session.id);

    store.commit(`${CRITTERPEDIA_MODULE}/${CRITTERPEDIA_MUTATIONS.SET_DONATED_BUGS}`, session.data.donatedBugs || []);
    store.commit(`${CRITTERPEDIA_MODULE}/${CRITTERPEDIA_MUTATIONS.SET_DONATED_FISH}`, session.data.donatedFish || []);
    store.commit(`${CRITTERPEDIA_MODULE}/${CRITTERPEDIA_MUTATIONS.SET_DONATED_SEA_CREATURES}`, session.data.donatedSeaCreatures || []);

    store.commit(`${FOSSILS_MODULE}/${FOSSILS_MUTATIONS.SET_DONATED_FOSSILS}`, session.data.donatedFossils || []);
  }

  /**
   * Sets core Vuex state from localStorage
   */
  static setAppStateFromLocalStorage () {
    const settings = Storage.getSettings();
    const critters = Storage.getDonatedCritters();
    const fossils = Storage.getDonatedFossils();

    store.commit(`${MODULE}/${MUTATIONS.SET_SETTINGS_HEMISPHERE}`, settings.hemisphere);

    store.commit(`${CRITTERPEDIA_MODULE}/${CRITTERPEDIA_MUTATIONS.SET_DONATED_BUGS}`, critters.donatedBugs || []);
    store.commit(`${CRITTERPEDIA_MODULE}/${CRITTERPEDIA_MUTATIONS.SET_DONATED_FISH}`, critters.donatedFish || []);
    store.commit(`${CRITTERPEDIA_MODULE}/${CRITTERPEDIA_MUTATIONS.SET_DONATED_SEA_CREATURES}`, critters.donatedSeaCreatures || []);

    store.commit(`${FOSSILS_MODULE}/${FOSSILS_MUTATIONS.SET_DONATED_FOSSILS}`, fossils || []);
  }
}

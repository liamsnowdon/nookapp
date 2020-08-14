import store from 'Core/store';
import { STORAGE } from 'Core/constants/storage';
import { MODULE } from 'Core/constants/vuex';

import { STORAGE as CRITTERPEDIA_STORAGE } from 'Critterpedia/constants/storage';
import { STORAGE as FOSSILS_STORAGE } from 'Fossils/constants/storage';

export default class Storage {
  /**
   * Gets donated critters
   *
   * @returns {Object}
   */
  static getDonatedCritters () {
    if (!store.state[MODULE].isStorageAvailable) {
      return {};
    }

    let donatedFish = localStorage.getItem(CRITTERPEDIA_STORAGE.DONATED_FISH);
    let donatedBugs = localStorage.getItem(CRITTERPEDIA_STORAGE.DONATED_BUGS);
    let donatedSeaCreatures = localStorage.getItem(CRITTERPEDIA_STORAGE.DONATED_SEA_CREATURES);

    if (donatedFish) {
      donatedFish = donatedFish.split(',');
      donatedFish = donatedFish.map(fish => Number(fish));
      donatedFish.sort((a, b) => a - b);
    } else {
      donatedFish = [];
    }

    if (donatedBugs) {
      donatedBugs = donatedBugs.split(',');
      donatedBugs = donatedBugs.map(bugs => Number(bugs));
      donatedBugs.sort((a, b) => a - b);
    } else {
      donatedBugs = [];
    }

    if (donatedSeaCreatures) {
      donatedSeaCreatures = donatedSeaCreatures.split(',');
      donatedSeaCreatures = donatedSeaCreatures.map(seaCreatures => Number(seaCreatures));
      donatedSeaCreatures.sort((a, b) => a - b);
    } else {
      donatedSeaCreatures = [];
    }

    return {
      donatedFish,
      donatedBugs,
      donatedSeaCreatures,
    };
  }

  /**
   * Gets donated fossils
   *
   * @returns {Array}
   */
  static getDonatedFossils () {
    if (!store.state[MODULE].isStorageAvailable) {
      return [];
    }

    let donatedFossils = localStorage.getItem(FOSSILS_STORAGE.DONATED_FOSSILS);

    if (donatedFossils) {
      donatedFossils = donatedFossils.split(',');
    } else {
      donatedFossils = [];
    }

    return donatedFossils;
  }

  /**
   * Gets settings
   *
   * @returns {Object}
   */
  static getSettings () {
    if (!store.state[MODULE].isStorageAvailable) {
      return {};
    }

    const hemisphere = localStorage.getItem(STORAGE.SETTINGS_HEMISPHERE);

    const data = {};

    if (hemisphere) {
      data.hemisphere = hemisphere;
    }

    return data;
  }
}

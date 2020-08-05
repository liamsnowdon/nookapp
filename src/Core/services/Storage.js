import { storageAvailable } from 'Core/helpers';
import { STORAGE } from 'Critterpedia/constants/storage';

export default class Storage {
  /**
   * Gets donated critters
   *
   * @returns {Array}
   */
  static getDonatedCritters () {
    if (!storageAvailable('localStorage')) {
      return {};
    }

    let donatedFish = localStorage.getItem(STORAGE.DONATED_FISH);
    let donatedBugs = localStorage.getItem(STORAGE.DONATED_BUGS);
    let donatedSeaCreatures = localStorage.getItem(STORAGE.DONATED_SEA_CREATURES);

    if (donatedFish) {
      donatedFish = donatedFish.split(',');
      donatedFish = donatedFish.map(fish => Number(fish));
      donatedFish.sort((a, b) => a - b);
    }

    if (donatedBugs) {
      donatedBugs = donatedBugs.split(',');
      donatedBugs = donatedBugs.map(bugs => Number(bugs));
      donatedBugs.sort((a, b) => a - b);
    }

    if (donatedSeaCreatures) {
      donatedSeaCreatures = donatedSeaCreatures.split(',');
      donatedSeaCreatures = donatedSeaCreatures.map(seaCreatures => Number(seaCreatures));
      donatedSeaCreatures.sort((a, b) => a - b);
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
    if (!storageAvailable('localStorage')) {
      return [];
    }

    let donatedFossils = localStorage.getItem(STORAGE.DONATED_FOSSILS);

    if (donatedFossils) {
      donatedFossils = donatedFossils.split(',');
    }

    return donatedFossils;
  }

  /**
   * Gets settings
   *
   * @returns {Object}
   */
  static getSettings () {
    if (!storageAvailable('localStorage')) {
      return {};
    }

    return {
      hemisphere: localStorage.getItem(STORAGE.SETTINGS_HEMISPHERE),
    };
  }
}

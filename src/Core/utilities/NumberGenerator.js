export default class NumberGenerator {
  /**
   * Gets a random number between 0 (inclusive) and 1 (exclusive).
   * @returns {number}
   */
  static getRandom () {
    return Math.random();
  }

  /**
   * Gets a random number between two values
   *
   * The returned value is no lower than (and may possibly equal) min, and is less than (and not equal) max.
   *
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */
  static getRandomArbitrary (min, max) {
    return Math.random() * (max - min) + min;
  }

  /**
   * Gets a random integer between two values
   *
   * The value is no lower than {min} (or the next integer greater than min if min isn't an integer),
   * and is less than (but not equal to) {max}.
   *
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */
  static getRandomInteger (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  /**
   * Gets a random integer between two values, inclusive
   *
   * While the getRandomInteger() function above is inclusive at the minimum, it's exclusive at the maximum.
   * The getRandomIntegerInclusive() function is inclusive at both the minimum and the maximum.
   *
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */
  static getRandomIntegerInclusive (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }
};

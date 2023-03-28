/**
 * Returns a random integer between min and max. (Range is inclusive)
 * @param min min (included)
 * @param max max (included)
 */
export const getRandomInteger = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min);

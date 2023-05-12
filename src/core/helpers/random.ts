export const getRandomValue = (min: number, max: number, numAfterDigit = 0): number =>
  +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);

export const getRandomItem = <T>(items: T[]): T =>
  items[getRandomValue(0, items.length - 1)];

export const getRandomItems = <T>(items: T[]): T[] => {
  const start = getRandomValue(0, items.length - 1);
  const end = start + getRandomValue(start, items.length);
  return items.slice(start, end);
};



import * as sqlite from 'better-sqlite3';

export const DB = 'DB';

export const DBFactory = () => {
  const db = sqlite(':memory:');
  return db;
};

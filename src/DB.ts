import * as sqlite from 'better-sqlite3';

export const DB = 'DB';

export const DBFactory = (): sqlite.Database => {
  const db = sqlite(':memory:');
  return db;
};

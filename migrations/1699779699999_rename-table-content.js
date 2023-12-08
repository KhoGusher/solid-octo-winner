/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
    ALTER TABLE users RENAME COLUMN created_at TO created_date;
    `);
};

exports.down = pgm => {
    pgm.sql(`
      ALTER TABLE users RENAME COLUMN created_date TO created_at;
    `);
};

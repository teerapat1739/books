"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.createTable(
    "t_user_order",
    {
      id: {
        type: "int",
        primaryKey: true,
        notNull: true,
        autoIncrement: true,
      },
      user_id: {
        type: "int",
        notNull: true,
        length: 255,
      },
      book_id: {
        type: "int",
        notNull: true,
      },
    },
    callback
  );
  return null;
};

exports.down = function (db, callback) {
  db.dropTable("t_user_order", callback);
  return null;
};

exports._meta = {
  version: 1,
};

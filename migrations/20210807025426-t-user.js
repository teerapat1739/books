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
    "t_user",
    {
      id: {
        type: "int",
        primaryKey: true,
        notNull: true,
        autoIncrement: true,
      },
      username: {
        type: "string",
        notNull: true,
        length: 255,
      },
      password: {
        type: "text",
        notNull: true,
      },
      name: {
        type: "text",
        notNull: true,
      },
      surname: {
        type: "text",
        notNull: true,
      },
      date_of_birth: {
        type: "date",
        notNull: true,
      },
      status: {
        type: "int",
        notNull: true,
      },
      created_on: {
        type: "datetime",
        notNull: true,
      },
      updated_on: {
        type: "datetime",
        notNull: true,
      },
      logged_on: {
        type: "datetime",
        notNull: true,
      },
      access_token: {
        type: "text",
        notNull: false,
      },
      refresh_token: {
        type: "text",
        notNull: false,
      },
      refresh_token_exp: {
        type: "datetime",
        notNull: false,
      },
      refresh_token_iat: {
        type: "datetime",
        notNull: false,
      },
    },
    callback
  );

  return null;
};

exports.down = function (db, callback) {
  db.dropTable("t_user", callback);
  return null;
};

exports._meta = {
  version: 1,
};

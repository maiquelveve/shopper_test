"use strict";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packsData = require("./data/packs");

module.exports = {
  async up (queryInterface) {
    queryInterface.bulkInsert("packs", packsData);
  },

  async down (queryInterface) {
    return queryInterface.bulkDelete("packs", null, {});
  }
};

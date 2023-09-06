"use strict";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const productsData = require("./data/products");

module.exports = {
  async up (queryInterface) {
    queryInterface.bulkInsert("products", productsData);
  },

  async down (queryInterface) {
    return queryInterface.bulkDelete("products", null, {});
  }
};

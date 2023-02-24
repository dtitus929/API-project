'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: "Alice",
        lastName: "User",
        email: "alice@user.io",
        username: "AliceUser",
        hashedPassword: bcrypt.hashSync('alicepass')
      },
      {
        firstName: "Ben",
        lastName: "User",
        email: "ben@user.io",
        username: "BenUser",
        hashedPassword: bcrypt.hashSync('benpass')
      },
      {
        firstName: "Cindy",
        lastName: "Owner",
        email: "cindy@user.io",
        username: "CindyOwner",
        hashedPassword: bcrypt.hashSync('cindypass')
      },
      {
        firstName: "Dan",
        lastName: "Owner",
        email: "dan@user.io",
        username: "DanOwner",
        hashedPassword: bcrypt.hashSync('danpass')
      },
      {
        firstName: "Evan",
        lastName: "Owner",
        email: "evan@user.io",
        username: "EvanOwner",
        hashedPassword: bcrypt.hashSync('evanpass')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['AliceUser', 'BenUser', 'CindyOwner', 'DanOwner'] }
    }, {});
  }
};

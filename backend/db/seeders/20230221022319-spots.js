'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 3,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7243289,
        lng: -122.4010889,
        name: "App Academy",
        description: "Place where web developers are created.",
        price: 123
      },
      {
        ownerId: 4,
        address: "2132 Gold Avenue Southeast",
        city: "Albuquerque",
        state: "New Mexico",
        country: "United States of America",
        lat: 35.079918,
        lng: -106.622318,
        name: "Ben's Abode",
        description: "Near downtown with plenty of fine restaurants and quant shops.",
        price: 223
      },
      {
        ownerId: 3,
        address: "217 Seward Street",
        city: "Sitka",
        state: "Alaska",
        country: "United States of America",
        lat: 57.050564,
        lng: -135.337813,
        name: "Grizzly Run",
        description: "See bears, eagles, salmon and majestic beauty right from the deck.",
        price: 210
      },
      {
        ownerId: 4,
        address: "9 Grover Avenue",
        city: "Bar Harbor",
        state: "Maine",
        country: "United States of America",
        lat: 44.317517,
        lng: -68.204560,
        name: "Sunrise Way",
        description: "Be the first in the US to see the sunrise.  Have yourself a lobster.",
        price: 320
      },
      {
        ownerId: 5,
        address: "2323 Beach Way",
        city: "South Padre",
        state: "Texas",
        country: "United States of America",
        lat: 26.110979,
        lng: -97.165718,
        name: "Just Beachy",
        description: "Gulf views and plenty of sunshine.",
        price: 220.50
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ["App Academy", "Ben's Abode", "Grizzly Run", "Sunrise Way"] }
    }, {});
  }
};

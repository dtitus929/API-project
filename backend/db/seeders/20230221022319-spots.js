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
        address: "123 Holly Way Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7243289,
        lng: -122.4010889,
        name: "Castle on the Hill",
        description: "An elegant castle estate set on a hill with a lush garden and grounds.",
        price: 123
      },
      {
        ownerId: 4,
        address: "2132 Main Southeast",
        city: "Albuquerque",
        state: "New Mexico",
        country: "United States of America",
        lat: 35.079918,
        lng: -106.622318,
        name: "Elf Manor",
        description: "A charming cottage that seems as though it was plucked right from the pages of The Hobbit",
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
        name: "Princess Getaway",
        description: "Put on your glass slippers.  But go ahead and party in the dance hall until well after midnight!",
        price: 1010
      },
      {
        ownerId: 4,
        address: "9 Grover Avenue",
        city: "Bar Harbor",
        state: "Maine",
        country: "United States of America",
        lat: 44.317517,
        lng: -68.204560,
        name: "Thatchin' It",
        description: "Margaret Thatcher never slept here.  But you can.  Don't smoke on the porch!",
        price: 320
      },
      {
        ownerId: 5,
        address: "2323 Moat Way",
        city: "South Padre",
        state: "Texas",
        country: "United States of America",
        lat: 26.110979,
        lng: -97.165718,
        name: "Boat in the Moat",
        description: "Just pull up the draw bridge for a very private getaway in this Medieval castle.",
        price: 920.50
      },
      {
        ownerId: 3,
        address: "123 Horsey Lane",
        city: "Burlington",
        state: "Vermont",
        country: "United States of America",
        lat: 37.7243289,
        lng: -122.4010889,
        name: "Charmin' My Socks Off",
        description: "Smell the roses in the lush garden of this quaint country cottage.",
        price: 423
      },
      {
        ownerId: 4,
        address: "2132 King Court Way",
        city: "Frankfurt",
        state: "Colorado",
        country: "United States of America",
        lat: 35.079918,
        lng: -106.622318,
        name: "Tower Corner",
        description: "Climb all four towers in this rustic castle.  BTW, it's haunted... really!",
        price: 1223
      },
      {
        ownerId: 3,
        address: "2329 Elm Street",
        city: "Bule",
        state: "Mississippi",
        country: "United States of America",
        lat: 57.050564,
        lng: -135.337813,
        name: "The Big Elm",
        description: "A big elm welcomes you as drive up to this cozy little cottage.",
        price: 470
      },
      {
        ownerId: 4,
        address: "1310 Drawbride Lane",
        city: "Hamilton",
        state: "Maryland",
        country: "United States of America",
        lat: 44.317517,
        lng: -68.204560,
        name: "Shrek Shack",
        description: "Is there a fair maiden awaiting you in the tower?  There is, and a donkey in the stable.",
        price: 1320
      },
      {
        ownerId: 5,
        address: "2323 Rogan Lane",
        city: "Cairo",
        state: "Illinois",
        country: "United States of America",
        lat: 26.110979,
        lng: -97.165718,
        name: "Kickin' It Cottage",
        description: "Privacy abounds in this cozy cottage.  Kick your shoes off and take a nap.",
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

'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        review: "This place was wonderful!  The kitchen was just redone.  Beds were comfy.",
        stars: 4
      },
      {
        spotId: 1,
        userId: 2,
        review: "We really enjoyed our stay here.  Plenty of nearby restaurants.",
        stars: 5
      },
      {
        spotId: 1,
        userId: 4,
        review: "The fridge came fully stocked with beer.  My kinda place!",
        stars: 4
      },
      {
        spotId: 2,
        userId: 1,
        review: "This place had a bad smell!",
        stars: 1
      },
      {
        spotId: 3,
        userId: 2,
        review: "I didn't want to leave.  The view was incredible from the back patio!",
        stars: 5
      },
      {
        spotId: 4,
        userId: 2,
        review: "I wasn't too impressed.  This place was really old and worn out.",
        stars: 2
      },
      {
        spotId: 5,
        userId: 1,
        review: "The giant building across the street might have a view of the beach.  This place does not!",
        stars: 1
      }
      ,
      {
        spotId: 5,
        userId: 2,
        review: "Moldy fridge, restaurant dumpster is 20 feet from porch.  Skip this place!",
        stars: 2
      }
      ,
      {
        spotId: 5,
        userId: 3,
        review: "Lord of the flies reigns in a dumpster just a few stops from the front porch.  Yuck!",
        stars: 1
      }
      ,
      {
        spotId: 5,
        userId: 4,
        review: "Holy moldy fridge Batman! Robin laid a rotten egg in the next door dumpster.",
        stars: 2
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};

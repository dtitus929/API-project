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

'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "image1.url1",
        preview: true
      },
      {
        spotId: 1,
        url: "image1.url2",
        preview: false
      },
      {
        spotId: 1,
        url: "image1.url3",
        preview: false
      },
      {
        spotId: 2,
        url: "image2.url1",
        preview: true
      },
      {
        spotId: 2,
        url: "image2.url2",
        preview: false
      },
      {
        spotId: 2,
        url: "image3.url3",
        preview: false
      },
      {
        spotId: 3,
        url: "image3.url1",
        preview: true
      },
      {
        spotId: 3,
        url: "image3.url2",
        preview: false
      },
      {
        spotId: 3,
        url: "image3.url3",
        preview: false
      },
      {
        spotId: 4,
        url: "image4.url1",
        preview: true
      },
      {
        spotId: 4,
        url: "image4.url2",
        preview: false
      },
      {
        spotId: 4,
        url: "image4.url3",
        preview: false
      },
      {
        spotId: 5,
        url: "image5.url1",
        preview: true
      },
      {
        spotId: 5,
        url: "image5.url2",
        preview: false
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ["image1.url1", "image1.url2", "image1.url3", "image2.url1", "image2.url2", "image2.url3", "image3.url1", "image3.url2", "image3.url3", "image4.url1", "image4.url2", "image4.url3"] }
    }, {});
  }
};

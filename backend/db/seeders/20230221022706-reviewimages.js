'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: "image1.url1"
      },
      {
        reviewId: 1,
        url: "image1.url2"
      },
      {
        reviewId: 1,
        url: "image1.url3"
      },
      {
        reviewId: 2,
        url: "image2.url1"
      },
      {
        reviewId: 2,
        url: "image2.url2"
      },
      {
        reviewId: 2,
        url: "image2.url3"
      },
      {
        reviewId: 2,
        url: "image2.url4"
      },
      {
        reviewId: 2,
        url: "image2.url5"
      },
      {
        reviewId: 3,
        url: "image3.url1"
      },
      {
        reviewId: 4,
        url: "image4.url1"
      },
      {
        reviewId: 4,
        url: "image4.url2"
      },
      {
        reviewId: 4,
        url: "image4.url3"
      },
      {
        reviewId: 4,
        url: "image4.url4"
      },
      {
        reviewId: 4,
        url: "image4.url5"
      },
      {
        reviewId: 4,
        url: "image4.url6"
      },
      {
        reviewId: 4,
        url: "image4.url7"
      },
      {
        reviewId: 4,
        url: "image4.url8"
      },
      {
        reviewId: 4,
        url: "image4.url9"
      },
      {
        reviewId: 4,
        url: "image4.url10"
      },
      {
        reviewId: 7,
        url: "image5.url1"
      },
      {
        reviewId: 8,
        url: "image5.url2"
      },
      {
        reviewId: 9,
        url: "image5.url3"
      },
      {
        reviewId: 10,
        url: "image5.url4"
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};

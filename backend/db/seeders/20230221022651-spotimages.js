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
        url: "http://www.creativegozone.com/aircnc/castle1.png",
        preview: true
      },
      {
        spotId: 1,
        url: "http://www.creativegozone.com/aircnc/castleint1.png",
        preview: false
      },
      {
        spotId: 1,
        url: "http://www.creativegozone.com/aircnc/castleint2.png",
        preview: false
      },
      {
        spotId: 1,
        url: "http://www.creativegozone.com/aircnc/castleint3.png",
        preview: false
      },
      {
        spotId: 1,
        url: "http://www.creativegozone.com/aircnc/castleint4.png",
        preview: false
      },
      {
        spotId: 2,
        url: "http://www.creativegozone.com/aircnc/cottage1.png",
        preview: true
      },
      {
        spotId: 2,
        url: "http://www.creativegozone.com/aircnc/cottageint1.png",
        preview: false
      },
      {
        spotId: 2,
        url: "http://www.creativegozone.com/aircnc/cottageint2.png",
        preview: false
      },
      {
        spotId: 2,
        url: "http://www.creativegozone.com/aircnc/cottageint3.png",
        preview: false
      },
      {
        spotId: 2,
        url: "http://www.creativegozone.com/aircnc/cottageint4.png",
        preview: false
      },
      {
        spotId: 3,
        url: "http://www.creativegozone.com/aircnc/castle2.png",
        preview: true
      },
      {
        spotId: 3,
        url: "http://www.creativegozone.com/aircnc/castleint1.png",
        preview: false
      },
      {
        spotId: 3,
        url: "http://www.creativegozone.com/aircnc/castleint2.png",
        preview: false
      },
      {
        spotId: 3,
        url: "http://www.creativegozone.com/aircnc/castleint3.png",
        preview: false
      },
      {
        spotId: 3,
        url: "http://www.creativegozone.com/aircnc/castleint4.png",
        preview: false
      },
      {
        spotId: 4,
        url: "http://www.creativegozone.com/aircnc/cottage2.png",
        preview: true
      },
      {
        spotId: 4,
        url: "http://www.creativegozone.com/aircnc/cottageint1.png",
        preview: false
      },
      {
        spotId: 4,
        url: "http://www.creativegozone.com/aircnc/cottageint2.png",
        preview: false
      },
      {
        spotId: 4,
        url: "http://www.creativegozone.com/aircnc/cottageint3.png",
        preview: false
      },
      {
        spotId: 4,
        url: "http://www.creativegozone.com/aircnc/cottageint4.png",
        preview: false
      },
      {
        spotId: 5,
        url: "http://www.creativegozone.com/aircnc/castle3.png",
        preview: true
      },
      {
        spotId: 5,
        url: "http://www.creativegozone.com/aircnc/castleint1.png",
        preview: false
      },
      {
        spotId: 5,
        url: "http://www.creativegozone.com/aircnc/castleint2.png",
        preview: false
      },
      {
        spotId: 5,
        url: "http://www.creativegozone.com/aircnc/castleint3.png",
        preview: false
      },
      {
        spotId: 5,
        url: "http://www.creativegozone.com/aircnc/castleint4.png",
        preview: false
      },
      {
        spotId: 6,
        url: "http://www.creativegozone.com/aircnc/cottage3.png",
        preview: true
      },
      {
        spotId: 6,
        url: "http://www.creativegozone.com/aircnc/cottageint1.png",
        preview: false
      },
      {
        spotId: 6,
        url: "http://www.creativegozone.com/aircnc/cottageint2.png",
        preview: false
      },
      {
        spotId: 6,
        url: "http://www.creativegozone.com/aircnc/cottageint3.png",
        preview: false
      },
      {
        spotId: 6,
        url: "http://www.creativegozone.com/aircnc/cottageint4.png",
        preview: false
      },
      {
        spotId: 7,
        url: "http://www.creativegozone.com/aircnc/castle4.png",
        preview: true
      },
      {
        spotId: 7,
        url: "http://www.creativegozone.com/aircnc/castleint1.png",
        preview: false
      },
      {
        spotId: 7,
        url: "http://www.creativegozone.com/aircnc/castleint2.png",
        preview: false
      },
      {
        spotId: 7,
        url: "http://www.creativegozone.com/aircnc/castleint3.png",
        preview: false
      },
      {
        spotId: 7,
        url: "http://www.creativegozone.com/aircnc/castleint4.png",
        preview: false
      },
      {
        spotId: 8,
        url: "http://www.creativegozone.com/aircnc/cottage4.png",
        preview: true
      },
      {
        spotId: 8,
        url: "http://www.creativegozone.com/aircnc/cottageint1.png",
        preview: false
      },
      {
        spotId: 8,
        url: "http://www.creativegozone.com/aircnc/cottageint2.png",
        preview: false
      },
      {
        spotId: 8,
        url: "http://www.creativegozone.com/aircnc/cottageint3.png",
        preview: false
      },
      {
        spotId: 8,
        url: "http://www.creativegozone.com/aircnc/cottageint4.png",
        preview: false
      },
      {
        spotId: 9,
        url: "http://www.creativegozone.com/aircnc/castle5.png",
        preview: true
      },
      {
        spotId: 9,
        url: "http://www.creativegozone.com/aircnc/castleint1.png",
        preview: false
      },
      {
        spotId: 9,
        url: "http://www.creativegozone.com/aircnc/castleint2.png",
        preview: false
      },
      {
        spotId: 9,
        url: "http://www.creativegozone.com/aircnc/castleint3.png",
        preview: false
      },
      {
        spotId: 9,
        url: "http://www.creativegozone.com/aircnc/castleint4.png",
        preview: false
      },
      {
        spotId: 10,
        url: "http://www.creativegozone.com/aircnc/cottage5.png",
        preview: true
      },
      {
        spotId: 10,
        url: "http://www.creativegozone.com/aircnc/cottageint1.png",
        preview: false
      },
      {
        spotId: 10,
        url: "http://www.creativegozone.com/aircnc/cottageint2.png",
        preview: false
      },
      {
        spotId: 10,
        url: "http://www.creativegozone.com/aircnc/cottageint3.png",
        preview: false
      },
      {
        spotId: 10,
        url: "http://www.creativegozone.com/aircnc/cottageint4.png",
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

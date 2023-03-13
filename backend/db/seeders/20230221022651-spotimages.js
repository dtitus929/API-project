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
        url: "https://i.ibb.co/4SGM2g6/castle1.png",
        preview: true
      },
      {
        spotId: 1,
        url: "https://i.ibb.co/7NjS1rR/castleint1.png",
        preview: false
      },
      {
        spotId: 1,
        url: "https://i.ibb.co/7YQySgz/castleint2.png",
        preview: false
      },
      {
        spotId: 1,
        url: "https://i.ibb.co/d5wCgNQ/castleint3.png",
        preview: false
      },
      {
        spotId: 1,
        url: "https://i.ibb.co/xH9wm1w/castleint4.png",
        preview: false
      },
      {
        spotId: 2,
        url: "https://i.ibb.co/gWZckKZ/cottage1.png",
        preview: true
      },
      {
        spotId: 2,
        url: "https://i.ibb.co/bFHcGkH/cottageint1.png",
        preview: false
      },
      {
        spotId: 2,
        url: "https://i.ibb.co/SdDdQpw/cottageint2.png",
        preview: false
      },
      {
        spotId: 2,
        url: "https://i.ibb.co/1sDgD6H/cottageint3.png",
        preview: false
      },
      {
        spotId: 2,
        url: "https://i.ibb.co/jhQ6twJ/cottageint4.png",
        preview: false
      },
      {
        spotId: 3,
        url: "https://i.ibb.co/JR9T0Wy/castle2.png",
        preview: true
      },
      {
        spotId: 3,
        url: "https://i.ibb.co/7NjS1rR/castleint1.png",
        preview: false
      },
      {
        spotId: 3,
        url: "https://i.ibb.co/7YQySgz/castleint2.png",
        preview: false
      },
      {
        spotId: 3,
        url: "https://i.ibb.co/d5wCgNQ/castleint3.png",
        preview: false
      },
      {
        spotId: 3,
        url: "https://i.ibb.co/xH9wm1w/castleint4.png",
        preview: false
      },
      {
        spotId: 4,
        url: "https://i.ibb.co/TPKDzpJ/cottage2.png",
        preview: true
      },
      {
        spotId: 4,
        url: "https://i.ibb.co/bFHcGkH/cottageint1.png",
        preview: false
      },
      {
        spotId: 4,
        url: "https://i.ibb.co/SdDdQpw/cottageint2.png",
        preview: false
      },
      {
        spotId: 4,
        url: "https://i.ibb.co/1sDgD6H/cottageint3.png",
        preview: false
      },
      {
        spotId: 4,
        url: "https://i.ibb.co/jhQ6twJ/cottageint4.png",
        preview: false
      },
      {
        spotId: 5,
        url: "https://i.ibb.co/NjG5MFg/castle3.png",
        preview: true
      },
      {
        spotId: 5,
        url: "https://i.ibb.co/7NjS1rR/castleint1.png",
        preview: false
      },
      {
        spotId: 5,
        url: "https://i.ibb.co/7YQySgz/castleint2.png",
        preview: false
      },
      {
        spotId: 5,
        url: "https://i.ibb.co/d5wCgNQ/castleint3.png",
        preview: false
      },
      {
        spotId: 5,
        url: "https://i.ibb.co/xH9wm1w/castleint4.png",
        preview: false
      },
      {
        spotId: 6,
        url: "https://i.ibb.co/Qp3SyHS/cottage3.png",
        preview: true
      },
      {
        spotId: 6,
        url: "https://i.ibb.co/bFHcGkH/cottageint1.png",
        preview: false
      },
      {
        spotId: 6,
        url: "https://i.ibb.co/SdDdQpw/cottageint2.png",
        preview: false
      },
      {
        spotId: 6,
        url: "https://i.ibb.co/1sDgD6H/cottageint3.png",
        preview: false
      },
      {
        spotId: 6,
        url: "https://i.ibb.co/jhQ6twJ/cottageint4.png",
        preview: false
      },
      {
        spotId: 7,
        url: "https://i.ibb.co/TcLb5PJ/castle4.png",
        preview: true
      },
      {
        spotId: 7,
        url: "https://i.ibb.co/7NjS1rR/castleint1.png",
        preview: false
      },
      {
        spotId: 7,
        url: "https://i.ibb.co/7YQySgz/castleint2.png",
        preview: false
      },
      {
        spotId: 7,
        url: "https://i.ibb.co/d5wCgNQ/castleint3.png",
        preview: false
      },
      {
        spotId: 7,
        url: "https://i.ibb.co/xH9wm1w/castleint4.png",
        preview: false
      },
      {
        spotId: 8,
        url: "https://i.ibb.co/pdf1QkJ/cottage4.png",
        preview: true
      },
      {
        spotId: 8,
        url: "https://i.ibb.co/bFHcGkH/cottageint1.png",
        preview: false
      },
      {
        spotId: 8,
        url: "https://i.ibb.co/SdDdQpw/cottageint2.png",
        preview: false
      },
      {
        spotId: 8,
        url: "https://i.ibb.co/1sDgD6H/cottageint3.png",
        preview: false
      },
      {
        spotId: 8,
        url: "https://i.ibb.co/jhQ6twJ/cottageint4.png",
        preview: false
      },
      {
        spotId: 9,
        url: "https://i.ibb.co/SdyXmvT/castle5.png",
        preview: true
      },
      {
        spotId: 9,
        url: "https://i.ibb.co/7NjS1rR/castleint1.png",
        preview: false
      },
      {
        spotId: 9,
        url: "https://i.ibb.co/7YQySgz/castleint2.png",
        preview: false
      },
      {
        spotId: 9,
        url: "https://i.ibb.co/d5wCgNQ/castleint3.png",
        preview: false
      },
      {
        spotId: 9,
        url: "https://i.ibb.co/xH9wm1w/castleint4.png",
        preview: false
      },
      {
        spotId: 10,
        url: "https://i.ibb.co/FHyxH3S/cottage5.png",
        preview: true
      },
      {
        spotId: 10,
        url: "https://i.ibb.co/bFHcGkH/cottageint1.png",
        preview: false
      },
      {
        spotId: 10,
        url: "https://i.ibb.co/SdDdQpw/cottageint2.png",
        preview: false
      },
      {
        spotId: 10,
        url: "https://i.ibb.co/1sDgD6H/cottageint3.png",
        preview: false
      },
      {
        spotId: 10,
        url: "https://i.ibb.co/jhQ6twJ/cottageint4.png",
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

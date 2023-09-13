const { Availability } = require("../db");
const sequelize = require("sequelize");

const removeExpiredRecords = async () => {
  const currentTime = new Date();

  await Availability.destroy({
    where: {
      expirationTime: {
        [sequelize.Op.lt]: currentTime,
      },
    },
  });
};

module.exports = { removeExpiredRecords };

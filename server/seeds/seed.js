const db = require('../config/connection');
const { User, Location } = require('../models');
const userData = require('./user.json');
const locationData = require('./location.json');


db.once('open', async () => {
  try {
    await User.deleteMany({});
    await Location.deleteMany({});
    await User.create(userData);

    for (let i = 0; i < locationData.length; i++) {
      const { _id, title } = await Location.create(locationData[i]);
      const user = await User.findOneAndUpdate(
        { username: title },
        {
          $addToSet: { savedLocations: _id },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('User & Location Data seeded!');
  process.exit(0);
});

const db = require('../config/connection');
const { User, Location } = require('../models');

const userData = require('./user.json');
const locationData = require('./location.json');

const seedData = async () => {
  try {
    await db.once("open", async () => {
      // Delete all existing users and locations
      await User.deleteMany({});
      await Location.deleteMany({});
      // Insert user and location data
      const users = await User.insertMany(userData);
      const locations = await Location.insertMany(locationData);
      console.log("User Data:", users);
      // console.log(users);
      console.log("Location Data:", locations);
      // console.log(locations);
      process.exit(0);
    });
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};
seedData();

// db.once('open', async () => {
//   await User.deleteMany({});

//   const users = await User.insertMany(userData);
//   const locations = await Location.insertMany(locationData);

//   console.log('User & Location Data seeded!');
//   process.exit(0);
// });

const db = require("../config/connection");
const { User, Location } = require("../models");

const userData = require("./user.json");
const locationData = require("./location.json");



// db.once('open', async () => {
//   await User.deleteMany({});

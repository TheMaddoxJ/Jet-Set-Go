const mongoose = require('mongoose');

// we will need to change the URI for heroku deployment :( 
    
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/jetsetgo');

module.exports = mongoose.connection;

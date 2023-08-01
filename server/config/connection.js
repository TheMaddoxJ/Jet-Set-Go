const mongoose = require('mongoose');

// we will need to change the URI for heroku deployment :( 
    
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log('MongoDB connection error', err)) || 'mongodb://127.0.0.1:27017/jetsetgo';

module.exports = mongoose.connection;
const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const  mongoose = require("mongoose");
const schema = require('./schema');
const resolvers = require('./schema/resolvers')

const { ApolloServer } = require("apollo-server-express");
const path = require("path");

// import user defined files
const { authMiddleware } = require("./utils/auth");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

// express server
const PORT = process.env.PORT || 3001;
const app = express();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.losg('MongoDB connection error', err));

// instance of Apollo server. pass in schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`🌎 Server running on port ${PORT}!`);
})
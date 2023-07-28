const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");

// import user defined files
const { authMiddleware } = require("./utils/auth");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

// express server
const PORT = process.env.PORT || 3001;
const app = express();

// instance of Apollo server. pass in schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

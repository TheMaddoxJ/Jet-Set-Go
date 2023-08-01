const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const  mongoose = require("mongoose");
// const schema = require('./schema');
// const resolvers = require('./schema/resolvers')

const { ApolloServer } = require("apollo-server-express");
const path = require("path");

// import user defined files
const { authMiddleware } = require("./utils/auth");
const { typeDefs, resolvers } = require("./schema");
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

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.losg('MongoDB connection error', err));

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serve client/build as static assets while in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/"));
});

// new instance of an Apollo server with GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call async function to start the server
startApolloServer(typeDefs, resolvers);
const express = require("express");
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const  mongoose = require("mongoose");
const { typeDefs, resolvers } = require("./schema");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const bodyParser = require("body-parser");

//Initialize instance of express server
const app = express();

//Set up OpenAI connection
const { Configuration, OpenAIApi } = require("openai");
const config = new Configuration({
  //TODO - WILL NEED TO MOVE KEY TO PROTECT FROM PUBLIC
  apiKey: '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',
});
const openai = new OpenAIApi(config);

//OpenAI Middleware required
app.use(bodyParser.json());
app.use(cors());

//Set up OpenAI post route - Can move to routes later if needed
app.post("/chat", async (req, res) => {
  const {prompt} = req.body;
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    max_tokens: 512,
    temperature: 0,
    prompt: prompt,
  });
  res.send(completion.data.choices[0].text);
});


// import user defined files
const { authMiddleware } = require('./utils/auth');

const db = require("./config/connection");

// express server
const PORT = process.env.PORT || 3001;
// instance of Apollo server. pass in schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

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
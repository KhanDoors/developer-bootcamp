const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Recipe = require("./models/Recipe");
const User = require("./models/User");

const db = require("./config/keys").mongoURI;

//bring in graphql express middleware
const { graphiqlExpress, graphqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");

//create schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// connect to DB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Mongo Connected"))
  .catch(err => console.log(err));
mongoose.set("useCreateIndex", true);

//initialize app
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

app.use(cors(corsOptions));

//create Graphiql GUI
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

//connect schemas to Graphql
app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({
    schema,
    context: {
      Recipe,
      User
    }
  })
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

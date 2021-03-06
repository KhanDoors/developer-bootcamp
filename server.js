const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Recipe = require("./models/Recipe");
const User = require("./models/User");
const secret = require("./config/secret");
const jwt = require("jsonwebtoken");
const path = require("path");
const db = require("./config/secret").mongoURI;

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

// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true
// };

// app.use(cors(corsOptions));
app.use(cors("*"));

//set up JWT middleware
app.use(async (req, res, next) => {
  const token = req.headers["authorization"];
  if (token !== "null") {
    try {
      const currentUser = await jwt.verify(token, secret.secretOrKey);
      req.currentUser = currentUser;
    } catch (err) {
      console.error(err);
    }
  }
  next();
});

//create Graphiql GUI
// app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

//connect schemas to Graphql
app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress(({ currentUser }) => ({
    schema,
    context: {
      Recipe,
      User,
      currentUser
    }
  }))
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

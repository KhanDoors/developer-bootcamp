const express = require("express");
const mongoose = require("mongoose");

const Recipe = require("./models/Recipe");
const User = require("./models/User");

const app = express();

const db = require("./config/keys").mongoURI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Mongo Connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

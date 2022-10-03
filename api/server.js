const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());
const cors = require("cors");
app.use(cors());
require("./router/route.js");
const mongoose = require("mongoose");
const db = process.env.DB;

mongoose.connect(
  db,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to the db");
  }
);

app.use("/", require("./router/route"));

app.listen(8000, () => {
  console.log("app is listening on the porrt 8800");
});

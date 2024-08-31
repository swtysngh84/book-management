const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();
require("./schema");

const { connect } = require("./database/mongo.service");
const { userRouter, bookRouter } = require("./routes");

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "5000kb" }));
app.use(bodyParser.urlencoded({ extended: true }));
connect();

app.use("/user", userRouter);

app.use("/book", bookRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Project started at ${port}`);
});

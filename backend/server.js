require("dotenv").config();

const express = require("express");
const entryRoutes = require("./routes/entries");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");
const cors = require("cors");
//express app
const app = express();

//Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json()); //Looks for json body, attatches to req object
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
//routes

app.use("/api/film-entries", entryRoutes);
app.use("/api/user", userRoutes);
//connect to db
try {
  //listen for requets
  app.listen(process.env.PORT, () => {
    console.log("listening on port 4000");
  });
} catch (err) {
  console.log(err);
}

require("dotenv").config();

const express = require("express");
const workoutRoutes = require("./routes/workouts");
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

//workouts
app.use("/api/workouts", workoutRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    
    //listen for requets
    app.listen(process.env.PORT, () => {
        console.log("listening on port 4000");
      });
  })
  .catch((err) => console.log(err));




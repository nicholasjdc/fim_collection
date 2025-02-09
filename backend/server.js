require("dotenv").config();

const express = require("express");
const entryRoutes = require("./routes/entries");
const userRoutes = require("./routes/user");
const cors = require("cors");
//express app
const app = express();

//Middleware
const allowedOrigins = [
  "http://localhost:5173", // Your frontend development URL
  "https://transcendent-seahorse-341c0d.netlify.app", // Your production frontend URL
  // Add any other allowed origins here
];

app.use(cors({
  origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) { // Allow requests with no origin (e.g., Postman) or from allowed origins
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },
  credentials: true
}));
//app.use(cors({ origin: true, credentials: true }));
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


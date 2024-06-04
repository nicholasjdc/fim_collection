const express = require("express");
const {
  createEntry,
  getEntry,
  getEntries,
  deleteEntry,
  updateEntry,
  getGreatestEntryCode
} = require("../controller/sqlEntryController");

const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

//require auth for all workout routes 
//middleware, fire before all code below
//router.use(requireAuth)

//GET greatestEntryNumber
router.get("/getGreatestEntryCode", getGreatestEntryCode)
//Get all entries
router.get("/", getEntries);


//GET single entry
router.get("/:id", getEntry);

//POST a new entry
router.post("/", createEntry);

//DELETE a entry
router.delete("/:id", deleteEntry);

//UPDATE a entry
router.patch("/:id", updateEntry);

//UPDATE multiple entries
//router.patch("/updateAll/something", updateEntries)

module.exports = router;

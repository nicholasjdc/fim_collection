const express = require("express");
const {
  createEntry,
  getEntry,
  getEntries,
  deleteEntry,
  updateEntry,
} = require("../controller/entryController");
const router = express.Router();
//Get all workouts
router.get("/", getEntries);

//GET single workout
router.get("/:id", getEntry);

//POST a new workout
router.post("/", createEntry);

//DELETE a workout
router.delete("/:id", deleteEntry);

//UPDATE a workout
router.patch("/:id", updateEntry);

module.exports = router;

const express = require("express");
const {
  createEntry,
  getEntry,
  getEntries,
  deleteEntry,
  updateEntry,
} = require("../controller/entryController");
const router = express.Router();
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

module.exports = router;

const express = require("express");
const {
  createEntry,
  getEntry,
  getEntries,
  deleteEntry,
  updateEntry,
  getGreatestEntryCode
} = require("../controller/sqlEntryController");

const requireAuthSimple = require('../middleware/requireAuthSimple')
const requireAdmin = require('../middleware/requireAdmin')
const router = express.Router();

router.use(requireAuthSimple)
//GET greatestEntryNumber
router.get("/getGreatestEntryCode", getGreatestEntryCode)
//Get all entries
router.get("/", getEntries);


//GET single entry
router.get("/:id", getEntry);

router.use(requireAdmin)
//POST a new entry
router.post("/", createEntry);

//DELETE a entry
router.delete("/:id", deleteEntry);

//UPDATE a entry
router.patch("/:id", updateEntry);

//UPDATE multiple entries
//router.patch("/updateAll/something", updateEntries)

module.exports = router;

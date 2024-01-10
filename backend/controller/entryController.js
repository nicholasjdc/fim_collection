const { default: mongoose } = require("mongoose");
const Entry = require("../models/bookEntryModel");

const limitCount = 25
const getEntry = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such entry" });
  }

  const entry = await Entry.findById(id);
  if (!entry) {
    return res.status(404).json({ error: "No such entry" });
  }
  res.status(200).json(entry);
};
const getEntries = async (req, res) => {
  const entries = await Entry.find(req.query).sort({ createdAt: -1 }).limit(limitCount).skip(0);
  //add skip-count into req.query
  res.status(200).json(entries); //also add in length 

};

const deleteEntry = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such entry" });
  }

  const entry = await Entry.findOneAndDelete({ _id: id });

  if (!entry) {
    return res.status(404).json({ error: "No such entry" });
  }

  res.status(200).json(entry);
};
const updateEntry = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such entry'});
    }
    const entry = await Entry.findOneAndUpdate({_id:id}, {
        ...req.body
    });
    
    if(!entry){
        return res.status(404).json({error: 'No such entry'})
    }

  res.status(200).json(entry);
};
const createEntry = async (req, res) => {
  const {
    entryNumber,
    author,
    authorc,
    authorp,
    title,
    titlec,
    titlep,
    publication,
    pageCount,
    ISBN,
    seriesTitle,
    seriesTitlec,
    note,
    resource,
    languageCode,
    subjects,
    missingFields,
    instantiatedAt,
  } = req.body;
  /*
  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }
*/
  try {
    const entry = await Entry.create({
      entryNumber,
      author,
      authorc,
      authorp,
      title,
      titlec,
      titlep,
      publication,
      pageCount,
      ISBN,
      seriesTitle,
      seriesTitlec,
      note,
      resource,
      languageCode,
      subjects,
      missingFields,
    });
    res.status(200).json(entry);
  } catch (error) {
    /* mongoose thrown error */
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  getEntry,
  getEntries,
  deleteEntry,
  updateEntry,
  createEntry,
};

const { default: mongoose } = require("mongoose");
const Entry = require("../models/bookEntryModel");

const limitCount = 25;

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
  let pageNum = 0;
  let currQuery = {}
  let mongoQuery = req.query;
  //pageination time
  console.log(req.query);
  if (mongoQuery.resultPageNumber) {
    pageNum = mongoQuery.resultPageNumber;
  }
  if (mongoQuery.title) {
    currQuery.titleAgg = {$regex: new RegExp(mongoQuery.title, "i")}
  
  }
  if (mongoQuery.author) {
    authorKeyword = mongoQuery.author;
    if (
      !authorKeyword.match(/[\u3400-\u9FBF]/) &&
      authorKeyword.split(" ").length >= 2
    ) {
      authorArr = mongoQuery.author.split(" ");
      authorKeyword = `(?=.*${authorArr[0]})(?=.*${authorArr[1]})`;
    }
    currQuery.authorAgg = {$regex: new RegExp(authorKeyword, "i")}
  }
  if (mongoQuery.keyword) {
    authorKeyword = mongoQuery.keyword;
    if (
      !authorKeyword.match(/[\u3400-\u9FBF]/) &&
      authorKeyword.split(" ").length >= 2
    ) {
      keywordArr = mongoQuery.keyword.split(" ");
      authorKeyword = `(?=.*${keywordArr[0]})(?=.*${keywordArr[1]})`;
    }
    currQuery.$or = [
      { title: { $regex: mongoQuery.keyword, $options: "i" } },
      { titlec: { $regex: mongoQuery.keyword, $options: "i" } },
      { titlep: { $regex: mongoQuery.keyword, $options: "i" } },
      { author: { $regex: authorKeyword, $options: "i" } },
      { authorp: { $regex: authorKeyword, $options: "i" } },
      { authorc: { $regex: mongoQuery.keyword, $options: "i" } },
      { note: { $regex: mongoQuery.keyword, $options: "i" } },
    ]

  }
  if (mongoQuery.subjects) {
    currQuery.subjects = {$in: mongoQuery.subjects.split("$#")}
  }
  if (mongoQuery.languageCode) {
    currQuery.languageCode = {$in: mongoQuery.languageCode.split("$#")}
  }
  console.log(currQuery)
  if (pageNum > 0) pageNum -= 1;
  const recordCount =  (await Entry.find(currQuery).countDocuments());
  const entries = await Entry.find(currQuery).sort({ createdAt: -1 })
  .limit(limitCount)
  .skip(pageNum * limitCount);
  //add skip-count into req.query
  res.status(200).json({ entries: entries, recordCount: recordCount }); //also add in length
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
const updateEntries = async (req, res) => {
  try {
    console.log(this.author);
    const result = await Entry.updateMany({}, [
      {
        $set: {
          titleAgg: { $concat: ["$title", " ", "$titlep", " ","$titlec"] },
        },
      },
    ]);
    console.log(result);
    res.status(200).json({ update: "done" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const updateEntry = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such entry" });
  }
  const entry = await Entry.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!entry) {
    return res.status(404).json({ error: "No such entry" });
  }

  res.status(200).json(entry);
};
const createEntry = async (req, res) => {
  console.log(req.body);
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
  updateEntries,
  createEntry,
};

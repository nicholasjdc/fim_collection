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
  const booleanCode = "$!";
  let pageNum = 0;
  let currQuery = {};
  currQuery.$or = { titleAgg: { $in: [] }, $authorAgg: { $in: [] } };
  if (req.query.resultPageNumber) {
    pageNum = req.query.resultPageNumber;
  }
  const sortRequestQuery = (request) => {
    let sortedQuery = {};
    for (const [key, value] of Object.entries(request.query)) {
      if (key =="resultPageNumber") continue;
      sortedQuery[key] = [];

      if (value instanceof Array) {
        let tempValue = value;
        for (v of tempValue) {
          sortedQuery[key].push(v.split(booleanCode));
        }
      } else {
        sortedQuery[key].push(value.split(booleanCode));
      }
    }
    return sortedQuery;
  };
  const setQueryField = (fieldname, inclusiveSearch, receivedQuery) => {
    currQuery[fieldName] = { $in: [], $nin: [] };
    for (v of receivedQuery) {

      boolOp = v[0];
      val = v[1];
      if (inclusiveSearch == true) {
        val = /val/i;
      }

      if (boolOp == "AND") {
        currQuery[fieldname].$in.push(val);
      } else if (boolOp == "OR") {
        currQuery.$or[fieldname].$in.push(val);
      } else if (boolOp == "NOT") {
        currQuery[fieldname].$nin.push(val);
      } else {
        throw Error("Non-permissible Operation Code: " + boolOp);
      }
    }
  };
  sortedQuery = sortRequestQuery(req.query)
  inclusiveSearchFields = ["titleAgg", "authorAgg"]
  for (const [key, value] of Object.entries(sortedQuery)){
    inclusiveSearch = false
    if(key in inclusiveSearchFields){
      inclusiveSearch=true
    }
    setQueryField(field, inclusiveSearch, value)
  }

  if (mongoQuery.author) {
    currQuery.authorAgg = { $in: [], $nin: [] };
    boolOp = v[0];
    val = v[1];
    for (v of mongoQuery.title) {
      boolOp = v[0];
      val = v[1];
      authorKeyword = val;
      if (
        !authorKeyword.match(/[\u3400-\u9FBF]/) &&
        authorKeyword.split(" ").length >= 2
      ) {
        authorArr = mongoQuery.author.split(" ");
        authorKeyword = `(?=.*${authorArr[0]})(?=.*${authorArr[1]})`;
      }
      if (boolOp == "AND") {
        currQuery.authorAgg.$in.push(/authorKeyword/i);
      } else if (boolOp == "OR") {
        currQuery.$or.authorAgg.$in.push(/authorKeyword/i);
      } else if (boolOp == "NOT") {
        currQuery.authorAgg.$nin.push(authorKeyword);
      } else {
        throw Error("Non-permissible Operation Code: " + boolOp);
      }
    }
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
    ];
  }
  /*
  if (mongoQuery.languageCode) {
    currQuery.languageCode = { $in: mongoQuery.languageCode.split("$#") };
  }
  if (mongoQuery.entryNumber) {
    currQuery.entryNumber = mongoQuery.entryNumber;
  }
  if (mongoQuery.pageCount) {
    currQuery.pageCount = { $regex: new RegExp(mongoQuery.pageCount, "i") };
  }
  if (mongoQuery.ISBN) {
    currQuery.ISBN = { $regex: new RegExp(mongoQuery.ISBN, "i") };
  }
  if (mongoQuery.seriesTitle) {
    currQuery.seriesTitle = { $regex: new RegExp(mongoQuery.seriesTitle, "i") };
  }
  if (mongoQuery.publication) {
    currQuery.publication = { $regex: new RegExp(mongoQuery.publication, "i") };
  }
  if (mongoQuery.note) {
    currQuery.note = { $regex: new RegExp(mongoQuery.note, "i") };
  }
  console.log(currQuery);
  */
  if (pageNum > 0) pageNum -= 1;
  const recordCount = await Entry.find(currQuery).countDocuments();
  const entries = await Entry.find(currQuery)
    .sort({ createdAt: -1 })
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
          titleAgg: { $concat: ["$title", " ", "$titlep", " ", "$titlec"] },
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

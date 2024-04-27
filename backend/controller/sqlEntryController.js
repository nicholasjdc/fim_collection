const limitCount = 25;
const supabase = require("@supabase/supabase-js");
const supabaseUrl = "https://raifuhqmtrdvncpkonjm.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
const getEntry = async (req, res) => {
  const { id } = req.params;

  const { data, error, status } = await supabaseClient
    .from("entries")
    .select()
    .eq("id", id);
  if (error) {
    return res.status(status).json({ error: error.message });
  }
  if (data.length <= 0) {
    return res.status(404).json({ error: "No such entry" });
  }
  res.status(status).json(data);
};
const getEntries = async (req, res) => {
  const sortRequestQuery = (query) => {
    const booleanCode = "$!";
    let sortedQuery = { OR: {}, AND: {}, NOT: {} };
    for (const [key, value] of Object.entries(query)) {
      if (key == "resultPageNumber") continue;
      splitKey = key.split(booleanCode);
      boolVal = splitKey[0];
      fieldVal = splitKey[1];
      if (!(fieldVal in sortedQuery[boolVal])) {
        sortedQuery[boolVal][fieldVal] = [];
      }
      if (value instanceof Array) {
        sortedQuery[boolVal][fieldVal].push(...value);
      } else {
        sortedQuery[boolVal][fieldVal].push(value);
      }
      console.log(sortedQuery[boolVal][fieldVal]);
    }
    return sortedQuery;
  };

  const stringifyQuery = (query) => {
    //subject, language code in
    //author, title, check regex
    arrayColumns = ['subject', 'languageCode']
    regexColumns = ['author', 'authorc', 'authorp', 'title', 'titlec', 'titlep']

    orClauses = query.OR;
    andClauses = query.AND;
    notClauses = query.NOT;
    console.log(andClauses);
    stringQuery = "";
    for (const [key, value] of Object.entries(orClauses)) {
      for (v in value) {
        currString = `${key}.eq.${value[v]},`;
        stringQuery += currString;
      }
    }
    if (
      Object.keys(notClauses).length === 0 &&
      Object.keys(notClauses).length === 0
    ) {
      stringQuery = stringQuery.slice(0, -1);
      return stringQuery;
    }
    stringQuery += "and(";

    for (const [key, value] of Object.entries(andClauses)) {
      console.log("GOING AND");
      for (v in value) {
        currString = `${key}.eq.${value[v]},`;
        stringQuery += currString;
      }
    }
    for (const [key, value] of Object.entries(notClauses)) {
      for (v in value) {
        currString = `${key}.neq.${value[v]},`;
        stringQuery += currString;
      }
    }
    stringQuery = stringQuery.slice(0, -1);
    stringQuery += ")";
    return stringQuery;
  };

  sortedQuery = sortRequestQuery(req.query);
  stringifiedQuery = stringifyQuery(sortedQuery);
  const { data, error, status } = await supabaseClient
    .from("entries")
    .select()
    .or(stringifiedQuery);
    if (error) {
      return res.status(status).json({ error: error.message });
    }
    if (data.length <= 0) {
      return res.status(404).json({ error: "No such entry" });
    }
    res.status(status).json(data);
};
const updateEntry = async (req, res) => {
  const { id } = req.params;
  const changes = { ...req.body };
  console.log(changes);
  const stat = await supabaseClient
    .from("entries")
    .update(changes)
    .eq("id", id);

  if (stat.error) {
    return res.status(stat.status).json({ error: stat });
  }

  res.status(stat.status).json(stat);
};
const upsertEntry = async (req, res) => {
  res.status(200).json({});
};
const deleteEntry = async (req, res) => {
  const { id } = req.params;
  const stat = await supabaseClient.from("entries").delete().eq("id", id);

  console.log(stat);
  if (stat.error) {
    return res.status(stat.status).json({ error: stat.error });
  }
  res.status(stat.status).json({ status: stat.statusText });
};
const createEntry = async (req, res) => {
  const content = { ...req.body };
  const { status, error, statusText } = await supabaseClient
    .from("entries")
    .insert(content);
  console.log(content);
  if (error) {
    return res.status(status).json(error);
  }
  res.status(status).json({ status: statusText });
};

module.exports = {
  getEntry,
  getEntries,
  updateEntry,
  deleteEntry,
  createEntry,
  upsertEntry,
};

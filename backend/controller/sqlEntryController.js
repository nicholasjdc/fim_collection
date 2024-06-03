const limitCount = 25;
const supabase = require("@supabase/supabase-js");
const { log } = require("../etc/usefulThings");
const supabaseUrl = "https://raifuhqmtrdvncpkonjm.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
const logCode =0
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
  res.status(status).json(data[0]);
};
const getEntries = async (req, res) => {
  
  log(logCode, req.query);
  const limitCount = 25;
  let pageNum = 0;
  if (req.query.resultPageNumber) {
    pageNum = req.query.resultPageNumber - 1;
  }

  arrayColumns = ["subjects", "languageCode"];
  regexColumns = [
    "author",
    "authorc",
    "keyword",
    "authorp",
    "title",
    "authorAgg",
    "titleAgg",
    "titlec",
    "titlep",
    "note",
    "pageCount",
    "seriesTitle",
    "publication",
    "ISBN",
  ];
  exclusiveColumns = ["gen_type"];
  supaQuery = supabaseClient
    .from("entries")
    .select("*", { count: "exact", head: false });

  const booleanCode = "$!";
  orQuery = "";
  for (const [key, value] of Object.entries(req.query)) {
    if (key == "resultPageNumber") continue;

    splitKey = key.split(booleanCode);
    boolVal = splitKey[0]; //or, and, not
    fieldVal = splitKey[1]; //subjects, authoarAgg, titleAgg, etc
    searchValues = value.split(","); //Arbitrary search values

    compValue = "eq";
    if (arrayColumns.includes(fieldVal)) {
      compValue = "cs";
    } else if (regexColumns.includes(fieldVal)) {
      compValue = "ilike";
    }

    if (fieldVal == "gen_type") {
      if (boolVal == "OR") {
        orSearchTemp = "";
        for (i in searchValues) {
          orSearchTemp += `type.${compValue}.${searchValues[i]},`;
        }
        orSearchTemp = orSearchTemp.slice(0, -1); //Remove last comma
        supaQuery.or(orSearchTemp);
      }
    }
    //Keyword = ji de
    // NOT: make sure neither ji or de are anywhere
    //AND: ji or de should be in there
    //OR ji or de sould be in there
    if (fieldVal === "keyword") {
      tempValues = [];
      for (i in searchValues) {
        if (searchValues[i][0] == `"` && searchValues[i].slice(-1) == `"`) {
          searchValues[i] = searchValues[i].slice(1, -1);
        } else {
          //OR doesn't function correctly, assumes all of them wrong.

          tempValues.push(...searchValues[i].split(" "));
          searchValues.splice(i, 1);
        }
      }
      searchValues.push(...tempValues);
    }
    if (!exclusiveColumns.includes(fieldVal)) {
      for (let i = 0; i < searchValues.length; i++) {
        if (compValue == "ilike") {
          searchValues[i] = "%" + searchValues[i] + "%";
        } else if (compValue == "cs") {
          searchValues[i] = "{" + searchValues[i] + "}";
        }
      }
      log(logCode, searchValues);

      if (boolVal === "AND") {
        for (s in searchValues) {
          currVal = searchValues[s];
          if (compValue === "eq") {
            supaQuery = supaQuery.eq(fieldVal, currval);
          } else if (compValue === "cs") {
            supaQuery = supaQuery.contains(fieldVal, currVal);
          } else if (compValue === "ilike") {
            supaQuery = supaQuery.ilike(fieldVal, currVal);
          }
        }
      } else if (boolVal === "OR") {
        for (s in searchValues) {
          orSearch = `${fieldVal}.${compValue}.${searchValues[s]},`;
          orQuery += orSearch;
        }
      } else if (boolVal === "NOT") {
        for (s in searchValues) {
          notSearch = `${fieldVal}, ${compValue}, ${searchValues[s]}`;
          supaQuery = supaQuery.not(notSearch);
        }
      } else if (boolVal === "GT") {
        for (i in searchValues) {
          supaQuery.gt(fieldVal, searchValues[i]);
        }
      } else if (boolVal === "LT") {
        for (i in searchValues) {
          supaQuery.lt(fieldVal, searchValues[i]);
        }
      }
    }
  }

  if (orQuery) {
    orQuery = orQuery.slice(0, -1); //Remove last comma
    supaQuery.or(orQuery);
  }
  const { data, error, status, count } = await supaQuery.range(
    pageNum * limitCount,
    pageNum * limitCount + limitCount
  );
  if (error) {
    log(logCode, error);
    return res.status(status).json({ error: error.message });
  }
  res.status(status).json({ entries: data, count: count });
};

const updateEntry = async (req, res) => {
  const { id } = req.params;
  const changes = { ...req.body };
  const stat = await supabaseClient
    .from("entries")
    .update(changes)
    .eq("id", id);
  log(logCode, changes);
  log(logCode, stat);
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
  if (error) {
    return res.status(status).json(error);
  }
  res.status(status).json({ status: statusText });
};

getGreatestEntryCode = async (req, res) => {
  const { data, error, status } = await supabaseClient.rpc('entry_max_value')


  if (error) {
    return res.status(status).json(error);
  }
  res.status(status).json({ data });
};
module.exports = {
  getEntry,
  getEntries,
  updateEntry,
  deleteEntry,
  createEntry,
  upsertEntry,
  getGreatestEntryCode,
};

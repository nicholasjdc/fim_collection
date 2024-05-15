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
  res.status(status).json(data[0]);
};
const getEntries = async (req, res) => {
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
  supaQuery = supabaseClient
    .from("entries")
    .select("*", { count: "exact", head: false });

  const booleanCode = "$!";
  orQuery =""
  let reqQuery = req.query
  if (reqQuery.keyword){
    splitKey = key.split(booleanCode);
    boolVal = splitKey[0]; //or, and, not
    fieldVal = splitKey[1]; //subjects, authoarAgg, titleAgg, etc
    searchValues = value.split(","); //Arbitrary search values
  }
  for (const [key, value] of Object.entries(req.query)) {
    if (key == "resultPageNumber") continue;

    splitKey = key.split(booleanCode);
    boolVal = splitKey[0]; //or, and, not
    fieldVal = splitKey[1]; //subjects, authoarAgg, titleAgg, etc
    searchValues = value.split(","); //Arbitrary search values

    

      
    }
    compValue = "eq";
    if (arrayColumns.includes(fieldVal)) {
      compValue = "cs";
        for (let i = 0; i < searchValues.length; i++) {
          searchValues[i] = "{" + searchValues[i] + "}";
        
      }
    } else if (regexColumns.includes(fieldVal)) {
      compValue = "ilike";
      for (let i = 0; i < searchValues.length; i++) {
        searchValues[i] = "%" + searchValues[i] + "%";
      }
    }
    
    if (key ==="keyword" && !(value[0] == `"` && value.slice(-1) == `"`)){
      let tempValues = []
      for(i in searchValues){
        tempValue.push(...searchValues[i].split(' '))
      }
      searchValues = tempValues
      if(boolVal ==="AND"){
        orSearch = `${fieldVal}.${compValue}.${searchValues[s]},`;
        supaQuery.or()
      }
       
    if (boolVal === "AND") {
      for (s in searchValues) {
        currVal = searchValues[s]
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
        orQuery +=orSearch
      }
    } else if (boolVal === "NOT") {
      for (s in searchValues) {
        notSearch = `${fieldVal}, ${compValue}, ${searchValues[s]}`;
        supaQuery = supaQuery.not(notSearch);
      }
    } else {
      continue;
    }
  }
  if(orQuery){
    orQuery =orQuery.slice(0,-1)
    supaQuery.or(orQuery)
  }
  const { data, error, status, count } = await supaQuery.range(
    pageNum * limitCount,
    pageNum * limitCount + limitCount
  );
  if (error) {
    console.log(error)
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
    console.log(changes)
  console.log(stat)
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

module.exports = {
  getEntry,
  getEntries,
  updateEntry,
  deleteEntry,
  createEntry,
  upsertEntry,
};

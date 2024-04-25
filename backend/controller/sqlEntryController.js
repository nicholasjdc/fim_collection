const limitCount = 25;
const supabase = require('@supabase/supabase-js')
const supabaseUrl = 'https://raifuhqmtrdvncpkonjm.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)
const getEntry = async (req, res) => {
    const { id } = req.params;

    const { data, error, status } = await supabaseClient
        .from('entries').select()
        .eq('id', id)
    if(error){
        return res.status(status).json({error: error.message})
    }
    if (data.length <=0) {
        return res.status(404).json({ error: "No such entry" });
    }
    res.status(status).json(data);
}
const getEntries = async (req, res) => {
    const sortRequestQuery = (query) => {
        const booleanCode = "$!";
        console.log(query)
        let sortedQuery = {'OR': {}, 'AND': {}, 'NOT': {}};
        for (const [key, value] of Object.entries(query)) {
          if (key =="resultPageNumber") continue;
          
    
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
      if (req.query){
        sortedQuery = sortRequestQuery(req.query)
        console.log(sortedQuery)
      }
      res.status(200).json({})

}
const updateEntry = async (req, res) => {
    const { id } = req.params;
    const changes = {...req.body}
    console.log(changes)
    const stat = await supabaseClient
    .from('entries')
    .update(changes)
    .eq('id', id)
    
    if(stat.error){
        return res.status(stat.status).json({error: stat})
    }
    
    res.status(stat.status).json(stat);

}
const upsertEntry = async (req, res) =>{
    res.status(200).json({})
}
const deleteEntry = async (req, res) => {
    const {id} = req.params
    const stat = await supabaseClient
    .from('entries')
    .delete()
    .eq('id', id)

    console.log(stat)
    if(stat.error){
        return res.status(stat.status).json({error: stat.error})
    }
    res.status(stat.status).json({status:stat.statusText});

}
const createEntry = async (req, res) => {
    const content = {...req.body}
    const  {status, error, statusText}  = await supabaseClient
    .from('entries')
    .insert(content)
    console.log(content)
    if(error){
        return res.status(status).json(error)
    }
    res.status(status).json({status: statusText});

}

module.exports = {
    getEntry,
    getEntries,
    updateEntry,
    deleteEntry,
    createEntry,
    upsertEntry
}
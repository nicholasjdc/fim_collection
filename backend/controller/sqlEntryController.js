const limitCount = 25;
require("dotenv").config();
const supabase = require('@supabase/supabase-js')
const supabaseUrl = 'https://raifuhqmtrdvncpkonjm.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)

const createEntry =  async(req, res)=>{
  console.log(req.body)
  try {
    const { insertError } = await supabaseClient
    .from('table_name')
    .insert(req.body)
  
    res.status(200).json({});
  } catch (error) {
    /* mongoose thrown error */
    res.status(400).json({ error: error.message });
  }
}
const getEntry = async (req, res) =>{
    const { id } = req.params;
  
    const { data, getError } = await supabaseClient
    .from('table_name')
    .select().eq('id', id)

    if (!data) {
      return res.status(404).json({ error: "No such entry" });
    }
    res.status(200).json(data);
}

const getEntries = async(req, res) =>{
  const query = req.query

  const { data, getError } = await supabaseClient
    .from('table_name')
    .select().or(query)

    if (!data) {
      return res.status(404).json({ error: "No such entry" });
    }
    res.status(200).json(data);

}

const updateEntry = async(req, res) =>{
  const {id} = req.params

  const { updateError } = await supabaseClient
  .from('table_name')
  .update({ name: 'NEW NAME NEW LOVE' })
  .eq('id', id)
  res.status(200).json({})
}

const deleteEntry = async(req, res) =>{
  const {id} = req.params
  const { deleteError } = await supabaseClient
  .from('table_name')
  .delete()
  .eq('id', id)
  res.status(200).json({})

}
module.exports = {
  getEntry,
  getEntries,
  deleteEntry,
  updateEntry,
  createEntry,
};
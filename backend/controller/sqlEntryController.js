const limitCount = 25;
require("dotenv").config();
const supabase = require('@supabase/supabase-js')
const supabaseUrl = 'https://raifuhqmtrdvncpkonjm.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)

const getEntry = async () =>{
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such entry" });
    }
  
    const entry = await Entry.findById(id);
    if (!entry) {
      return res.status(404).json({ error: "No such entry" });
    }
    res.status(200).json(entry);
}
const getEntries = async() =>{

}
const updateEntry = async() =>{

}

const deleteEntry = async() =>{

}
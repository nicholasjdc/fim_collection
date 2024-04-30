require("dotenv").config();
const { default: mongoose } = require("mongoose");
const Entry = require("./models/bookEntryModel")
const supabase = require('@supabase/supabase-js')
const supabaseUrl = 'https://raifuhqmtrdvncpkonjm.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)
const testSupabase = async () =>{
    const { insertError } = await supabaseClient
    .from('table_name')
    .insert({  name: 'woajnmasdfark', data: {"test": "testValue"} })
  
  console.log(insertError)
  
  const { updateError } = await supabaseClient
    .from('table_name')
    .update({ name: 'NEW NAME NEW LOVE' })
    .eq('id', 1)
  const { upsertData, error } = await supabaseClient
    .from('table_name')
    .upsert({ id: 22, name: 'Albania' })
    .select()
  
  const { deleteError } = await supabaseClient
    .from('table_name')
    .delete()
    .eq('id', 1)
    const { data, getError } = await supabaseClient
    .from('table_name')
    .select()
  console.log(data)
  
}
const queryTest = async()=>{
    //Functioning:
    //sort all "and" and "not" into extended 'and' (.neq), .eq
    //rest stay loose in or
    //subjects, language code use OR
    //keyword ilike for title, titlec, titlep, author, authorc, authorp, in subject
    // strings: for all or, concatenate with commas
    // for all the and, concatenate them together and stick them inside an 'and()'
    queryLove = 'title.eq.An annotated bibliography for Taiwan Film Studies, title.eq.lovelythings'
    const { data, getError } = await supabaseClient
    .from('entries')
    .select('title').or(queryLove)
    console.log(data)
}
const mongoToSupabaseUpload = async() =>{
    approvedFields = ['entryNumber', 'author', 'authorc', 'authorp', 'title', 'titlec', 'titlep', 'publication', 'pageCount', 'ISBN', 'seriesTitle', 'note', 'resource']
    mongoose
  .connect(process.env.MONGO_URI)
    const entries = await Entry.find()
    const newEntries = JSON.parse(JSON.stringify(entries))
 
   
    for(key in newEntries){
        console.log("inserting")
        const currEntry = newEntries[key]
        delete currEntry._id
        delete currEntry.titleAgg
        delete currEntry.authorAgg
        delete currEntry.__v
        delete currEntry.updatedAt
        delete currEntry.createdAt
        const { insertError } = await supabaseClient
    .from('entries')
    .insert(currEntry)
    }
    console.log("finished")
}

queryTest()
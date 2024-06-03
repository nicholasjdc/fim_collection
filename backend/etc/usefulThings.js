const supabase = require('@supabase/supabase-js')
const supabaseUrl = 'https://raifuhqmtrdvncpkonjm.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)
const log =(code, content) =>{
    if(code >0){
        console.log(content)
    }
}
module.exports  ={
    log,
    supabaseClient
}
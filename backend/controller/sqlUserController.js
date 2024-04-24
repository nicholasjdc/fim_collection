require("dotenv").config();
const supabase = require('@supabase/supabase-js')
const supabaseUrl = 'https://raifuhqmtrdvncpkonjm.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)
const getUser = async () =>{

}
const getUsers = async() =>{

}
const updateUser = async() =>{

}

const deleteUser = async() =>{

}
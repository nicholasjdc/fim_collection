require("dotenv").config();
const jwt = require("jsonwebtoken");
const supabase = require("@supabase/supabase-js");
const supabaseUrl = "https://raifuhqmtrdvncpkonjm.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
const validator = require("validator");
const bcrypt = require('bcrypt')
const secretRefreshKey = process.env.REFRESHSECRET
const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};
const generateRefreshToken= (id) =>{
  return jwt.sign({ id }, process.env.REFRESHSECRET, { expiresIn: "5d" });
}
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  user = undefined;
  try {
    if (!email || !password) {
      throw Error("All Fields Must be Filled");
    }
    
    user = await getUser(email);
    
    if (!user) {
      throw Error("Incorrect email");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw Error("Incorrect Password");
    }

    const userType = user.userType
    //token gen
    const accessToken = generateToken(user.id);
    const refreshToken = jwt.sign({ user }, secretRefreshKey, { expiresIn: '1d' });

    res.status(200).json({ email, accessToken, refreshToken, userType });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw Error("All Fields Must be Filled");
    }
    if (!validator.isEmail(email)) {
      throw Error("Email is not valid");
    }
    /*
    if(!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }
    */
    validator.isEmail(email);
    const exists = await getUser(email);
    if (exists) {
      throw Error("Email already in use");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const userType = "Reader"
    const user = await createUser({ email, userType, password: hash });
    console.log('waoh')
    console.log(user)
    //token gen
    const accessToken = generateToken(user.id);
    const refreshToken = generateRefreshToken(user.id)
    
    res.status(200).json({ email, accessToken, refreshToken, userType});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getUserByID = async(id) =>{
  const { data, error, status } = await supabaseClient
  .from("users")
  .select()
  .eq("id", id);
if (error) {
  return null;
}
if (data.length <= 0) {
  return null;
}
return data[0];
}
const getUser = async (email) => {
  const { data, error, status } = await supabaseClient
    .from("users")
    .select()
    .eq("email", email);
  if (error) {
    return null;
  }
  if (data.length <= 0) {
    return null;
  }
  return data[0];
};
const refreshAccessToken= async(refreshToken)=>{
  try {
    const decoded = jwt.verify(refreshToken, secretRefreshKey);
    const accessToken = jwt.sign({ user: decoded.user }, secretRefreshKey, { expiresIn: '1h' });

    return accessToken
  } catch (error) {
    return res.status(400).send('Invalid refresh token.');
  }
}
const updateUser = async (req, res) => {
  const { id } = req.params;
  const changes = { ...req.body };
  console.log(changes);
  const stat = await supabaseClient.from("users").update(changes).eq("id", id);

  if (stat.error) {
    return res.status(stat.status).json({ error: stat });
  }

  res.status(stat.status).json(stat);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const stat = await supabaseClient.from("users").delete().eq("id", id);

  console.log(stat);
  if (stat.error) {
    return res.status(stat.status).json({ error: stat.error });
  }
  res.status(stat.status).json({ status: stat.statusText });
};
const createUser = async (content) => {
  const { status, error, statusText } = await supabaseClient
    .from("users")
    .insert(content);
  if (error) {
    throw error;
  }else{
    result = await supabaseClient
    .from("users").select()
    .eq("email", content.email);
    return result.data[0]
  }
};
module.exports = {
  signupUser,
  loginUser,
  getUserByID,
  deleteUser,
};

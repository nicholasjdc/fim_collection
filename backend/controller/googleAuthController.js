require('dotenv').config();
const {
  OAuth2Client,
} = require('google-auth-library');


const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'postmessage',
);



const getGoogleToken=async (req, res) => {
  console.log("GOTGOT")
  console.log(req.body)
  try{
  const { tokens } = await oAuth2Client.getToken(req.body); // exchange code for tokens
  } catch(error){
    console.log(error)
  }
  console.log(tokens);
  
  res.json(tokens);
};

const getRefreshToken= async (req, res) => {
  const user = new UserRefreshClient(
    clientId,
    clientSecret,
    req.body.refreshToken,
  );
  const { credentials } = await user.refreshAccessToken(); // optain new tokens
  res.json(credentials);
};
module.exports = {
    getGoogleToken,
    getRefreshToken
}
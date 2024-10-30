const jwt = require('jsonwebtoken')
const {
    getUserByID
  } = require("../controller/sqlUserController");
const requireAuth = async (req, res, next)=>{
    const {authorization} = req.headers

    //Authorization Header not included
    if(!authorization){
        return res.status(401).json({error: 'Authorization Token Required'})
    }

    const token = authorization.split(' ')[1]

    try{
        const {_id} = jwt.verify(token, process.env.SECRET)
        req.user = await getUserByID(_id)
        next()
    }
    catch (error){
        console.log(error)
        res.status(401).json({error: 'Request is not Authorized'})
    }
}
module.exports = requireAuth
/*
const authenticate = (req, res, next) => {
  const accessToken = req.headers['authorization'];
  const refreshToken = req.cookies['refreshToken'];

  if (!accessToken && !refreshToken) {
    return res.status(401).send('Access Denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(accessToken, secretKey);
    req.user = decoded.user;
    next();
  } catch (error) {
    if (!refreshToken) {
      return res.status(401).send('Access Denied. No refresh token provided.');
    }

    try {
      const decoded = jwt.verify(refreshToken, secretKey);
      const accessToken = jwt.sign({ user: decoded.user }, secretKey, { expiresIn: '1h' });

      res
        .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
        .header('Authorization', accessToken)
        .send(decoded.user);
    } catch (error) {
      return res.status(400).send('Invalid Token.');
    }
  }
};
*/
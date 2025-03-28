const jwt = require('jsonwebtoken')
const {
  getUserByID
} = require("../controller/sqlUserController");
const requireAuth = async (req, res, next) => {
  const { accesstoken } = req.headers
  const { refreshtoken } = req.headers
  //Authorization Header not included
  if (!accesstoken && !refreshtoken) {
    return res.status(401).json({ error: 'Authorization Token Required' })
  }

  const tokenA = accesstoken.split(' ')[1]
  const tokenR = refreshtoken.split(' ')[1]
  try {
    const { _id } = jwt.verify(tokenA, process.env.SECRET)
    req.user = await getUserByID(_id)
    next()
  }
  catch (error) {
    if (!refreshtoken) {
      return res.status(401).send('Access Denied. No refresh token provided.');
    }

    try {
      const decoded = jwt.verify(tokenR, process.env.REFRESHSECRET);
      const accessToken = jwt.sign({ user: decoded.user }, process.env.SECRET, { expiresIn: '1h' });
      return res.status(200).json({ email, accessToken, refreshToken });
      
    } catch (error) {
      return res.status(400).send('Invalid Token.');
    }

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
const jwt = require('jsonwebtoken')
const {
  getUserByID
} = require("../controller/sqlUserController");
const requireAuthSimple = async (req, res, next) => {
  const {accesstoken}  = req.headers
  const { refreshtoken } = req.headers
  console.log(req.headers)
  //Authorization Header not included
  if (!accesstoken ) {
    return res.status(401).json({ error: 'Authorization Token Required' })
  }

  const token = accesstoken.split(' ')[1]

  try {
    const { _id } = jwt.verify(token, process.env.SECRET)
    req.user = await getUserByID(_id)
    next()
  }
  catch (error) {
    if (!refreshtoken) {
      return res.status(401).send('Access Denied. No refresh token provided.');
    }

    try {
      const decoded = jwt.verify(refreshtoken, secretKey);
      const accessToken = jwt.sign({ user: decoded.user }, secretKey, { expiresIn: '1h' });

      res
        .cookie('refreshToken', refreshtoken, { httpOnly: true, sameSite: 'strict' })
        .header('Authorization', accessToken)
        .send(decoded.user);
    } catch (error) {
      return res.status(400).send('Invalid Token.');
    }

  }
}
module.exports = requireAuthSimple
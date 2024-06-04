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
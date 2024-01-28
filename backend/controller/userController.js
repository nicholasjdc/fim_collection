const userModel = require("../models/userModel")
const jwt = require('jsonwebtoken')
//login user

const generateToken = (_id)=>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}
const loginUser = async (req, res) =>{
    const {email, password} = req.body
    try{
        const user = await userModel.login(email, password)

        //token gen
        const token = generateToken(user._id)

        res.status(200).json({email, token})
    } catch(error){
        res.status(400).json({error:error.message})
    }
}
const signupUser = async(req, res)=>{
    const {email, password} = req.body
    try{
        const user = await userModel.signup(email, password)

        //token gen
        const token = generateToken(user._id)

        res.status(200).json({email, token})
    } catch(error){
        res.status(400).json({error:error.message})
    }
}

module.exports = {loginUser, signupUser}
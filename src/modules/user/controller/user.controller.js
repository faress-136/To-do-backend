import userModel from "../../../../database/Models/user.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Joi from "joi"

const signUpSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
      email: Joi.string().email({minDomainSegments: 2, tlds: {allow: false}}),
      password: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9]{6,30}$/)),
      age: Joi.number().min(10).max(100).required()
})

const sigInSchema = Joi.object({
      email: Joi.string().email({minDomainSegments: 2, tlds: {allow: false}}),
      password: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9]{6,30}$/)),
})

export const signUp = async (req, res)=>{
   let {name, email, password, age} = req.body
   const checkUser = await userModel.findOne({email})
   if(checkUser){
    res.json({message: "Failed, Email already exist."})
   }
   else{
        let {error} =signUpSchema.validate(req.body)
        if(error){
            res.json({message: "Validation Error", error})
        }
        else{
        let hashedPassword = bcrypt.hashSync(password, Number(process.env.NUMBER_ROUNDS))
        let added = await userModel.insertMany({name, email, password:hashedPassword, age})
        res.json({message: "Success", added})
        }
   }
   
}

export const signIn = async (req, res)=>{
    let {email, password} = req.body
    let {error} = sigInSchema.validate(req.body)
    if (error){
        res.json({message: "Validation Error", error})

    }
    else{
        let foundedUser = await userModel.findOne({email})
        if(foundedUser){
            let matched = bcrypt.compareSync(password, foundedUser.password)
            if(matched){
                let token = jwt.sign({name: foundedUser.name, email, userId: foundedUser._id, age: foundedUser.age}, process.env.SECRET_KEY)
                res.json({message: "Success", result: "Welcome", token})
            }
            else{
                res.json({message: "Incorrect Password", matched})
            }
        }
        else{
            res.json({message: "Email not found"})
        }
    }
}

export const updateUser = async (req, res)=>{

        let {name, email, age} = req.body
                let founded = await userModel.findOne({email})
                if(founded){
                let updated = await userModel.findByIdAndUpdate(req.userId, {name, age}, {new: true})
                res.json({message:"Success. Email Already Exist.", updated})
                }
                else{
                let updated = await userModel.findByIdAndUpdate(req.userId, {name, email, age}, {new: true})
                res.json({message:"Success", updated})
                };
}

export const getById = async (req, res)=>{
    try{
        let user = await userModel.findOne({_id:req.userId})
        user ?  res.json({message: "Success", user}) : res.json({message: "Failed", user})  
    }
    catch(err){
        res.json({message: "Failed....."})
    }
}

export const deleteUser = async (req, res)=>{
    try{
        let deleted = await userModel.findOneAndDelete({_id: req.userId})
        deleted ?  res.json({message: "Deleted Successfully", deleted}) : res.json({message: "Failed", deleted})
    }
    catch(err){
        res.json({message: "Failed....."})
    }  
}

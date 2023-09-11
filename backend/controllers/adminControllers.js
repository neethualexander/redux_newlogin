import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/usermodel.js'

const adminLogin=asyncHandler(async(req,res)=>{

const {email,password}=req.body;

const admin=await User.findOne({email,isAdmin:true})

const isMatch=await admin.matchPasswords(password)
if(admin && isMatch ){
    generateToken(res,admin._id);
   
    res.status(200).json({message:'admin logged in'})
}else{
    res.status(400).json({message:'Invalid Credentials'})
}
})

const usersList=asyncHandler(async(req,res)=>{
    const users=await User.find({isAdmin:false})
    res.json(users)
})

const deleteUser=asyncHandler(async(req,res)=>{
    const {_id}=req.body
    await User.deleteOne({_id})
    const remainingUsers=await User.find({isAdmin:false})
    res.json({status:'ok',users:remainingUsers})
})

const createUser=asyncHandler(async(req,res)=>{
    const {name,email,password,confirmPassword}=req.body
if(password===confirmPassword){
    const newUser=await User.create({
        name,
        email,
        password,
        isAdmin:false,
        image:'profile.png'
    })
    newUser.save()
    res.status(200).json({message:'user created'})
    }else {
        res.status(400).json({message:'failed to confirm password'})
    }
})

const userDetails=asyncHandler(async(req,res)=>{
    const id=req.body._id
    const user=await User.findOne({_id:id})
    res.status(200).json(user)
})

const editUser=asyncHandler(async(req,res)=>{
    const {_id,name,email,image}=req.body
    await User.findByIdAndUpdate(_id,{$set:{name,email,image}})
    res.status(200).json('User edit succussfull')
})

export {adminLogin,usersList,deleteUser,createUser,userDetails,editUser}








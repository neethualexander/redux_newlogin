import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/usermodel.js'

const authUser= asyncHandler( async (req,res)=>{

    const {email,password}=req.body
    const user =await User.findOne({email})

    if(user && (await user.matchPasswords(password))){
        generateToken(res,user._id);
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            image:user.image
        })
      }else{
        res.status(401);
        throw new Error('Invalid email  or password')
      }

})

const registerUser= asyncHandler( async (req,res)=>{
  const {name,email,password}=req.body
  const userExists=await User.findOne({email:email})
  
  if(userExists){
    res.status(400);
    throw new Error('User already Exists')
  }
  

  const user= await User.create({
    name,
    email,
    password,
    image:'profile.png',
    isAdmin:false
  })

  if(user){
    generateToken(res,user._id);
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        image:user.image
    })
  }else{
    res.status(400);
    throw new Error('Invalid user data')
  }

})

const logoutUser= asyncHandler( async (req,res)=>{

    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({message:'Logged out '})
})

const getUserProfile= asyncHandler( async (req,res)=>{
   const user={
    _id:req.user._id,
    name:req.user.name,
    email:req.user.email,
    image:req.user.image
   }
    res.status(200).json(user)
})

const updateUserProfile=asyncHandler( async (req,res)=>{
   
   const user=await User.findById(req.user._id)
   if(user){
     user.name=req.body.name || user.name;
     user.email=req.body.email || user.email;
     console.log();
     if(req.body.password){
       user.password=req.body.password;
     }
     if(req.file){
      user.image=req.file.filename;
     }
    const updatedUser= await user.save()
    res.status(200).json({
        _id:updatedUser._id,
        name:updatedUser.name,
        email:updatedUser.email,
        image:updatedUser.image
    })
   }else{
    res.status(404)
    throw new Error('user not found')
   }
    res.status(200).json({message:'Update  User Profile'})
})

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}

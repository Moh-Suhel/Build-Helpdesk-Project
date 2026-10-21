import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"
import { AsyncHandler } from "../utils/AsyncHandler.js"
import bcrypt  from "bcrypt" ;

const generateAccessTokenAndRefreshToken = async(userId) => {
  try { 
    const user = await User.findById(userId)
   const AccessToken =  user.generateAccessToken()
   const RefreshToken = user.generateRefreshToken()
//    console.log("AccessToken" , AccessToken )  TALHA BHAI
//    console.log("RefreshToken" , RefreshToken )

   user.refreshToken = RefreshToken
    await user.save()

    return { AccessToken, RefreshToken }
  }  catch(error){
    console.log("TOKEN GENERATION ERROR:", error)
     throw new ApiError(500, "Something went wrong while generating referesh and access token")
  } 
  
}


const registerUser = AsyncHandler(async(req , res) => {
 const {username, email, password, fullName} = req.body
// console.log("body" ,req.body) TALHA BHAI 
 if (!username || !email || !password) {
    throw new ApiError(400, "All field are required") 
 }

 const ExistedUser = await User.findOne({
    $or: [{username} , {email}]
 })
 

 if(ExistedUser){
  throw new ApiError(500,  "User already exists")
 }
 
 const hashedPassword = await bcrypt.hash(password,  10)

 const user = await User.create({
    username,
    email,
    password,
    fullName
 })
//  console.log("Usercreater", user)

 const createdUser = await User.findById(user._id).select(
   "-password   -refreshToken"
)
if(!createdUser){
    throw new ApiError( "something went wrong direction")
}
return res.status(201).json(
    new  ApiResponse(200,  createdUser, "User registered successfully")
    
)
})

const loginUser = AsyncHandler(async(req, res) => {  

      const {username , email , password } = req.body
    //   console.log("REQ BODY:", req.body)

      if(!email || !username){
        throw new ApiError(400, "email and username is required")
      }

      const user =  await User.findOne(
        {
            $or:[{email}, {username}]
        }
      )

    if(!user){
        throw new ApiError(400," user does not exist")
    }
    
    const isPasswordValid = await user.isPasswordValid(password)

      if(! isPasswordValid){
        throw new ApiError(400," password  is  not Valid")
    }
   const {AccessToken, RefreshToken} = await generateAccessTokenAndRefreshToken(user._id)

   const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none"
        
        
    }

    return res
    .status(200)
    .cookie("accessToken", AccessToken, options)
    .cookie("refreshToken", RefreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, AccessToken, RefreshToken
            },
            "User logged In Successfully"
        )
    )     

})


const logoutUser = AsyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        }
    );

    const options = {
        httpOnly: true,
        secure: false
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(
                200,
                {},
                "User logged out successfully"
            )
        );
});

// for js navigation ADMIN
const getCurrentUser = AsyncHandler(async (req, res) => {

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                _id: req.user._id,
                username: req.user.username,
                email: req.user.email,
                role: req.user.role
            },
            "Current user fetched successfully"
        )
    );
});




export {registerUser, loginUser, logoutUser, getCurrentUser} 
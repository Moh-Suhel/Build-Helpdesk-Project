import jwt from "jsonwebtoken"
import {User} from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { AsyncHandler } from "../utils/AsyncHandler.js";


const VerifyUser =  AsyncHandler( async (req, res, next) => {
    const AccessToken = req.cookies.accessToken
   if(!AccessToken){
    throw new ApiError(401, "NOT FIND ACCESSTOKEN ")
   }

   const verifyToken = jwt.verify(
    AccessToken, 
    process.env.ACCESS_TOKEN_SECRET
)
   console.log(verifyToken)

   const findId = verifyToken._id
   if(!findId){
    throw new ApiError(401, "could not get user id")
   }
   const user = await User.findById(findId)

   if(!user){
    throw new ApiError(500, "could not get user id")
   }
   req.user = user
   next()
})

// for Admin
const VerifyAdmin = AsyncHandler(async (req, res, next) => {

    if (req.user.role !== "ADMIN") {
        throw new ApiError(
            403,
            "You are not authorized as an admin"
        );
    }

    next();
});

export {VerifyUser ,VerifyAdmin}
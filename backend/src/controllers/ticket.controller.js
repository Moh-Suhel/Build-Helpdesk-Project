import { User } from "../models/user.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { Ticket } from "../models/ticket.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"

const ticketUser = AsyncHandler(async (req, res) => {
  const { title, description, category, priority } = req.body

 if (!title || !description || !category || !priority) {
    throw new ApiError(400 , "All perameter  are required")
  }

  const identifyUser = await User.findById(req.user._id)
  const creator = identifyUser._id

  const ticket = await Ticket.create({
    title,
    description,
    category,
    priority,
    creator
  })

  if (!ticket) {
    throw new ApiError(500 , "TICKET DOCUMENT NOT CREATE/SAVE IN MONGO DB")
  }

  const responsedata = {
    title,
    description,
    category,
    priority,
    creator
  }
  return res.status(201).json(
    new ApiResponse(200, responsedata, "ticket build successfully")
  )

  
  
}) 
export  {ticketUser}
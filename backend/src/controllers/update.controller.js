import { AsyncHandler } from "../utils/AsyncHandler.js";
import { Ticket } from "../models/ticket.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const Update = AsyncHandler(async(req , res) =>{
  const ticketId = req.params.ticketId
  const ticketidverify = await Ticket.findById( ticketId )

if(!ticketidverify){
    throw new ApiError(404, " ticketDetails not found")
}
if (!ticketidverify.creator.equals(req.user._id)) {
    throw new ApiError(403, "u are not authorized to access this ticket")
}

const { title, description, category, priority } = req.body

ticketidverify.title = title
ticketidverify.description = description
ticketidverify.category = category
ticketidverify.priority = priority

const chnagedatasave = await ticketidverify.save()

return res.status(200).json(
       new ApiResponse(200, chnagedatasave ,  "Ticket updated successfully" )
)
})

export {Update}
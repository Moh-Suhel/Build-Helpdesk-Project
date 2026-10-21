import { AsyncHandler } from "../utils/AsyncHandler.js";
import { Ticket } from "../models/ticket.model.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const  getTicketById = AsyncHandler(async(req , res)=> {
    const ticketId = req.params.ticketId

const ticketDetails = await Ticket.findById( ticketId )

if(!ticketDetails){
    throw new ApiError(404, " ticketDetails not found")
}

if (!ticketDetails.creator.equals(req.user._id)) {
    throw new ApiError(403, "u are not authorized to access this ticket")
}

return res.status(200).json(
    new ApiResponse(200, ticketDetails , "Successfull")
)

})
 
export {getTicketById}
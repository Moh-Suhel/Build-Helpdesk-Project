import { Ticket } from "../models/ticket.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { AsyncHandler } from "../utils/AsyncHandler.js"

const getMyTickets = AsyncHandler(async (req, res) => {

const ticketfind = await  Ticket.find({
       creator: req.user._id
  })
if (ticketfind.length > 0) {
    return res.status(200).json(
        new ApiResponse(200, ticketfind, "Tickets fetched successfully")
    )
} else {
    return res.status(200).json(
        new ApiResponse(200, ticketfind, "No tickets found")
    )
}
})

export  { getMyTickets }
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Ticket } from "../models/ticket.model.js";

const DeleteTicket = AsyncHandler(async (req, res) => {

    const { ticketId } = req.params;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
        throw new ApiError(404, "Ticket not found");
    }

    if (!ticket.creator.equals(req.user._id)) {
        throw new ApiError(
            403,
            "You are not allowed to delete this ticket"
        );
    }

    await Ticket.findByIdAndDelete(ticketId);

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Ticket deleted successfully"
        )
    );
});

export { DeleteTicket };
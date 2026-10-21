import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Comment } from "../models/comment.model.js";
import { Ticket } from "../models/ticket.model.js";

const CreateComment = AsyncHandler(async (req, res) => {

    const { ticketId } = req.params;
    const { message } = req.body;

    if (!message) {
        throw new ApiError(400, "Comment message is required");
    }

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
        throw new ApiError(404, "Ticket not found");
    }

    const comment = await Comment.create({
        message,
        author: req.user._id,
        ticket: ticketId
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            comment,
            "Comment created successfully"
        )
    );
});

const GetComments = AsyncHandler(async (req, res) => {

    const { ticketId } = req.params;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
        throw new ApiError(404, "Ticket not found");
    }

    const comments = await Comment.find({
        ticket: ticketId
    })
        .populate("author", "username fullName")
        .sort({ createdAt: 1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            comments,
            "Comments fetched successfully"
        )
    );
});


export { CreateComment, GetComments };

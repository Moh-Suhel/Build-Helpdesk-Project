import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Ticket } from "../models/ticket.model.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

const GetAllTickets = AsyncHandler(async (req, res) => {

    const tickets = await Ticket.find()
        .populate("creator", "username email fullName")
        .populate("assignment", "username email fullName")
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            tickets,
            "All tickets fetched successfully"
        )
    );
});

// for Any ticket see by admin

const GetAnyTicket = AsyncHandler(async (req, res) => {

    const { ticketId } = req.params;

    const ticket = await Ticket.findById(ticketId)
        .populate("creator", "username email fullName")
        .populate("assignment", "username email fullName");

    if (!ticket) {
        throw new ApiError(404, "Ticket not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            ticket,
            "Ticket fetched successfully"
        )
    );
});

const UpdateTicketStatus = AsyncHandler(async (req, res) => {

    const { ticketId } = req.params;
    const { status } = req.body;

    const allowedStatus = [
        "open",
        "in progress",
        "resolved",
        "closed"
    ];

    if (!allowedStatus.includes(status)) {
        throw new ApiError(400, "Invalid ticket status");
    }

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
        throw new ApiError(404, "Ticket not found");
    }

    ticket.status = status;

    await ticket.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            ticket,
            "Ticket status updated successfully"
        )
    );
});



const UpdateTicketPriority = AsyncHandler(async (req, res) => {
    const { ticketId } = req.params;
    const { priority } = req.body;

    const allowedPriority = [
        "low",
        "medium",
        "high"
    ];

    if (!allowedPriority.includes(priority)) {
        throw new ApiError(400, "Invalid ticket priority");
    }

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
        throw new ApiError(404, "Ticket not found");
    }

    ticket.priority = priority;

    await ticket.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            ticket,
            "Ticket priority updated successfully"
        )
    );
});


// for AssignTicket 
const AssignTicket = AsyncHandler(async (req, res) => {
    const { ticketId } = req.params;
    const { assignment } = req.body;

    if (!assignment) {
        throw new ApiError(400, "User ID is required for assignment");
    }

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
        throw new ApiError(404, "Ticket not found");
    }

    const user = await User.findById(assignment);

    if (!user) {
        throw new ApiError(404, "Assigned user not found");
    }

    ticket.assignment = assignment;

    await ticket.save();

    const updatedTicket = await Ticket.findById(ticketId)
        .populate("creator", "username email fullName")
        .populate("assignment", "username email fullName");

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedTicket,
            "Ticket assigned successfully"
        )
    );
});


const GetAllUsers = AsyncHandler(async (req, res) => {

    const users = await User.find(
        { role: "USER" },
        {
            username: 1,
            email: 1,
            fullName: 1
        }
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            users,
            "Users fetched successfully"
        )
    );
});


const SearchAndFilterTickets = AsyncHandler(async (req, res) => {

    const {
        search,
        status,
        priority,
        category
    } = req.query;

    const filter = {};

    // Search by title or description
    if (search) {
        filter.$or = [
            {
                title: {
                    $regex: search,
                    $options: "i"
                }
            },
            {
                description: {
                    $regex: search,
                    $options: "i"
                }
            }
        ];
    }

    // Filter by status
    if (status) {
        filter.status = status;
    }

    // Filter by priority
    if (priority) {
        filter.priority = priority;
    }

    // Filter by category
    if (category) {
        filter.category = category;
    }

    const tickets = await Ticket.find(filter)
        .populate("creator", "username email fullName")
        .populate("assignment", "username email fullName")
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            tickets,
            "Tickets filtered successfully"
        )
    );
});

export { GetAllTickets, GetAnyTicket, UpdateTicketStatus,UpdateTicketPriority,
    AssignTicket, GetAllUsers, SearchAndFilterTickets
 };
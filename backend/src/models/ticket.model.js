import mongoose, {Schema} from "mongoose";


const ticketSchema = new Schema(
    {
     title: {
        type: String,
        required: true,
        trim: true,
        index: true
     },
     description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true, 
        enum: ["hardware","software","network", "account", "other"]
    },
    priority: {
        type: String,
        required: true,
        trim: true,
        enum: ["high", "low", "medium"]
    },
    status: {
        type: String,
        trim: true,
        default: "open",
        enum: [ "open",  "in progress", "resolved", "closed"]

    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    assignment: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

    },
    {
        timestamps: true
    }
)
export const Ticket = mongoose.model("Ticket", ticketSchema)
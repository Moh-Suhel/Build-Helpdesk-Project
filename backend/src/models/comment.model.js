import mongoose, {Schema} from "mongoose";


const commentSchema = new Schema(
    {
    message: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
   author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
    },
    ticket: {
        type: Schema.Types.ObjectId,
        ref: "Ticket",
        required: true
    }

    },
    {
     timestamps: true
    }
)
export const Comment = mongoose.model("Comment", commentSchema)

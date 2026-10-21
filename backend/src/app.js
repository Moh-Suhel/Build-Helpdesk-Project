import express from "express"
import cors from "cors"
import cookieparser from "cookie-parser"
import { router } from "./routes/user.routes.js"

const app = express()

app.use(cors({
   origin: "https://build-helpdesk-project-1.onrender.com",
    credentials: true
}))

app.use(express.json({limit: "15kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieparser())




app.use("/api/v1/users", router)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Something went wrong",
        errors: err.errors || []
    });
});

export {app}
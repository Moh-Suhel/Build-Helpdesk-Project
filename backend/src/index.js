import dotenv from "dotenv"
import mongodbconnection from "./db/index.js"
import {app}  from "./app.js"

dotenv.config({
    path: './.env'
})
// console.log(process.env.MONGODB_URL?.slice(0, 14))
mongodbconnection()

.then( () => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})
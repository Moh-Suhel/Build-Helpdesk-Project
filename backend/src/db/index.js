import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"


const MongodbConnection = async () => {
    try{
       const mongoUrl = `${process.env.MONGODB_URL}/${DB_NAME}`
       const MongodbConnected = await mongoose.connect(mongoUrl)
            console.log("MONGODB CONNECTED SUCCESSFULLY {{Uvesh Boss}} ")
        
    }
    catch(Error){
        console.log("MONGODB NOT CONNECTED SUCCESSFULLY", Error)
        process.exit(1)
    }

}
export default MongodbConnection
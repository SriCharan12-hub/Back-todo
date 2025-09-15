import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import connect from "./connection/connect.js"
import route from "./Route/Userroute.js"

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors({
    methods: ["GET", "POST", "PUT", "DELETE"]
}))

app.use(route)


const port = process.env.PORT 
const mongo_uri= process.env.MONGO_URI
async function connection() {
    try{
        await connect(mongo_uri)
        app.listen(port,()=>{console.log("server running on 8000")})
    }
    catch{
        console.log("server connect avvaledhu")
    }


    
}
connection()



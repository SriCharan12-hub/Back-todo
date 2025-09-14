import mongoose from "mongoose";
export  default function connect (mongo_uri) {
    try{
        mongoose.connect(mongo_uri)
        console.log("mongoDB connected successfully")

    }
    catch(err){
        console.log("connect avvaledhu",err)

    }
}
     

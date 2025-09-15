import mongoose from "mongoose";
export  default async function connect (mongo_uri) {
    try{
        await mongoose.connect(mongo_uri)
        console.log("mongoDB connected successfully")

    }
    catch(err){
        console.log("connect avvaledhu",err)

    }
}
     

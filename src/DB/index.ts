import mongoose, { mongo } from "mongoose";
import { Msg ,errorMsg } from "../constant/message";

export const connectDB = async () =>{
    try {
        await mongoose.connect(`${process.env.dburl}/${process.env.dbName}`);
        console.log(`${Msg.connectDB}`);
        
    } catch (error) {
        console.log(`${errorMsg.connectDB}`);
        console.log(error);
    }
}
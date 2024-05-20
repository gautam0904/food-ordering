import { userInterace } from "../interface/model.interface";
import mongoose from "mongoose";
import { Msg } from "../constant/message";

const usertypevalues = ['owner' , 'customer' , 'admin']

const userSchema : mongoose.Schema<userInterace> = new mongoose.Schema({
    name: {
        type: String,
        required: [true , `${Msg.requiredName}`]
    },
    email: {
        type: String,
        required: [true,`${Msg.requiredEmail}`],
        unique: true
    },
    password: {
        type: String,
        required: [true ,`${Msg.requiredPassword}`]
    },
    profilePicture: {
        type : String
    },
    usertype : {
        type: String,
        enum :  Object.values(usertypevalues),
        required: [true ,`${Msg.requiredRole}`]
    }
})

const User = mongoose.model("User",userSchema);

export default User;
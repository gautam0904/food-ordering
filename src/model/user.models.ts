import { userInterace } from "../interface/model.interface";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Msg, errorMsg } from "../constant/message";

const usertypevalues = ['owner' , 'customer' , 'admin']

const userSchema : mongoose.Schema<userInterace> = new mongoose.Schema({
    name: {
        type: String,
        required: [true , `${errorMsg.requiredName}`]
    },
    email: {
        type: String,
        required: [true,`${errorMsg.requiredEmail}`],
        unique: true
    },
    password: {
        type: String,
        required: [true ,`${errorMsg.requiredPassword}`]
    },
    profilePicture: {
        type : String
    },
    usertype : {
        type: String,
        enum :  Object.values(usertypevalues),
        required: [true ,`${errorMsg.requiredRole}`]
    }
});

userSchema.pre('save',async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password , 12);
    next();
})

const User : mongoose.Model<userInterace> = mongoose.model("User",userSchema);



export default User;
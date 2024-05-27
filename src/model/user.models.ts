import { Iuser } from "../interface/model.interface";
import Restaurant from "./restaurant.models";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Msg, errorMsg } from "../constant/message";

const usertypevalues = ['owner' , 'customer' , 'admin']

const userSchema : mongoose.Schema<Iuser> = new mongoose.Schema({
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
    },
    isDeleted :{
        type :Boolean,
        default : false
    },
},{timestamps :true});

userSchema.pre('save',async function(next){
    if(!this.isModified("password" )) return next();
    this.password = await bcrypt.hash(this.password , 12);
    next();
});

userSchema.pre('save' , async function(next){
    if(this.usertype == "owner"){
        Restaurant.create({
            restaurantName : this.name,
            restaurantOwner : this._id
        })
    }
});


const User : mongoose.Model<Iuser> = mongoose.model("User",userSchema);



export default User;
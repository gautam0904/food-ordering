import mongoose from "mongoose";
import { Irestaurant } from "../interface/model.interface";
import { errorMsg } from "../constant/message";

const restaurantSchema : mongoose.Schema<Irestaurant> = new mongoose.Schema({
    restaurantName : {
        type : String,
        required : [true, errorMsg.requiredRestaurantName]
    },
    restaurantOwner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
} , { timestamps : true});

const Restaurant = mongoose.model('Restaurent' , restaurantSchema);

export default Restaurant
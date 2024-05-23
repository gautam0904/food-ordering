import mongoose from "mongoose";
import { restaurantInterFace } from "../interface/model.interface";
import { errorMsg } from "../constant/message";

const restaurantSchema : mongoose.Schema<restaurantInterFace> = new mongoose.Schema({
    restaurantName : {
        type : String,
        required : [true, errorMsg.requiredRestaurantName]
    },
    restaurantOwner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
});

const Restaurant = mongoose.model('Restaurent' , restaurantSchema);

export default Restaurant
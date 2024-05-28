import mongoose from "mongoose";
import { IrestaurantFood } from "../interface/model.interface";

const restaurantFoodSechema : mongoose.Schema<IrestaurantFood> =new mongoose.Schema({
    foodId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Food",
    },
    restaurentId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Restaurant",
    },
    status: {
        type : Boolean,
        default : true ,
    },
    isDeleted : {
        type : Boolean,
        default : false,
    }
} ,{timestamps : true});

const RestaurantFood = mongoose.model("RestaurantFood" , restaurantFoodSechema);

export default RestaurantFood;
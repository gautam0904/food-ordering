import mongoose from "mongoose";
import { restaurantFoodInterface } from "../interface/model.interface";

const restaurantFoodSechema : mongoose.Schema<restaurantFoodInterface> =new mongoose.Schema({
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
    }
} ,{timestamps : true});

const RestaurantFood = mongoose.model("RestaurantFood" , restaurantFoodSechema);

export default RestaurantFood;
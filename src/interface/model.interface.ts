import mongoose from "mongoose";

export interface userInterace extends Document {
    name: string;
    email: string;
    password: string;
    profilePicture?: string;
    usertype: string;
    isPasswordCorrect(password: string): Promise<boolean>; 
}

export interface foodInterface extends Document{
    foodName : string;
    price:number;
    picture : string;
}

export interface restaurantFoodInterface extends Document{
    foodId : mongoose.Schema.Types.ObjectId;
    restaurentId : mongoose.Schema.Types.ObjectId;
    status : boolean;
}

export interface restaurantInterFace extends Document {
    restaurantName : string; 
    restaurantOwner : mongoose.Schema.Types.ObjectId;

}
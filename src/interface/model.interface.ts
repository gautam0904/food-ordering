import mongoose from "mongoose";

export interface Iuser extends Document {
    name: string;
    email: string;
    password: string;
    profilePicture?: string;
    usertype: string;
    isDeleted : boolean;
    isPasswordCorrect(password: string): Promise<boolean>; 
}

export interface Ifood extends Document{
    foodName : string;
    price:number;
    picture : string;
    isDeleted : boolean;
}

export interface IrestaurantFood extends Document{
    foodId : mongoose.Schema.Types.ObjectId;
    restaurentId : mongoose.Schema.Types.ObjectId;
    status : boolean;
    isDeleted : boolean;
}

export interface Irestaurant extends Document {
    restaurantName : string; 
    restaurantOwner : mongoose.Schema.Types.ObjectId;
    isDeleted : boolean;
}
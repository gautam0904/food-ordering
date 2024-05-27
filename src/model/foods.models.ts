import mongoose from 'mongoose'
import {Ifood } from '../interface/model.interface'
import { Msg, errorMsg } from '../constant/message'

const foodSchema :mongoose.Schema<Ifood> = new mongoose.Schema({
    foodName : {
        type : String,
        required : [true ,errorMsg.requiredFoodNmae]
    },
    price:{
        type : Number,
        required :[true ,errorMsg.requiredFoodPrice]
    },
    picture :{
        type :String
    }
},{timestamps : true});

const Food : mongoose.Model<Ifood> = mongoose.model("Food",foodSchema);

export default Food;


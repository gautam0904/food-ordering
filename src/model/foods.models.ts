import mongoose from 'mongoose'
import { foodInterface } from '../interface/model.interface'
import { Msg, errorMsg } from '../constant/message'

const foodSchema :mongoose.Schema<foodInterface> = new mongoose.Schema({
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

const Food : mongoose.Model<foodInterface> = mongoose.model("Food",foodSchema);

export default Food;


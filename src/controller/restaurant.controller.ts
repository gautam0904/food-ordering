import express from "express";
import {statuscode} from "../constant/statusCode"
import { restaurantInterFace } from "../interface/model.interface";
import { Request ,Response } from "express"
import { ApiError } from "../utility/ApiError";
import { errorMsg } from "../constant/message";
import { RestaurantService } from "../services/restaurant .service";

const restaurant = new RestaurantService()

export const createRestaurant = async (req : Request , res : Response) =>{
    try {
        const restaurantData :restaurantInterFace = req.body;
        if (!restaurantData.restaurantName) throw new ApiError (statuscode.NotAcceptable ,errorMsg.requiredRestaurantName) ;
        const createdRestaurant = await restaurant.createRestaurant(restaurantData);
        res.status(createdRestaurant.statuscode).json(createdRestaurant.content)       
    } catch (error : any) {
        res.status(error.statuscode || statuscode.NotImplemented).json({message : error.message})
    }
}

export const getRestaurant =async (req : Request , res : Response )=>{
    try {
        
    } catch (error) {
        
    }
}
import express from "express";
import {statuscode} from "../constant/statusCode"
import { Irestaurant } from "../interface/model.interface";
import { Request ,Response } from "express"
import { ApiError } from "../utility/ApiError";
import { errorMsg } from "../constant/message";
import { RestaurantService } from "../services/restaurant .service";
import { IgetRestaurant, IgetRestaurantHeader } from "../interface/request.interface";

const restaurant = new RestaurantService()

export const create = async (req : Request , res : Response) =>{
    try {
        const restaurantData :Irestaurant = req.body;
        if (!restaurantData.restaurantName) throw new ApiError (statuscode.NotAcceptable ,errorMsg.requiredRestaurantName) ;
        const createdRestaurant = await restaurant.createRestaurant(restaurantData);
        res.status(createdRestaurant.statuscode).json(createdRestaurant.content)       
    } catch (error : any) {
        res.status(error.statuscode || statuscode.NotImplemented).json({message : error.message})
    }
}

export const get =async (req : Request , res : Response )=>{
    try {
        const restaurantData :IgetRestaurant = req.body;
        const restaurantDataHeader : IgetRestaurantHeader = req.query
        if (!restaurantData.restaurantName) throw new ApiError (statuscode.NotAcceptable ,errorMsg.requiredRestaurantName) ;
        const createdRestaurant = await restaurant.getRestaurant(restaurantData , restaurantDataHeader);
        res.status(createdRestaurant.statuscode).json(createdRestaurant.content)
        
    } catch (error : any) {
        res.status(error.statuscode || statuscode.NotImplemented).json({message : error.message})
    }
}

export const Delete = async (req: Request , res : Response)=>{
    try {
        
    } catch (error : any) {
        
    }
}

export const update = async (req : Request , res : Response) => {
    try {
        
    } catch (error : any) {
        
    }
}
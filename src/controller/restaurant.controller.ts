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
        res.status(error.status || statuscode.NotImplemented).json({message : error.message})
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
        res.status(error.status || statuscode.NotImplemented).json({message : error.message})
    }
}

export const Delete = async (req: Request , res : Response)=>{
    try {
        const restaurantData = req.body;
        if (!restaurantData.restaurantName) {
            throw new ApiError(statuscode.NotAcceptable, errorMsg.requiredFields);
        }
        const deletedRestaurant = await restaurant.deleteRestaurant(restaurantData);
        res.status(deletedRestaurant.statuscode).json(deletedRestaurant.content);
    } catch (error : any) {
        res.status(error.status || statuscode.NotImplemented).json({message : error.message})
    }
}

export const update = async (req : Request , res : Response) => {
    try {
        const restaurantData = req.body;
        if([restaurantData.restaurantName , restaurantData.updatedrestaurantName].some ((field) => field.trim() == "")){
            throw new ApiError (statuscode.NotAcceptable, errorMsg.requiredFields)
        }
        const updatedrestaurant  = await restaurant.updateRestaurant(restaurantData);
        res.status(updatedrestaurant.statuscode).json(updatedrestaurant.content);
    } catch (error : any) {
        res.status(error.status || statuscode.NotImplemented).json({message : error.message})
    }
}

export const getdeleted = async (req: Request, res: Response) =>{
    try {
        const deletedrestaurent = await restaurant
    } catch (error :any) {
        
    }
}

export const retrieve = async (req: Request, res: Response) =>{
    try {
        
    } catch (error :any) {
        
    }
}
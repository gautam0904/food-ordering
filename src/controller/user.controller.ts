import { Request ,Response, json, response } from "express"
import { Iuser } from "../interface/model.interface";
import { userService } from "../services/user.service";
import { ApiError } from "../utility/ApiError";
import { statuscode } from "../constant/statusCode";
import { errorMsg } from "../constant/message";
import mongoose from "mongoose";
import { IupdateUser } from "../interface/request.interface";

const user = new userService()
// const restaurant = new 

export const signup = async (req: Request, res: Response) => {
    try {
        const signupData: Iuser = req.body;
        if ([signupData.name, signupData.email, signupData.password, signupData.usertype].some((field) => field.trim() == "")) {
            throw new ApiError(statuscode.NotAcceptable, errorMsg.requiredFields);
        }

        if(signupData.usertype == "admin"){
            throw new ApiError (statuscode.NotAcceptable , errorMsg.createadmin)
        }

        const created_user = await user.createUser(signupData);
        
        res.status(created_user.statuscode).json(created_user.content);

    } catch (error: any) {
        res.status(error.statuscode || statuscode.NotImplemented).json({ message: error.message });
    }
}

export const login = async (req : Request , res : Response) => {
    try {
        const loginData = req.body;
        if ([loginData.email , loginData.password].some ((field) => field.trim() == "")) {
            throw new ApiError(statuscode.NotAcceptable , errorMsg.requiredFields)
        } 

        const login_user = await user.loginUser(loginData);
        res.status(login_user.statuscode).json(login_user.content);
    } catch (error : any) {
        res.status(error.statuscode || statuscode.NotImplemented).json({message : error.message})
    }
}

export const Delete = async (req: Request, res: Response) =>{
    try {
      
        
        const id : string = req.body.id;
        if (!id) {
            throw new ApiError(statuscode.NotAcceptable, errorMsg.requiredFields);
        }

        
        const deleted_user = await user.deleteUser(id);
        res.status(deleted_user.statuscode).json(deleted_user.content);
    } catch (error : any) {
        res.status(error.statuscode || statuscode.NotImplemented).json({message: error.message})
    }
}

export const get = async (req : Request , res: Response) => {
    try {
        const users = await user.getAlluser();
        res.status(users.statuscode).json(users.content);
    } catch (error : any) {
        res.status(error.statuscode || statuscode.NotImplemented).json({message : error.message})
    }
}

export const  update = async (req : Request , res : Response) =>{
    try {
        const updateData : IupdateUser = req.body;
        if ([updateData.id , updateData.role].some((field) => field.trim() == "")) {
            throw new ApiError(statuscode.NotAcceptable , errorMsg.requiredFields)
        }
        const updated_user = await user.updateUser(updateData);
        res.status(updated_user.statuscode).json(updated_user.content);
    } catch (error : any) {
        res.status(error.statuscode || statuscode.NotImplemented).json({message : error.message});
    }
}

export const getdeleted = async(req: Request , res : Response) =>{
    try {
        const DeletedUsers = await user.getAlldeletedUsers();
        res.status(DeletedUsers.statuscode).json(DeletedUsers.content);
    } catch (error : any) {
        res.status(error.statuscode || statuscode.NotImplemented ).json({message : error.message});
    }
}

export const retreive = async (req : Request , res : Response) =>{
    try {
        const userID : string = req.body.id;
        if (!userID) {
            throw new ApiError(statuscode.NotAcceptable, errorMsg.requiredFields);
        }

        const retrievedUser = await user.retrieviedUser(userID);
        res.status(retrievedUser.statuscode).json(retrievedUser.content)
    } catch (error : any ) {
        res.status(error.status || statuscode.NotImplemented).json({message : error.message})
    }
}
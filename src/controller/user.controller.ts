import { Request ,Response } from "express"
import { userInterace } from "../interface/model.interface";
import { userService } from "../services/user.service";
import { ApiError } from "../utility/ApiError";
import { statuscode } from "../constant/statusCode";
import { errorMsg } from "../constant/message";

const user = new userService()
// const restaurant = new 

export const signup = async (req: Request, res: Response) => {
    try {
        const signupData: userInterace = req.body;
        if ([signupData.name, signupData.email, signupData.password, signupData.usertype].some((field) => field.trim() == "")) {
            throw new ApiError(statuscode.NotAcceptable, errorMsg.requiredFields);
        }

        // signupData.usertype == "owner"? 

        const created_user = await user.createUser(signupData);
        
        res.status(created_user.statuscode).json(created_user.content);

    } catch (error: any) {
        res.status(error.statuscode).json({ message: error.message });
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
        res.status(error.statuscode).json({message : error.message})
    }
}

export const Delete = async (req: Request, res: Response) =>{
    try {
        const id = req.body;
        if (id.trim() == "") {
            throw new ApiError(statuscode.NotAcceptable, errorMsg.requiredFields);
        }
        const deleted_user = await user.deleteUser(id);
        res.status(deleted_user.statuscode).json(deleted_user.content);
    } catch (error : any) {
        res.status(error.status).json({message: error.message})
    }
}
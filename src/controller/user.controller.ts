import { Request ,Response } from "express"
import { userInterace } from "../interface/model.interface";
import { userService } from "../services/user.service";
import { ApiError } from "../utility/ApiError";
import { statuscode } from "../constant/statusCode";
import { errorMsg } from "../constant/message";

const user = new userService()

export const signup = async (req: Request, res: Response) => {
    try {
        const signupData: userInterace = req.body;
        if ([signupData.name, signupData.email, signupData.password, signupData.usertype].some((field) => field.trim() == "")) {
            throw new ApiError(statuscode.NotAcceptable, errorMsg.requiredFields);
        }

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
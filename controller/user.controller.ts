import { Request ,Response } from "express"
import { userInterace } from "../interface/model.interface";
import { userService } from "../services/user.service";

const user = new userService()

const signup = (req : Request, res : Response)=>{
    const signupData : userInterace = req.body;

}
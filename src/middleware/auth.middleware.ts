import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utility/ApiError";
import { statuscode } from "../constant/statusCode";
import { errorMsg } from "../constant/message";
import jwt, { JwtPayload, verify } from "jsonwebtoken";
import {rolmiddle} from "./role.middleware"


export const authMiddle = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;

    if (!token) throw new ApiError (statuscode.NotAcceptable , `${errorMsg.requiredToken}`);

    const tokenarray = (token as string).split(' ')
    
   if( tokenarray[0] !== "Bearer" ){
     throw new ApiError (statuscode.NotAcceptable,`${errorMsg.requiredBearer}`)
   }

   jwt.verify(tokenarray[1] , process.env.AccessTokenSeceret as jwt.Secret ,async (err,decoded )=>{
        if(err) throw new ApiError(statuscode.Unauthorized ,`${errorMsg.expiredToken}`);

        req.body.USERTYPE = (decoded as JwtPayload).userType;
        req.body.USERID = (decoded as JwtPayload).id;
   })
    next();
    } catch (error: any) {
       res.status(error.statusCode).json({
        mesage : error.message
       }) 
    }
    
} 

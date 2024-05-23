import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utility/ApiError";
import { statuscode } from "../constant/statusCode";
import { errorMsg } from "../constant/message";
import jwt, { JwtPayload, verify } from "jsonwebtoken";
import User from "../model/user.models";
export const authMiddle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token)
      throw new ApiError(statuscode.NotAcceptable, `${errorMsg.requiredToken}`);

    const tokenarray = (token as string).split(" ");

    if (tokenarray[0] !== "Bearer") {
      throw new ApiError(
        statuscode.NotAcceptable,
        `${errorMsg.requiredBearer}`
      );
    }

    try {
      const decoded = await jwt.verify(
        tokenarray[1],
        process.env.AccessTokenSeceret as jwt.Secret
      );
      
      req.body.USERID = (decoded as JwtPayload).id;
      const user = await User.findOne({_id : (decoded as JwtPayload).id})        
      req.body.USERTYPE = user?.usertype;

      next();
    } catch (err: any) {
      throw new ApiError(statuscode.Unauthorized,`${errorMsg.expiredToken}`);
    }
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      mesage: error.message,
    });
  }
};

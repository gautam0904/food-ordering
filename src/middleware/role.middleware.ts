import { Request, Response, NextFunction } from "express";
import { statuscode } from "../constant/statusCode";
import { ApiError } from "../utility/ApiError";
import { errorMsg } from "../constant/message";

const permission = {
  admin: [`/restaurant/create`,`/user/delete`],
  owner: [`/restaurant/create`],
  customer: [`/restaurant/get`],
};

export const rolmiddle = (req: Request, res: Response, next: NextFunction) => {
    try {
      const userType = req.body.USERTYPE;
      const currentRoute = req.protocol + '://' + req.get('host') + req.originalUrl;
      const parsedUrl = new URL(currentRoute);
      const pathname = parsedUrl.pathname;
      const userPermissions = permission[userType as keyof typeof permission];
      if (userPermissions && userPermissions.includes(pathname)) {
        next();
      } else {
        throw new ApiError(statuscode.forbidden, errorMsg.notValidRole(userType));
      }
    } catch (error: any) {
      res.status(error.status || 500).json({
        message: error.message,
      });
    }
  };
  

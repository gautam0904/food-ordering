import { Request, Response, NextFunction } from "express";
import { statuscode } from "../constant/statusCode";
import { ApiError } from "../utility/ApiError";
import { errorMsg } from "../constant/message";

const permission = {
  admin: [`/restaurant/create`, `/user/delete`, `/user/get`, `/user/update`,`/user/getDeleted` ,`/user/retreive`,`/restaurant/get`,`/restaurant/update`,`/restaurant/delete`,`/restaurant/retreive`],
  owner: [`/restaurant/create`,`/restaurant/update`,`/restaurant/delete`,`/restaurant/retreive`],
  customer: [`/restaurant/get`],
};

export const rolmiddle = (req: Request, res: Response, next: NextFunction) => {
  try {
    const userType = req.body.USERTYPE;
    const currentRoute =
      req.protocol + "://" + req.get("host") + req.originalUrl;
    const parsedUrl = new URL(currentRoute);
    const pathname = parsedUrl.pathname;
    const userPermissions = permission[userType as keyof typeof permission];

    if (userPermissions.includes(pathname)) {

      
      next();
   
      
    } else {
      throw new ApiError(statuscode.forbidden, errorMsg.notValidRole(userType));
    }
  } catch (error: any) {
    res.status(error.status || statuscode.NotImplemented).json({
      message: error.message,
    });
  }
};

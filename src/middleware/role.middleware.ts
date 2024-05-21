import { Request,Response,NextFunction } from "express";
export const rolmiddle = (req: Request, res: Response, next: NextFunction) =>{
    try {
        const userType = req.body.USERTYPE;

        const currentRoute = req.originalUrl 

        const testRouteArray = currentRoute.split('/');

     
        
        next();
    } catch (error : any) {        
        res.status(error.status).json({
            message : error.message
        })
    }
}


    
    





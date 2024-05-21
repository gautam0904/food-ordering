import { errorMsg} from "../constant/message";

export class ApiError extends Error {
    statusCode: number;
   constructor (
    statusCode : number,
    message  = `${errorMsg.defaultErrorMsg}`,
    
 ){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
   }
}
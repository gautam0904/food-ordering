import { userInterace } from "../interface/model.interface";
import { statuscode } from "../constant/statusCode";
import { Msg, errorMsg } from "../constant/message";
import User from "../model/user.models";
import { ApiError } from "../utility/ApiError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class userService {
  async createUser(
    userdata: userInterace
  ): Promise<{ statuscode: number; content: object }> {
    try {
      const existuser = await User.findOne({ email: userdata.email });

      if (existuser) {
        throw new ApiError(statuscode.Conflict, `${errorMsg.exsistuser}`);
      }

      const result = await User.create({
        name: userdata.name,
        email: userdata.email,
        password: userdata.password,
        usertype: userdata.usertype,
        profilePicture: userdata.profilePicture,
      });
      return {
        statuscode: statuscode.ok,
        content: { message: `${Msg.usercreated}` },
      };
    } catch (error: any) {
      return {
        statuscode: error.statusCode || statuscode.NotImplemented,
        content: error.message,
      };
    }
  }

  async loginUser(logindata: userInterace) {
    try {
      const existuser = await User.findOne({ email: logindata.email });

      if (!existuser)
        throw new ApiError(statuscode.NoteFound, `${errorMsg.notExistUser}`);

      const isMach = await bcrypt.compare(
        logindata.password,
        existuser.password
      );

      if (!isMach) throw new ApiError(statuscode.Unauthorized , `${errorMsg.passwordNotMatch}`);
      let AccessToken : string = "access_token" ;
      
      
  
       AccessToken = jwt.sign({
          id: existuser._id,
          userType: existuser.usertype
      },(process.env.AccessTokenSeceret as string) ,
          {
              expiresIn: process.env.AccessExpire,
          }
      );
    
      return {
        statuscode : statuscode.ok,
        content : {
            message : `${Msg.loginSuccess}`,
            AccessToken
        }
      }
    } catch (error :any) {
      return {
        statuscode: error.statusCode || statuscode.NotImplemented,
        content: { message: error.message },
      };
    }
  }


  
}

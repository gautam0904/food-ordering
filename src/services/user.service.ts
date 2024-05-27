import { Iuser } from "../interface/model.interface";
import { statuscode } from "../constant/statusCode";
import { Msg, errorMsg } from "../constant/message";
import User from "../model/user.models";
import { ApiError } from "../utility/ApiError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RestaurantService } from "./restaurant .service";
import { IcreateRestaurant, IupdateUser } from "../interface/request.interface";
import mongoose, { isValidObjectId } from "mongoose";

const restaurant = new RestaurantService();

export class userService {
  async createUser(
    userdata: Iuser
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

      const resturantData: IcreateRestaurant = {
        restaurantName: userdata.name,
      };

      if (userdata.usertype === "owner") {
        return {
          statuscode: statuscode.ok,
          content: {
            message: `${Msg.usercreated} \n ${Msg.restaurantCreated} with ${userdata.name} as restaurent name you can update it `,
          },
        };
      } else {
        return {
          statuscode: statuscode.ok,
          content: { message: `${Msg.usercreated}` },
        };
      }
    } catch (error: any) {
      return {
        statuscode: error.statusCode || statuscode.NotImplemented,
        content: error.message,
      };
    }
  }

  async loginUser(logindata: Iuser) {
    try {
      const existuser = await User.findOne({ email: logindata.email });

      if (!existuser)
        throw new ApiError(statuscode.NoteFound, `${errorMsg.notExistUser}`);

      const isMach = await bcrypt.compare(
        logindata.password,
        existuser.password
      );

      if (!isMach)
        throw new ApiError(
          statuscode.Unauthorized,
          `${errorMsg.passwordNotMatch}`
        );
      let AccessToken: string = "access_token";

      AccessToken = jwt.sign(
        {
          userID: existuser._id,
          userType: existuser.usertype,
        },
        process.env.AccessTokenSeceret as string,
        {
          expiresIn: process.env.AccessExpire,
        }
      );

      return {
        statuscode: statuscode.ok,
        content: {
          message: `${Msg.loginSuccess}`,
          AccessToken,
        },
      };
    } catch (error: any) {
      return {
        statuscode: error.statusCode || statuscode.NotImplemented,
        content: { message: error.message },
      };
    }
  }

  async deleteUser(userId: string) {
    try {
      const existUser = await User.findOne({ _id: userId });

      if (!existUser) {
        throw new ApiError(statuscode.NoteFound, `${errorMsg.notExistUser}`);
      }
      const result = await User.findByIdAndUpdate(
        { _id: existUser._id },
        {
          $set: {
            isDeleted: true,
          },
        },
        { new: true }
      );
      return {
        statuscode: statuscode.ok,
        content: {
          message: Msg.deleteuser,
        },
      };
    } catch (error: any) {
      return {
        statuscode: error.statusCode || statuscode.NotImplemented,
        content: { message: error.message },
      };
    }
  }

  async getAlluser() {
    try {
      const users = await User.aggregate([
        {
          $match: {
            isDeleted: false,
          },
        },
        {
          $project: {
            name: 1,
            email: 1,
            usertype: 1,
          },
        },
      ]);
      if (users) {
        return {
          statuscode: statuscode.ok,
          content: { users },
        };
      } else {
        throw new ApiError(statuscode.NoteFound, `${errorMsg.userNotFound}`);
      }
    } catch (error: any) {
      return {
        statuscode: error.statusCode || statuscode.NotImplemented,
        content: { message: error.message },
      };
    }
  }

  async updateUser(updateData: IupdateUser) {
    try {
      const result = await User.findByIdAndUpdate(
        {
          _id: updateData.id,
        },
        {
          $set: {
            usertype: updateData.role,
          },
        },
        { new: true }
      );
      if (result) {
        return {
          statuscode: statuscode.ok,
          content: result,
        };
      }
      throw new ApiError(statuscode.NotImplemented, errorMsg.updateUser);
    } catch (error: any) {
      return {
        statuscode: error.statusCode || statuscode.NotImplemented,
        content: error.message,
      };
    }
  }

  async getAlldeletedUsers() {
    try {
      const allDeletedUsers = await User.aggregate([
        {
          "$match": {
            "isDeleted": true
          }
        },
        {
          "$group": {
            "_id": null,
            "name" : {
              $push :{ "name " :  "$name","id" : "$_id"}
            },
            "deletedCount": {
              "$sum": 1
            }
          }
        },{
          $unwind: {
            path: "$name",
          }
        },
        {
          "$project": {
            "_id": 1,
            "name": 1, 
            "deletedCount": 1
          }
        }]);
      if (!allDeletedUsers) {
        throw new ApiError(statuscode.NoteFound, errorMsg.notFoundDeleted);
      }
      return {
        statuscode : statuscode.ok,
        content : allDeletedUsers
      }
    } catch (error: any) {
      return {
        statuscode: error.statusCode || statuscode.NotImplemented,
        content: error.message,
      };
    }
  }

  async retrieviedUser (userID : string){
    try {

      if(!isValidObjectId(userID)){
        throw new ApiError(statuscode.NotAcceptable , `${errorMsg.invalidID}`)
      }
      const deletedexistUser = await User.findOne({ _id: userID.trim() });

      if (!deletedexistUser) {
        throw new ApiError (statuscode.NoteFound , errorMsg.notExistUser)
      }
      const result =  await User.findByIdAndUpdate(
        {_id : deletedexistUser._id},
        {
          $set : {
            isDeleted : false
          }
        },
        {new : true}
      );
      
      if(!result){
        throw new ApiError (statuscode.NotImplemented ,`${errorMsg}`)
      }
      return {
        statuscode : statuscode.ok,
        content : Msg.retreiveUser
      }
    } catch (error : any ) {
      return{
        statuscode: error.statusCode || statuscode.NotImplemented,
        content: error.message,
      }
    }
  }


}

import { create } from "ts-node";
import { Msg, errorMsg } from "../constant/message";
import { statuscode } from "../constant/statusCode";
import {
  IcreateRestaurant,
  IgetRestaurant,
  IgetRestaurantHeader,
  IretrievedRestaurant,
  IupdateRestaurant,
} from "../interface/request.interface";
import Restaurant from "../model/restaurant.models";
import { DynamicQueries } from "../utility/dynamicquery";
import { ApiError } from "../utility/ApiError";

const dynamicQueries = new DynamicQueries();

export class RestaurantService {
  async createRestaurant(restaurantData: IcreateRestaurant) {
    try {
      const result = await Restaurant.create({
        restaurantName: restaurantData.restaurantName,
        restaurantOwner: restaurantData.USERID,
      });
      return {
        statuscode: statuscode.ok,
        content: {
          message: `${Msg.restaurantCreated}`,
        },
      };
    } catch (error: any) {
      return {
        statuscode: error.statuscode || 500,
        content: {
          message: error.message,
        },
      };
    }
  }

  async getRestaurant(
    restaurantData: IgetRestaurant,
    restaurantDataHeader: IgetRestaurantHeader
  ) {
    try {
      const serarch = await dynamicQueries.serarch(
        [`restaurantName`, `ownerName`],
        restaurantDataHeader.searchTerm as string
      );

      const filter = await dynamicQueries.filter(
        [],
        [
          {
            restaurantName: restaurantData.restaurantName
              ? restaurantData.restaurantName
              : {},
          },
          { ownerName: restaurantData.owner ? restaurantData.owner : {} },
        ]
      );

      const pageNumber = parseInt(restaurantDataHeader.page as string) || 1;
      const limit = parseInt(restaurantDataHeader.pagesize as string) || 10;
      const skip = (pageNumber - 1) * limit;

      const dyanamicPipeline = [
        {
          $lookup: {
            from: "users",
            localField: "restaurantOwner",
            foreignField: "_id",
            as: "owner",
          },
        },
        {
          $unwind: "$owner",
        },
        {
          $project: {
            restaurantName: 1,
            ownerName: "$owner.name",
            isDeleted: 1,
            createdAt: 1,
          },
        },
        {
          $match: {
            $or: serarch,
            $and: filter,
            isDeleted: false,
          },
        },
        { $skip: skip },
        { $limit: limit },
      ];

      const result = await Restaurant.aggregate(dyanamicPipeline);

      return {
        statuscode: statuscode.ok,
        content: result,
      };
    } catch (error: any) {
      return {
        statuscode: error.statuscode || statuscode.NotImplemented,
        content: {
          message: error.message,
        },
      };
    }
  }

  async deleteRestaurant(restaurantData: { restaurantName: string }) {
    try {
      const result = await Restaurant.findOneAndUpdate(
        { restaurantName: restaurantData.restaurantName },
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
          message: `${Msg.restaurantDeleted}`,
        },
      };
    } catch (error: any) {
      return {
        statuscode: error.statuscode || statuscode.NotImplemented,
        content: {
          message: error.message,
        },
      };
    }
  }

   

  async updateRestaurant(restaurantData: IupdateRestaurant) {
    try {
      const restaurant: any = await Restaurant.findOne({
        restaurantName: restaurantData.restaurantName,
      });
      
      if (
        restaurantData.USERTYPE == "owner" &&
        restaurant.restaurantOwner != restaurantData.USERID
      ) {
        throw new ApiError(
          statuscode.NotAcceptable,
          errorMsg.RestaurantOwner
        );
      }
      const result = await Restaurant.findOneAndUpdate(
        { restaurantName: restaurantData.restaurantName },
        {
          $set: {
            restaurantName: restaurantData.updatedrestaurantName,
          },
        },
        { new: true }
      );
      return {
        statuscode: statuscode.ok,
        content: {
          message: `${Msg.restaurantUpdated}`,
        },
      };
    } catch (error: any) {
      return {
        statuscode: error.statuscode || statuscode.NotImplemented,
        content: {
          message: error.message,
        },
      };
    }
  }

  async getdeletedRestaurant() {
    try {
      const result = await Restaurant.find({ isDeleted: true });
      return {
        statuscode: statuscode.ok,
        content: result,
      };
    } catch (error: any) {
      return {
        statuscode: error.statuscode || statuscode.NotImplemented,
        content: {
          message: error.message,
        },
      };
    }
  }

  async retrievedRestaurant(restaurantData:IretrievedRestaurant ) {
    try {
      const restaurant: any = await Restaurant.findOne({
        restaurantName: restaurantData.restaurantName,
      });
      
      if (
        restaurantData.USERTYPE == "owner" &&
        restaurant.restaurantOwner != restaurantData.USERID
      ) {
        throw new ApiError(
          statuscode.NotAcceptable,
          errorMsg.RestaurantOwner
        );
      }
      const result = await Restaurant.findOneAndUpdate(
        { restaurantName: restaurantData.restaurantName },
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
          message: `${Msg.restaurantRetrieved}`,
        },
      };
    } catch (error: any) {
      return {
        statuscode: error.statuscode || statuscode.NotImplemented,
        content: {
          message: error.message,
        },
      };
    }
  }
}

import { create } from "ts-node";
import { Msg } from "../constant/message";
import { statuscode } from "../constant/statusCode";
import {
  IcreateRestaurant,
  IgetRestaurant,
  IgetRestaurantHeader,
} from "../interface/request.interface";
import Restaurant from "../model/restaurant.models";
import { DynamicQueries } from "../utility/dynamicquery";
type IsoDate = Date;

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
        ],
        [
          {
            createdAt: [
              restaurantData.startCreated ? restaurantData.startCreated : {},
              restaurantData.endCreated ? restaurantData.endCreated : {},
            ],
          },
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
      console.log(dyanamicPipeline);
      console.log(filter);
      console.log(serarch);

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
}

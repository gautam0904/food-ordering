import { Msg } from "../constant/message";
import { statuscode } from "../constant/statusCode";
import { Irestaurant } from "../interface/model.interface";
import { IcreateRestaurant } from "../interface/request.interface";
import Restaurant from "../model/restaurant.models";

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

  async getRestaurant(restaurantData: Irestaurant) {
    try {
      
    } catch (error : any) {
      return {
        statuscode : error.statuscode || statuscode.NotImplemented
      }
    }
  }
}

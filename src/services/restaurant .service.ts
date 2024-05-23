import { Msg } from "../constant/message";
import { statuscode } from "../constant/statusCode";
import { createRestaurantInterface } from "../interface/request.interface";
import Restaurant from "../model/restaurant.models";

export class RestaurantService {
  async createRestaurant(restaurantData : createRestaurantInterface) {
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
              message: error.message
            },
          }
    }
  }

  async getRestaurant(restaurantData ){
    
  }
}

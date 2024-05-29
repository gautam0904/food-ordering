import { retreive } from "../controller/user.controller"

export const Msg ={
    connectDB : `Database is connected successfully`,
    serverlisten : `Server is listening`,
    usercreated : `User is created successfully`,
    loginSuccess : `User is logged in successfully`,
    deleteuser : `User is deleted successfully`,
    restaurantCreated : `Restaurant is created successfully `,
    retreiveUser : `User is retrieved successfully`,
    restaurantDeleted : `Restaurant is deleted successfully`,
    restaurantUpdated : `Restaurant is updated successfully`,
    restaurantRetrieved : `Restaurant is retrieved successfully`,

}

export const errorMsg ={
    defaultErrorMsg : `some things went wrong`, 
    createadmin : `admin user can not be crated at signup the user`,
    requiredToken :`Access token is required for further processing`,
    requiredPassword : `Password is required for signup the user`,
    requiredEmail : `Email is required for signup the user`,
    requiredName : `Name is required for signup the user`,
    requiredRole : `Role is required for signup the user`,
    requiredBearer : `Token type should be only Bearer `,
    requiredFoodNmae : `Food name is required `,
    requiredFoodPrice : `Food price is required `,
    requiredRestaurantName : `Restaurant name is required`,
    requiredRestaurentCity : `Restaurant city is required`,
    requiredFoodType : `Food type is required `,
    connectDB : `Database is not connected`,
    serverlisten : `Server is not listening`,
    requiredFields : `you have to required fileds`,
    exsistuser : `Email id is already exist `,
    notExistUser : `User is not exist`,
    passwordNotMatch : `Password is not match`,
    expiredToken : `Access token is not verified it may be expired`,
    notValidRole : (Role: string ) =>{return `${Role} don't have permission to access this functionality.`},
    userNotFound : `There is no user `,
    updateUser : `User is not updated`,
    notFoundDeleted : `Tere is no deleted user`,
    retreiveUser : `User is not retrieved`,
    invalidID : `Invalid object ID`,
    RestaurantOwner :`Restaurant owner can only be access own restaurants`
}
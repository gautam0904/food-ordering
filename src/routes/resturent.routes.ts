import express from "express";
import { createRestaurant ,getRestaurant } from "../controller/restaurant.controller";
import { authMiddle } from "../middleware/auth.middleware";
import { rolmiddle } from "../middleware/role.middleware";

const RestaurantRouter = express.Router();

RestaurantRouter.post('/create',authMiddle,rolmiddle, createRestaurant);
RestaurantRouter.get('/get',authMiddle,rolmiddle, getRestaurant);
RestaurantRouter.put('/update',authMiddle )

export default RestaurantRouter;
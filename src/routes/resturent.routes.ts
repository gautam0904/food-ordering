import express from "express";
import { create ,get,Delete , update,retrieve,getdeleted } from "../controller/restaurant.controller";
import { authMiddle } from "../middleware/auth.middleware";
import { rolmiddle } from "../middleware/role.middleware";

const RestaurantRouter = express.Router();

RestaurantRouter.post('/create',authMiddle,rolmiddle, create);
RestaurantRouter.get('/get',authMiddle,rolmiddle, get);
RestaurantRouter.put('/update',authMiddle,rolmiddle,update );
RestaurantRouter.delete('/delete' ,authMiddle,rolmiddle, Delete);
RestaurantRouter.post('/retrieve',authMiddle,rolmiddle,retrieve);
RestaurantRouter.get('/getdeleted',authMiddle,rolmiddle,getdeleted);

export default RestaurantRouter;
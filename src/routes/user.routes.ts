import express from "express";
import { signup ,login ,Delete,get, update, getdeleted, retreive} from "../controller/user.controller";
import { authMiddle } from "../middleware/auth.middleware";
import { rolmiddle } from "../middleware/role.middleware";


const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login' , login);
userRouter.delete('/delete',authMiddle,rolmiddle, Delete);
userRouter.get('/get', authMiddle ,rolmiddle ,get);
userRouter.put('/update' , authMiddle , rolmiddle ,update);
userRouter.get('/getDeleted',authMiddle , rolmiddle , getdeleted);
userRouter.post('/retreive', authMiddle , rolmiddle, retreive) ; 

export default userRouter;
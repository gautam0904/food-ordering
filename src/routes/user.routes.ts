import express from "express";
import { signup ,login ,Delete} from "../controller/user.controller";
import { authMiddle } from "../middleware/auth.middleware";
import { rolmiddle } from "../middleware/role.middleware";

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login' , login);
userRouter.post('/delete',authMiddle,rolmiddle, Delete)

export default userRouter;
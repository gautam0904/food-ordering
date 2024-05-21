import express from "express";
import { signup ,login} from "../controller/user.controller";
import { authMiddle } from "../middleware/auth.middleware";
import { rolmiddle } from "../middleware/role.middleware";

const userRouter = express.Router();

userRouter.post('/signup' ,authMiddle,rolmiddle, signup);
userRouter.post('/login' , login);

export default userRouter;
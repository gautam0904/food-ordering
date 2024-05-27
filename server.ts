import express, { json } from 'express';
import dotenv from 'dotenv';
import {connectDB} from './src/DB/index';
import { Msg ,errorMsg } from './src/constant/message';
import userRouter from './src/routes/user.routes';
import RestaurantRouter from './src/routes/resturent.routes';



dotenv.config();

const app = express();

app.use(express.json());


connectDB().then(()=>{
    app.listen(parseInt(process.env.port as string) , ()=>{
        console.log(`${Msg.serverlisten} on port ${process.env.port }`);
    });
})
.catch((error : any) =>{
    console.log(`${errorMsg.serverlisten} `);
    console.log(error);
});

//  postman document link
//  https://documenter.getpostman.com/view/34230594/2sA3Qs9rW3
app.use('/user' , userRouter);
app.use('/restaurant' , RestaurantRouter)
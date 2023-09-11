import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { notFound,errorHandler } from './Middleware/errorMiddleware.js';
import connectDB from './config/db.js';
const port =process.env.PORT||9000;
import userRoutes from './routes/userroutes.js'

connectDB();
const app=express();
app.use(express.json())
app.use(express.urlencoded(urlencoded({extended:true})))
app.use(cors())
app.use(express.static('public'))
app.use(cookieParser())

app.use('/api/users',userRoutes);



app.use(notFound)
app.use(errorHandler)

app.listen(port,()=> console.log(`server running on port ${port}`))
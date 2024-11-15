import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

import cors from 'cors'
dotenv.config()
import { UserRouter } from './routes/user.js'

const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000/menu"], // URL de votre frontend
    credentials: true // Pour permettre l'envoi de cookies avec les requêtes
  }));
  
app.use(cookieParser())
app.use('/auth', UserRouter)

mongoose.connect('mongodb://localhost:27017/authentificationAdmin')

app.listen(process.env.PORT, () => {
console.log("server is running")
})
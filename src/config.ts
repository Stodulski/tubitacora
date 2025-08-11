import express from "express"
const app = express()
import cookieParser from "cookie-parser"
import 'dotenv/config'

import cors from 'cors'
import { errorHandler } from "./middlewares/errorHandler"

import authRoutes from './components/auth/routes/auth.routes'

import './db/initialize'

app.set('PORT', process.env.PORT || 3000)

app.use(cors({
    origin: "*"
}))
app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/auth', authRoutes)

app.use(errorHandler)

export default app
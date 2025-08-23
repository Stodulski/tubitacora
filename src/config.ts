import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'

import { errorHandler } from './middlewares/errorHandler'

import './db/config'

const app = express()

// Settings
app.set('PORT', process.env.PORT || 3000)

// Middlewares
app.use(
  cors({
    origin: "*",
    credentials: true
  })
)
app.set('trust proxy', true)
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.json())
app.use(helmet())
app.use(morgan('dev'))

// routes
import authRoutes from './modules/auth/routes'

app.use('/api/v1/auth', authRoutes)

app.use(errorHandler)

export default app

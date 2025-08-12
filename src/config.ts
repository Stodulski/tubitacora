import express from "express"
const app = express()
import cookieParser from "cookie-parser"
import 'dotenv/config'
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import cors from 'cors'
import { errorHandler } from "./middlewares/errorHandler"

import authRoutes from './components/auth/routes/auth.routes'

const swaggerDocument = YAML.load('./swagger.yaml');

import './db/initialize'

app.set('PORT', process.env.PORT || 3000)

app.use(cors({
    origin: "*",
    credentials: true
}))
app.set('trust proxy', true)
app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/auth', authRoutes)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler)

export default app
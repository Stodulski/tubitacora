import { Router } from 'express'
const router = Router()
import { Response, Request } from 'express'

import * as authController from './controller'
import checkEntryData from '../../middlewares/checkEntryData'
import verifySession from '../../middlewares/verifySession'
import { loginSchema, registerSchema } from './schemas/auth.schema'

// Endpoint for login
router.post('/login', checkEntryData(loginSchema), authController.login)

router.post(
  '/register',
  checkEntryData(registerSchema),
  authController.register
)

// Endpoint for close session
router.delete('/session', authController.logout)

// Endpoint for verify session on front-end
router.get('/session', verifySession, (req: Request, res: Response) => {
  res.status(200).json({ data: { message: 'Logged in.', user: req.user } })
})

export default router

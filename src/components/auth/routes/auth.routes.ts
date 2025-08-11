import { Router } from 'express'
const router = Router()
import validateSchema from '../../../middlewares/validateSchema'
import localAuthSchema from '../schemas/localAuth.schema'
import {
  localLogin,
  sessionLogout,
  localRegister
} from '../controllers/localAuth.controller'
import { checkLogged } from '../../../middlewares/checkLogged'
router.post(
  '/local/login',
  validateSchema(localAuthSchema.LoginSchema),
  localLogin
)

router.post(
  '/local/register',
  validateSchema(localAuthSchema.RegisterSchema),
  localRegister
)

router.delete('/logout', sessionLogout)

router.get('/', checkLogged, async(req, res)=>{
  res.send('hola')
})

export default router

import { z } from 'zod'

const LoginSchema = z.object({
  email: z.string().email('Invalid email.').nonempty(),
  password: z.string().min(6, 'Password must be at least 6 characters.')
})

const RegisterSchema = z
  .object({
    username: z
      .string()
      .min(4, 'Username must be at least 4 characters')
      .max(16, 'Username must not exceed 16 characters'),
    email: z.string().email().nonempty(),
    password: z.string().min(6, 'Password must be at least 6 characters.'),
    rePassword: z.string()
  })
  .refine(data => data.password === data.rePassword, {
    path: ['repassword'],
    message: 'Passwords do not match'
  })

const schemas = {
  RegisterSchema,
  LoginSchema
}

export default schemas

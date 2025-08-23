import z from 'zod'

const loginSchema = z.object({
  email: z.string().min(1, 'Email cannot be empty.').email(),
  password: z.string().min(1, 'Password cannot be empty.')
})

const registerSchema = z.object({
  email: z.string().min(1, 'Email cannot be empty.').email(),
  password: z.string().min(1, 'Password cannot be empty.'),
  rePassword: z.string().min(1, "Passwords dont match."),
  dni: z.string().min(5, "Invalid DNI."),
  name: z.string().min(1, "Name cannot be empty."),
  lastname: z.string().min(1, "Lastname cannot be empty."),
  birthdate: z.string().min(1, "Birthdate cannot be empty.")
})

export {registerSchema, loginSchema}

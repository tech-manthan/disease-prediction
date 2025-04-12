import { z } from "zod";

const registerValidator = z.object({
  fullName: z
    .string({ required_error: "fullName is reguired" })
    .min(3, "fullName must be of atleast 3 characters")
    .max(20, "fullName must be of atmost 20 characters"),
  email: z
    .string({ required_error: "email is required" })
    .email("email is invalid"),
  password: z
    .string({ required_error: "password is required" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "password should have atleast one lowercase,one uppercase,one number,one special character & min of 8 characters"
    ),
});

const loginValidator = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email("email is invalid"),
  password: z
    .string({ required_error: "password is required" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "password should have atleast one lowercase,one uppercase,one number,one special character & min of 8 characters"
    ),
});

export { registerValidator, loginValidator };

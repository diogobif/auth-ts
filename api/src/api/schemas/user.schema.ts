import { object, string } from "yup";

export const createUserSchema = object({
  body: object({
    name: string().required("Name is required"),
    email: string()
      .email("Must be a valid email")
      .required("Email is required"),
    password: string().required("Password is required"),
  }),
});

export const loginSchema = object({
  body: object({
    email: string()
      .email("Must be a valid email")
      .required("Email is required"),
    password: string().required("Password is required"),
  }),
});

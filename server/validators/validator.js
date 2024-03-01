import { z } from "zod";

// Creating schema
const signupSchema = z.object({
    name: z.string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name is too short" })
        .max(20, { message: "Name is too long" }),
    // email
    email: z.string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email" })
        .min(3, { message: "Email is too short" })
        .max(255, { message: "Email is too long" }),
    // phone
    phone: z.string({ required_error: "Phone is required" })
        .trim()
        .min(10, { message: "Phone must be at least 10 characters" })
        .max(14, { message: "Phone is too long" }),
          //role
    role: z.string({ required_error: "Role is required" }),
    // password
    password: z.string({ required_error: "Password is required" })
        .trim()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(20, { message: "Password is too long" }),
    // confirm password
    cpassword: z.string({ required_error: "Confirm Password is required" })
        .trim()
});
const profileSchema = z.object({
    name: z.string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name is too short" })
        .max(20, { message: "Name is too long" }),
    // email
    email: z.string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email" })
        .min(3, { message: "Email is too short" })
        .max(255, { message: "Email is too long" }),
    // phone
    phone: z.string({ required_error: "Phone is required" })
        .trim()
        .min(10, { message: "Enter Proper Phone Number" })
        .max(11, { message: "Enter proper Phone NUmber" }),
  
    // password
    about: z.string({ required_error: "Field Is blank" })
        .trim()
        .min(10, { message: "About must be at least 10 characters" })
        .max(255, { message: "About is too long" }),
    // confirm password
    ssi: z.string({ required_error: "Field is blank" })
        .trim()
        .min(5, { message: "Atleast 5 characters" })
        .max(255, { message: "Field is too long" }),
});

const loginErrorSchem = z.object({
    email: z.string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email" })
        .min(3, { message: "Email is too short" })
        .max(255, { message: "Email is too long" }),
    // password
    password: z.string({ required_error: "Password is required" })
        .trim()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(20, { message: "Password is too long" }),
})

const contactSchema = z.object({
    name: z.string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name is too short" })
        .max(20, { message: "Name is too long" }),
    // email
    email: z.string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email" })
        .min(3, { message: "Email is too short" })
        .max(255, { message: "Email is too long" }),
    // phone
    phone: z.string({ required_error: "Phone is required" })
        .trim()
        .min(10, { message: "Phone must be at least 10 characters" })
        .max(14, { message: "Phone is too long" }),
    message: z.string({ required_error: "Message is required" }).trim().
        min(7, { message: "Message must be at least 7 characters" }).
        max(255, { message: "Message is too long" }),
})


const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.errors[0].message });
        next(err);
    }
};

export default signupSchema;
export {  loginErrorSchem };
export {  contactSchema };
export {  validate };
export {  profileSchema };

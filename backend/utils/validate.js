import { body } from "express-validator";

export const validateSignup = [
  body("firstName").notEmpty().withMessage("First name is required").isLength({ min: 4, max: 30 }).withMessage("First name must be at least 4 characters long"),
  body("lastName").notEmpty().withMessage("Last name is required").isLength({ max: 30 }).withMessage("Last name must be at most 30 characters long"),
  body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
];

export const validateLogin = [
  body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
];

export const validateCreateFinancialRecord = [
  body("amount").notEmpty().withMessage("Amount is required").isNumeric().withMessage("Amount must be a number"),
  body("type").notEmpty().withMessage("Type is required").isIn(["income", "expense"]).withMessage("Type must be income or expense"),
  body("category").notEmpty().withMessage("Category is required"),
  body("description").optional().isString().withMessage("Description must be a string"), 
  body("userId").notEmpty().withMessage("User ID is required"),
];

export const validateEditFinancialRecord = [
  body("amount").optional().isNumeric().withMessage("Amount must be a number"),
  body("type").optional().isIn(["income", "expense"]).withMessage("Type must be income or expense"),
  body("category").optional().isString().withMessage("Category must be a string"),
  body("description").optional().isString().withMessage("Description must be a string"), 
]
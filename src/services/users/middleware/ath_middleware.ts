import { NextFunction, Request, Response } from "express";

// Regex patterns
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
const phoneNumberRegex = /^(?:\+234|0)[789]\d{9}$/;

export const registerValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstname, lastname, phoneNumber, email, password } = req.body;

    if (!firstname || !lastname) {
      return res.status(400).json({
        message: "Firstname and Lastname is required",
      });
    }

    if (
      !phoneNumber ||
      typeof phoneNumber !== "string" ||
      !phoneNumberRegex.test(phoneNumber)
    ) {
      return res.status(400).json({
        message:
          "Nigerian phone number is not valid. Format: +234XXXXXXXXXX or 0XXXXXXXXXX",
      });
    }

    if (!email || typeof email !== "string" || !emailRegex.test(email)) {
      return res.status(400).json({ message: "Email Address is not valid" });
    }

    if (!password) {
      return res.status(404).json({
        message: "Password is required",
        errors: { password: "This password cannot be empty" },
      });
    }

    if (
      typeof password !== "string" ||
      !passwordRegex.test(password) ||
      password.length < 8
    ) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number",
        errors: {
          password:
            "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number",
        },
      });
    }

    next();
  } catch (e) {
    console.log(e);
    return res
      .status(422)
      .json({ message: "validation failed", error: (e as Error).message });
  }
};

export const loginValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required" });
    }

    //     IF the email is not a string and doesn't follow the regex pattern
    if (typeof email !== "string" || !emailRegex.test(email)) {
      return res.status(400).json({ message: "Email is not valid" });
    }

    // IF the password is empty or not a string and less than 6 characters
    if (typeof password !== "string" || password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long",
      });
    }

    next();
  } catch (e) {
    console.log(e);
    res
      .status(422)
      .json({ message: "validation failed", error: (e as Error).message });
  }
};

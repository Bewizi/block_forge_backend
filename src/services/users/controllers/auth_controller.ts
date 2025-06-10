import {NextFunction, Request, Response} from "express";
import User from "../models/user_models";
import bcrypt from "bcrypt";

class AuthController {
    register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const {firstname, lastname, email, phoneNumber, password} = req.body;

            //FIND USER BY THIS
            const userExit = await User.findOne({
                where: {
                    email:email.email,
                },
            });

            // IF USER ALREADY EXIT
            if (userExit) {
                res.status(400).json({
                    message: "User Input Cannot be empty",
                    errors: {
                        firstname: "Firstname is required",
                        email: "This email is already register",
                        password: "Password cannot be empty",
                    },
                });
            }

            // HASH PASSWORD
            const hashPassword = await bcrypt.hash(password, 10);

            // CREATE THE USER
            const user = await User.create({
                firstname: firstname,
                lastname: lastname,
                email: email,
                phoneNumber: phoneNumber,
                password: hashPassword,
            });
            res.status(201).json({message: "User Created", user});
            next();
        } catch (e) {
            console.log(e);
            res
                .status(500)
                .json({message: "Registration Failed", error: (e as Error).message});
        }
    };

    login = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const {email, password} = req.body;

            //     CHECK IF USER EXIT
            const existingUser = await User.findOne({where: {email}});
            if (!existingUser) {
                return res.status(400).json({
                    message: "User does not exist",
                    errors: {email: "No User Found with this email"},
                });
            }

            //     CHECK IF PASSWORD MATCHES
            const ifPasswordMatch = await bcrypt.compare(
                password,
                existingUser.password
            );
            if (!ifPasswordMatch) {
                return res.status(401).json({
                    message: "Password does not match",
                    errors: {email: "Incorrect Password"},
                });
            }

            if (!email || !password) {
                return res.status(401).json({message: "Invalid email and password"});
            }
            res.status(200).json({message: "Login Successful"});

            next();
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                message: "Logging in User Failed",
                error: (e as Error).message,
            });
        }
    };
}

export default new AuthController();

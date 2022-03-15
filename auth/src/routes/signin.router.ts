import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { User } from "../models/user.model";
import { BadRequestError, validateRequest } from "@gsinghtickets/comm";
import { PasswordManager } from "../utilities/password-manager";

const signinRouter = express.Router();

signinRouter
  .route("/signin")
  .post(
    [
      body("email").isEmail().withMessage("Please provide a valid email"),
      body("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage(
          "Please provide a password that is atleast 6 characters long"
        ),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
      const { email, password } = req.body;

      // Check if user exists in the db
      const existingUser = await User.findOne({ email });

      // Throe error is user does not exist
      if (!existingUser) {
        throw new BadRequestError(`❌ Invalid email or password`);
      }

      // Check if supplied password is correct
      const passwordsMatch = await PasswordManager.compare(
        existingUser.password,
        password
      );

      if (!passwordsMatch) {
        throw new BadRequestError(`❌ Invalid email or password`);
      }

      // If user's signin credentials are correct
      // GENERATE JWT
      const jwtPayload = {
        id: existingUser.id,
        email: existingUser.email,
      };
      const userJwt = jwt.sign(jwtPayload, process.env.JWT_KEY!);

      // STORE JWT ON THE SESSION OBJECT
      req.session = {
        jwt: userJwt,
      };

      return res.send(existingUser);
    }
  );

export { signinRouter };

import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { BadRequestError, validateRequest } from "@gsinghtickets/comm";
import { User } from "../models/user.model";

const signupRouter = express.Router();

signupRouter
  .route("/signup")
  .post(
    [
      body("email").isEmail().withMessage("Please provide a valid email"),
      body("password")
        .trim()
        .isLength({ min: 6, max: 36 })
        .withMessage("Password mush be between 6 and 36 characters"),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new BadRequestError(`❌ Email already in use`);
      }

      const user = User.build({ email, password });
      await user.save();

      // GENERATE JWT
      const jwtPayload = {
        id: user.id,
        email: user.email,
      };
      const userJwt = jwt.sign(jwtPayload, process.env.JWT_KEY!);

      // STORE JWT ON THE SESSION OBJECT
      req.session = {
        jwt: userJwt,
      };

      return res.status(201).send(user);
    }
  );

export { signupRouter };

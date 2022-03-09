import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { RequestValidationError } from "../errors/request-validation-error";
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
    async (req: Request, res: Response) => {
      // Check if any errors are present on the req.body
      // using the express-validator lib
      const errors = validationResult(req);

      // If errors are found on res.body
      if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
      }

      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new BadRequestError(`❌ Email already in use`);
      }

      const user = User.build({ email, password });
      await user.save();

      return res
        .status(201)
        .json({ status: `✔`, message: `Successfully created a user`, user });
    }
  );

export { signupRouter };

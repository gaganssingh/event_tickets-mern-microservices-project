import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { RequestValidationError } from "../errors/request-validation-error";

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
    (req: Request, res: Response) => {
      // Check if any errors are present on the req.body
      // using the express-validator lib
      const errors = validationResult(req);

      // If errors are found on res.body
      if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
      }

      const { email, password } = req.body;
      throw new DatabaseConnectionError();

      res.send({ success: true, message: "Creating user" });
    }
  );

export { signupRouter };

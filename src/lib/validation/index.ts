/* Import Error type from express */
import { ErrorRequestHandler } from "express";

/* Import dependencies */
/* import addFormats from "ajv-formats" */
import { Validator, ValidationError } from "express-json-validator-middleware"

/* We instantiate a new Validator passing an empty config object this time */
const validatorInstance = new Validator({});

/* addFormats(validatorInstance.ajv, ["date-time"])
    .addKeyword("kind")
    .addKeyword("modifier") */

export const validate = validatorInstance.validate;

/* To be called in server.ts as a middleware */
export const ValidationErrorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof ValidationError) {
        res.status(422).setHeader("Content-Type", "application/json").send({
            message: "Something is wrong with your JSON, check attached log",
            errors: err.validationErrors
        });

        next();
    } else {
        // pass the error to express error handling middleware
        next(err)
    }
}

export * from "./planetValidationSchema"

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationErrorMiddleware = exports.validate = void 0;
/* Import dependencies */
/* import addFormats from "ajv-formats" */
const express_json_validator_middleware_1 = require("express-json-validator-middleware");
/* We instantiate a new Validator passing an empty config object this time */
const validatorInstance = new express_json_validator_middleware_1.Validator({ coerceTypes: true });
/* addFormats(validatorInstance.ajv, ["date-time"])
    .addKeyword("kind")
    .addKeyword("modifier") */
exports.validate = validatorInstance.validate;
/* To be called in server.ts as a middleware */
const ValidationErrorMiddleware = (err, req, res, next) => {
    if (err instanceof express_json_validator_middleware_1.ValidationError) {
        res.status(422).setHeader("Content-Type", "application/json").send({
            message: "Something is wrong with your JSON, check attached log",
            errors: err.validationErrors
        });
        next();
    }
    else {
        // pass the error to express error handling middleware
        next(err);
    }
};
exports.ValidationErrorMiddleware = ValidationErrorMiddleware;
__exportStar(require("./planetValidationSchema"), exports);
//# sourceMappingURL=index.js.map
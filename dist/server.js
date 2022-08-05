"use strict";
/*
    This file only exports the server code (no exec), to
    allow execution in other files (eg: tests)
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Import express and other dependencies */
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const validation_1 = require("./lib/validation");
/* Within app we call the top-level function exported by express module */
const app = (0, express_1.default)();
/* Initialize middleware */
/* parse application/x-www-form-urlencoded */
app.use(express_1.default.urlencoded({ extended: true }));
/* parse application/json */
app.use(express_1.default.json());
/* enable cors */
app.use((0, cors_1.default)({ origin: "http:/localhost:8080" }));
/*---------------- TEST PAGES ----------------*/
/* Set up the list route to serve a list of all planets */
app.get("/list", (req, res) => {
    res.sendFile('list.html', { 'root': `${__dirname}/../web/` });
});
app.get("/add", (req, res) => {
    res.sendFile('add.html', { 'root': `${__dirname}/../web/` });
});
/* This middleware needs to be used after all the routes, like a "catch" */
app.use(validation_1.ValidationErrorMiddleware);
exports.default = app;
//# sourceMappingURL=server.js.map
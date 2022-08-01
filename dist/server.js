"use strict";
/*
    This file only exports the server code (no exec), to
    allow execution in other files (eg: tests)
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Import express and other dependencies */
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const client_1 = __importDefault(require("./lib/prisma/client"));
const validation_1 = require("./lib/validation");
/* Within app we call the top-level function exported by express module */
const app = (0, express_1.default)();
/* Initialize middleware */
/* parse application/x-www-form-urlencoded */
app.use(express_1.default.urlencoded({ extended: true }));
/* parse application/json */
app.use(express_1.default.json());
/* enable cors */
app.use((0, cors_1.default)());
/* Set up the home route via GET */
app.get("/", (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.send({ message: "Hello!" });
});
/*---------------- CRUD ENDPOINTS ----------------*/
/* Create new planet */
app.post("/planets", (0, validation_1.validate)({ body: validation_1.planetSchema }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPlanet = req.body;
    res.status(201).json(newPlanet);
}));
/* Read planets */
app.get("/planets", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const planets = yield client_1.default.planet.findMany();
    res.status(200).json(planets);
}));
/* Read single planet by ID */
app.get("/planets/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('GET route for retrieving a planet by id');
}));
/* Update planet */
app.put("/planets/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('PUT route for updating a planet by id');
}));
/* Add photo to a planet */
app.post("/planets/:id/photo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('PUT route for adding photo to a planet by id');
}));
/* Delete planet(s) */
app.delete("/planets/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('DELETE route for deleting a planet by id');
}));
/* This middleware needs to be used after all the routes, like a "catch" */
app.use(validation_1.ValidationErrorMiddleware);
exports.default = app;
//# sourceMappingURL=server.js.map
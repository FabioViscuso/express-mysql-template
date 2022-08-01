/*
    This file only exports the server code (no exec), to
    allow execution in other files (eg: tests)
*/

/* Import express and other dependencies */
import express from "express";
import "express-async-errors";
import cors from 'cors';
import prisma from "./lib/prisma/client";
import { validate, ValidationErrorMiddleware, planetSchema, PlanetSchema } from "./lib/validation";

/* Within app we call the top-level function exported by express module */
const app = express();

/* Initialize middleware */
/* parse application/x-www-form-urlencoded */
app.use(express.urlencoded({ extended: true }));
/* parse application/json */
app.use(express.json());
/* enable cors */
app.use(cors());

/* Set up the home route via GET */
app.get("/", (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.send({ message: "Hello!" });
});

/*---------------- CRUD ENDPOINTS ----------------*/

/* Create new planet */
app.post("/planets", validate({ body: planetSchema }), async (req, res) => {
    /* If the req passes validation, this code will run */
    const incomingPlanetData: PlanetSchema = req.body;
    const newPlanet = await prisma.planet.create({ data: incomingPlanetData })
    res.status(201).json(newPlanet);
});

/* Read planets */
app.get("/planets", async (req, res) => {
    const planets = await prisma.planet.findMany();
    res.status(200).json(planets);
});

/* Read single planet by ID */
app.get("/planets/:id", async (req, res) => {
    res.send('GET route for retrieving a planet by id')
});

/* Update planet */
app.put("/planets/:id", async (req, res) => {
    res.send('PUT route for updating a planet by id')
});

/* Add photo to a planet */
app.post("/planets/:id/photo", async (req, res) => {
    res.send('PUT route for adding photo to a planet by id')
});

/* Delete planet(s) */
app.delete("/planets/:id", async (req, res) => {
    res.send('DELETE route for deleting a planet by id')
});

/* This middleware needs to be used after all the routes, like a "catch" */
app.use(ValidationErrorMiddleware)

export default app;

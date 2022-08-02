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
app.use(cors({ origin: "http:/localhost:8080" }));

/* Set up the home route via GET */
app.get("/listing", (req, res) => {
    /* res.writeHead(200, { 'Content-Type': 'text/html' }); */
    res.sendFile('listing.html', { 'root': `${__dirname}/../web/` });
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
    const planet = await prisma.planet.findMany();
    res.status(200).json(planet);
});

/* Read single planet by numeric ID */
app.get("/planets/:id(\\d+)", async (req, res, next) => {
    const planetID = Number(req.params.id)
    const planet = await prisma.planet.findUnique({
        where: { id: planetID }
    });
    // if findUnique doesn't find a matching entry, it will return null
    if (!planet) {
        res.status(404)
        // pass the error to the express error handling middleware
        return next(`Cannot GET /planets/${planetID}. Element does not exist`)
    }

    res.status(200).json(planet)
});

/* Update planet */
app.put("/planets/:id(\\d+)", validate({ body: planetSchema }), async (req, res, next) => {
    const planetID = Number(req.params.id)
    const incomingPlanetData: PlanetSchema = req.body;

    try {
        const planet = await prisma.planet.update({
            where: { id: planetID },
            data: incomingPlanetData
        });
        res.status(200).json(planet);
    } catch (err) {
        res.status(404);
        next(`Cannot PUT /planets/${planetID}. Element does not exist`);
    }
});

/* Add photo to a planet */
app.post("/planets/:id(\\d+)/photo", async (req, res) => {
    res.send('PUT route for adding photo to a planet by id')
});

/* Delete planet(s) */
app.delete("/planets/:id(\\d+)", async (req, res, next) => {
    const planetID = Number(req.params.id)
    try {
        await prisma.planet.delete({ where: { id: planetID } });
        res.status(204).end();
    } catch (err) {
        res.status(404);
        next(`Cannot DELETE /planets/${planetID}. Element does not exist`);
    }
});

/* This middleware needs to be used after all the routes, like a "catch" */
app.use(ValidationErrorMiddleware)

export default app;

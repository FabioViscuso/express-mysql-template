/*
    This file only exports the server code (no exec), to
    allow execution in other files (eg: tests)
*/

/* Import express and other dependencies */
import express from "express";
import "express-async-errors";
import cors from 'cors';
import planetsRoutes from "./routes/planets"
import { ValidationErrorMiddleware } from "./lib/validation";
/* Within app we call the top-level function exported by express module */
export const app = express();

/* Initialize middleware */
/* parse application/x-www-form-urlencoded */
app.use(express.urlencoded({ extended: true }));
/* parse application/json */
app.use(express.json());
/* enable cors */
app.use(cors({ origin: "http:/localhost:8080" }));
/* define the entry point for our REST endpoints in planets.ts */
app.use("/planets", planetsRoutes)

/*---------------- TEST PAGES ----------------*/

/* Set up the list route to serve a list of all planets */
app.get("/list", (req, res) => {
    res.sendFile('list.html', { 'root': `${__dirname}/../web/` });
});

app.get("/add", (req, res) => {
    res.sendFile('add.html', { 'root': `${__dirname}/../web/` });
});

/* This middleware needs to be used after all the routes, like a "catch" */
app.use(ValidationErrorMiddleware)

export default app;

/* eslint-disable @typescript-eslint/no-namespace */
/*
    This file only exports the server code (no exec), to
    allow execution in other files (eg: tests)
*/

/* Import express and other core dependencies */
import express from "express";
import "express-async-errors";
import cors from 'cors';
/* Import routes */
import planetsRoutes from "./routes/planets";
import authRoutes from "./routes/auth";
import testPagesRoutes from "./routes/testpages"
/* Import middleware */
import { ValidationErrorMiddleware } from "./lib/validation";
import { initSessionMiddleware } from "./lib/middleware/session";
import { passport } from "./lib/middleware/passport"

/* TYPES DECLARATION */
/* @TODO: move them in a separate file */
declare global {
    namespace Express {
        interface User {
            username: string;
        }
    }
}
declare module "express-session" {
    interface SessionData {
        redirectTo: string;
    }
}

/* Within app we call the top-level function exported by express module */
export const app = express();

/* GitHub auth middleware */
app.use(initSessionMiddleware())
app.use(passport.initialize())
app.use(passport.session())

/* ---- PARSERS ---- */
/* parse application/x-www-form-urlencoded */
app.use(express.urlencoded({ extended: true }));
/* parse application/json */
app.use(express.json());
/* enable cors */
app.use(cors({ origin: "http:/localhost:8080", credentials: true }));
/* ---- PARSERS ---- */


/* ---- ROUTES ---- */
/* define the auth routes */
app.use("/auth", authRoutes)
/* define the entry point for our REST endpoints in planets.ts */
app.use("/planets", planetsRoutes)
/* define the test pages routes */
app.use("/", testPagesRoutes)
/* ---- ROUTES ---- */

/* Add the static serve middleware to each photos route */
app.use("/planets/photos", express.static("uploads"))

/* This middleware needs to be used after all the routes, like a "catch" */
app.use(ValidationErrorMiddleware)

export default app;

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
/* import authRoutes from "./routes/auth"; */
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

/* Initialize middleware */
/* GitHub auth middleware */
app.use(initSessionMiddleware())
app.use(passport.initialize())
app.use(passport.session())
/* parse application/x-www-form-urlencoded */
app.use(express.urlencoded({ extended: true }));
/* parse application/json */
app.use(express.json());
/* enable cors */
app.use(cors({ origin: "http:/localhost:8080", credentials: true }));

/* define the auth routes */
/* app.use("/auth", authRoutes) */
/* define the entry point for our REST endpoints in planets.ts */
app.use("/planets", planetsRoutes)

app.get("/auth/login", (req, res, next) => {
    if (typeof req.query.redirectTo !== "string" || !req.query.redirectTo) {
        res.status(400);
        return next("Missing redirectTo query string param");
    }

    req.session.redirectTo = req.query.redirectTo;
    res.redirect("/auth/github/login")
})

app.get("/auth/github/login",
    passport.authenticate(
        "github",
        {
            scope: ["user:email"]
        }
    )
);

app.get("/auth/github/callback",
    // @ts-ignore KNOWN ISSUE WITH PASSPORT
    passport.authenticate("github", { failureRedirect: "/auth/github/login", keepSessionInfo: true }),
    (req, res) => {
        if (typeof req.session.redirectTo !== "string") {
            return res.status(500).end()
        }

        res.redirect(req.session.redirectTo)
    }
)

app.get("/auth/logout", (req, res, next) => {
    if (typeof req.query.redirectTo !== "string" || !req.query.redirectTo) {
        res.status(400);
        return next("Missing redirectTo query string param");
    }

    const redirectURL = req.query.redirectTo;

    req.logout((err) => {
        if (err) {
            return next(err)
        }

        res.redirect(redirectURL)
    })
})

/*---------------- TEST PAGES ----------------*/

/* Set up the list route to serve a list of all planets */
app.get("/list", (req, res) => {
    res.sendFile('list.html', { 'root': `${__dirname}/../web/` });
});

app.get("/add", (req, res) => {
    res.sendFile('add.html', { 'root': `${__dirname}/../web/` });
});

app.get("/photoupload", (req, res) => {
    res.sendFile('photoupload.html', { 'root': `${__dirname}/../web/` });
});


/* Add the static serve middleware to each photos route */
app.use("/planets/photos", express.static("uploads"))

/* This middleware needs to be used after all the routes, like a "catch" */
app.use(ValidationErrorMiddleware)

export default app;

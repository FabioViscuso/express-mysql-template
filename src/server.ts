/*
    This file only exports the server code (no exec), to
    allow execution in other files (eg: tests)
*/

/* Import express and other dependencies */
import express, { ErrorRequestHandler } from "express";
import "express-async-errors";
import cors from 'cors';
/* Within app we call the top-level function exported by express module */
const app = express();

/* Initialize middleware */
/* parse application/x-www-form-urlencoded */
app.use(express.urlencoded({ extended: true }));
/* parse application/json */
app.use(express.json());
/* enable cors */
app.use(cors());

app.use(function addCustomHeader(req, res, next) {
    console.log('called addCustomHeader');
    res.setHeader("X-Custom-Header", "custom");
    next();
})

app.use(function throwError(req, res, next) {
    console.log('called throwError');
    next(new Error('Error here'));
})

app.use(function sendData(req, res, next) {
    console.log('called sendData');
    res.json({ message: "hello!" });
    next();
})

const showError: ErrorRequestHandler = (error, req, res, next) => {
    console.log('called showError');
    res.status(500);
    res.json({ message: error.message });
    console.log(error.message)
    next();
}

app.use(showError)

/* Set up the home route via GET */
app.get("/", (req, res) => res.send("Express + TS + SQL server online"));

/*---------------- CRUD ENDPOINTS ----------------*/

/* Create new contact */
app.post("/contact/new", async (req, res) => {
    res.send('POST route')
});

/* Read single contact by ID */
app.get("/contact/:id", async (req, res) => {
    res.send('GET route')
});

/* Read contacts */
app.get("/contact", async (req, res) => {
    res.send('GET route')
});

/* Updated contact(s) */
app.put("/contact/update", async (req, res) => {
    res.send('PUT route')
});

/* Updated contact(s) */
app.put("/contact/:id/update", async (req, res) => {
    res.send('PUT route')
});

/* Delete contact(s) */
app.delete("/contact/delete", async (req, res) => {
    res.send('DELETE route')
});

export default app;

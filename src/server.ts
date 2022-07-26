/*
    This file only exports the server code (no exec), to
    allow execution in other files (eg: tests)
*/

/* Import express and other dependencies */
import express from "express";
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

/* Set up the home route via GET */
app.get("/", (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.send({ message: "Hello!" });
});

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

/* Add .env support */
import * as dotenv from "dotenv"
dotenv.config({ path: "./.env" })

/* Import express and other dependencies */
import express, { Express } from "express";
import mysql from "mysql";
import cors from 'cors';
/* Within app we call the top-level function exported by express module */
const app: Express = express();

/* Initialize middleware */
/* parse application/x-www-form-urlencoded */
app.use(express.urlencoded({ extended: true }));
/* parse application/json */
app.use(express.json());
/* enable cors */
app.use(cors());

/* Import model(s) */

/* Connect to DB */

mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'grinko',
    database: 'MySQL80'
})
console.log('MySQL server connection successful')


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

/* Launch the server on specified PORT and print a log */
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

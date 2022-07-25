"use strict";
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
/* Add .env support */
require("dotenv").config({ path: "./.env" });
/* Import express and other dependencies */
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const cors_1 = __importDefault(require("cors"));
/* Within app we call the top-level function exported by express module */
const app = (0, express_1.default)();
/* Initialize middleware */
/* parse application/x-www-form-urlencoded */
app.use(express_1.default.urlencoded({ extended: true }));
/* parse application/json */
app.use(express_1.default.json());
/* enable cors */
app.use((0, cors_1.default)());
/* Import model(s) */
/* Connect to DB */
mysql_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'grinko',
    database: 'MySQL80'
});
console.log('MySQL server connection successful');
/* Set up the home route via GET */
app.get("/", (req, res) => res.send("Express + TS + SQL server online"));
/*---------------- CRUD ENDPOINTS ----------------*/
/* Create new contact */
app.post("/contact/new", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('POST route');
}));
/* Read single contact by ID */
app.get("/contact/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('GET route');
}));
/* Read contacts */
app.get("/contact", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('GET route');
}));
/* Updated contact(s) */
app.put("/contact/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('PUT route');
}));
/* Updated contact(s) */
app.put("/contact/:id/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('PUT route');
}));
/* Delete contact(s) */
app.delete("/contact/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('DELETE route');
}));
/* Launch the server on specified PORT and print a log */
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

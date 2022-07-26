"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Add .env support */
require("dotenv/config");
/* Import the server code */
const server_1 = __importDefault(require("./server"));
/* Launch the server on specified PORT and print a log */
const PORT = process.env.PORT;
server_1.default.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//# sourceMappingURL=index.js.map